import React,{useEffect, useRef,useState} from 'react'
import styles from "./AddGallery.module.css"
import { Button } from '@mui/material'

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

const AddGallery = () => {
 

    const [files, setFiles] = useState([])
    const [allProjects, setAllProjects] = useState([])
    const [project,setProject]= useState({})

    useEffect(()=> {
      axios.get('http://68.183.94.172/api/project/list')
      .then(function (response) {
        // handle success
        setAllProjects(response.data.data);
        
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    },[])

    // console.log(allProjects)
    const galleryHandler = (e) => {
      e.preventDefault()
      const updatedData = files.reduce((result, file, index) => {
        console.log(file.source);
        result[index] = file.source;
        return result;
      }, {});
   
     
      console.log(project)
      axios.post(`http://68.183.94.172/api/gallery/${project._id}`, {
      ...updatedData
    },
    {
      headers: {
        'Content-type': 'multipart/form-data',
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
      }
    }
    )
    .then(function (response) {
      Swal.fire({
        icon: 'success',
        title: 'Submission Successfully',
        text: 'The gallery was successfully submitted',
      })
  
    })
    .catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Something went wrong!",
      })
    });

     }

 
   


    
  return (
    <div className={styles.addgallery}>
        <h2>Add Gallery</h2>

        <form onSubmit={galleryHandler}>
            <div id={styles.selectProject}>
                <label htmlFor="galleryProjectSelect">Select Project: </label>
                <select onChange={(event) => setProject(allProjects.find(project => project.projectName === event.target.value))}>
                  {allProjects.map((project,i) => {
                    return ( 
                      <option key={i} value={project.projectName}  >
                        {project.projectName}
                      </option>
                    );
                  })}
                </select>
            </div>


            <div id={styles.project_gallery_image}>
              <label htmlFor="project_gallery_image_field">Upload Project Image</label>
              <FilePond
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={true}
                maxFiles={5}
                maxFileSize={"1MB"}
                labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
                labelMaxFileSize = "Maximum file size can be 1MB"
                
                // server="/api"
                name="files" /* sets the file input name, it's filepond by default */
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
            </div>

            <Button variant="contained" type='submit'>Submit</Button>
        </form>
    </div>
  )
}

export default AddGallery