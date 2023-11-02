import React,{useState,useEffect} from 'react'
import styles from "./ViewGallery.module.css"
import { FilePond, registerPlugin } from 'react-filepond'

import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import axios from 'axios'
import Swal from 'sweetalert2'
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview,FilePondPluginFileValidateSize)

const ViewGallery = () => {
    const [files, setFiles] = useState([]);
    const [allProjects, setAllProjects] = useState([])
    const [project,setProject]= useState({})
    const [deletedFiles, setDeletedFiles] = useState([]);
    const [getResponse, setGetResponse] = useState([])

    useEffect(()=> {
        axios.get('http://64.227.148.189/api/project/list')
        .then(function (response) {
          // handle success
          setAllProjects(response.data.data);
          
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
      },[])

      const handleFileRemove = (errRes, file) => {
        // Add the removed file to the deletedFiles array
        setDeletedFiles([...deletedFiles, file]);
        let deleteFile=file.source.slice(22);
     
       
        const deletedItem = getResponse.filter(item => {
            if(item.filePath == deleteFile)
                return item;
        
        })
       
     
        console.log(deletedItem[0]._id)

        axios.delete(`http://64.227.148.189/api/gallery/${deletedItem[0]._id}`, {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            },
           
          })  .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        
        
      };

      const fetchGalleryImageHandler = () => {

        axios.get(`http://64.227.148.189/api/gallery/project/${project._id}`)
        .then(function (response) {
          // handle success
        
          const projectGalleryFiles = response.data.data.map(file=> ({
            id_: file._id,
            source: `http://64.227.148.189/${file.filePath}`,
            location: {
              type: 'local'
            }
          }))
       
          setFiles(projectGalleryFiles)
          setGetResponse(response.data.data)
        })
        .catch(function (error) {
          // handle error
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Please select a project',
          })
        });
      }



  return (
    <div className={styles.view_gallery}>
        <h2>Manage Gallery</h2>

        <div className={styles.gallery_images_container}>
            <div className={styles.gallery_images_project_select}>
                <label htmlFor="">Select your project</label>
               <select onChange={(event) => setProject(allProjects.find(project => project.projectName === event.target.value))} defaultValue="">
               <option value="" disabled>
                                Select a project
                        </option>
                  {allProjects.map((project,i) => {
                    return ( 
                      <option key={i} value={project.projectName}  >
                        {project.projectName}
                      </option>
                    );
                  })}
                </select>
            </div>
            <div>
                <button className={styles.fetch_button} onClick={fetchGalleryImageHandler}>Fetch Gallery Images</button>
            </div>
            <div className={styles.gallery_images}>
                <h3>Gallery images</h3>
                <form action="">
                    <FilePond
                    files={files}
                    onupdatefiles={setFiles}
                    allowMultiple={true}
                    onremovefile={handleFileRemove}
                    maxFiles={5}
                    maxFileSize={"1MB"}
                    labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
                    labelMaxFileSize = "Maximum file size can be 1MB"
                    allowBrowse={false}
                    allowRemove={true}
                    
                    
                    // server="/api"
                    name="files" /* sets the file input name, it's filepond by default */
                    labelIdle='Select a project to view gallery images'
        />
                </form>
            </div>
        </div>
    </div>
  )
}

export default ViewGallery