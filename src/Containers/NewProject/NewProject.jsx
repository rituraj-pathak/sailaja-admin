import React,{useRef,useState, useEffect} from 'react'
import styles from './NewProject.module.css'
import { TextField } from '@mui/material'
import {Select, Button} from '@mui/material'
import {MenuItem} from '@mui/material'


import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';

import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import axios from 'axios'
import Swal from 'sweetalert2'
import { useLocation } from "react-router-dom";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview,FilePondPluginFileValidateSize,FilePondPluginFileEncode)


const NewProject = () => {
  // const [isEdited,setIsEdited]= useState(false)
  const { state } = useLocation();
  const [formData, setFormData] = useState({ projectName: "", projectImage: null, architectureMap: null, projectPdf:null, description: "", status: '', projectStart: '',firstSale: '', area: 0, location: '', type: '', flatSize: 0, floors: 0});

  
  const [files, setFiles] = useState([]);
  const [archImg, setArchImg] = useState([])
  const [projectPdf, setprojectPdf] = useState([])
  

  // useEffect(()=>{
  //   if(state!=null){
      
  //     setFormData(state?.projectInfo)
  //     const projectImage = [{ 
  //       source: `http://68.183.94.172/${formData?.projectImage}`,
  //       location: {
  //        type: "local"
  //       }
  //    }]
  //     setFiles(projectImage)
  //   }

  // },[])

  useEffect(() => {
    if (state !== null) {
      setFormData(state.projectInfo);
    }
  }, [state]);

  useEffect(() => {
   
    if (formData?.projectImage && files.length === 0) {
      const projectImageFile = {
        source: `http://68.183.94.172/${formData.projectImage}`,
        location: {
          type: 'local'
        }
      };
      setFiles([projectImageFile]);
    }

    if (formData?.architectureMap &&archImg.length === 0) {
      const ArchImageFile = { 
        source:  `http://68.183.94.172/${formData?.architectureMap}`,
        location: {
         type: "local"
        }
     };
      setArchImg([ArchImageFile]);
    }
    if (formData?.projectPdf &&projectPdf.length === 0) {
      const projectPdfFile = { 
        source:  `http://68.183.94.172/${formData?.projectPdf}`,
        location: {
         type: "local"
        }
     };
     setprojectPdf([projectPdfFile]);
    }
    

  }, [formData]);

 
  const handleChange = e => {
   
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,      
    });
  };


 

  function handleAddProjectImg(err, item) {
    if(err) {
      console.warn(err); return;
    }


    if(state==null){
    formData['projectImage'] = item.source
    }
   
  }

  function handleAddArchImg(err, item) {

    if(err) {
      console.warn(err); return;
    }
  
    if(state==null){
      setFormData({
        ...formData,
        architectureMap:item.source
      })
    }
  }
  function handleprojectPdf(err,item){
    if(err) {
      console.warn(err); return;
    }
  
    if(state==null){
      setFormData({
        ...formData,
        projectPdf:item.source
      })
    }

  }

  




  const projectFormSubmitHandler = () => {

   
    if(state==null){
    
    axios.post('http://68.183.94.172/api/project', {
      ...formData,
      
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
        text: 'The project was successfully submitted',
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
  else{
    axios.put(`http://68.183.94.172/api/project/${state.projectInfo._id}`, {
      ...formData
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
        text: 'The project was successfully edited',
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
  }

  

  return (
    <div className={styles.newProject}>
        <div className={styles.newproject_header}>
          <h2>Add/Update Project</h2>
        </div>
        <div className={styles.newproject_body}>
          <form action="" >
            <div id={styles.project_title} className={styles.project_form_div}>
              <label htmlFor="project_title_field">Enter project name</label>
              <TextField id={styles.project_title_field} label="Project Title" name='projectName' variant="outlined" onChange={handleChange}  value={formData?.projectName} />
            </div>
            <div id={styles.project_image} className={styles.project_form_div}>
              <label htmlFor="project_image_field">Upload Project Image</label>
              {formData?.projectImage != null ?
              <FilePond
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={false}
                maxFileSize={"1MB"}
                id={styles.formData_img}
                allowFileEncode={true}
                onaddfile={handleAddProjectImg}
               
                // source={`http://68.183.94.172/${formData?.projectInfo?.projectImage}`}
              //  src={baserrl+formaData?.projectInfo?.projectImage}
                labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
                labelMaxFileSize = "Maximum file size can be 1MB"
                name="projectImage"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                

              />:  <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={false}
              maxFileSize={"1MB"}
              id={styles.formData_img}
              allowFileEncode={true}
              onaddfile={handleAddProjectImg}
              labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
              labelMaxFileSize = "Maximum file size can be 1MB"
              name="projectImage"
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              

            />
}
            </div>
            <div id={styles.project_image} className={styles.project_form_div}>
              <label htmlFor="project_image_field">Upload Architecture Image</label>
              {formData?.architectureMap != null ? 
              <FilePond
                files={archImg}
                onupdatefiles={setArchImg}
                allowMultiple={false}
                maxFileSize={"1MB"}
                id={styles.formData_archimg}
                labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
                labelMaxFileSize = "Maximum file size can be 1MB"
                onaddfile={handleAddArchImg}
           
                
                
                // server="/api"
                name="architectureMap" /* sets the file input name, it's filepond by default */
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                

              /> : <FilePond
                
              files={archImg}
              onupdatefiles={setArchImg}
              allowMultiple={false}
              maxFileSize={"1MB"}
              id={styles.formData_archimg}
              labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
              labelMaxFileSize = "Maximum file size can be 1MB"
              onaddfile={handleAddArchImg}
              name="architectureMap" /* sets the file input name, it's filepond by default */
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              

            />  }
              
            </div>
            {/* *************  projectPdf************************ */}
            <div id={styles.project_projectPdf} className={styles.project_form_div}>
              <label htmlFor="project_projectPdf_field">Upload projectPdf</label>
              {formData?.projectPdf != null ? 
              <FilePond
                files={projectPdf}
                onupdatefiles={setprojectPdf}
                allowMultiple={false}
                maxFileSize={"5MB"}
                id={styles.formData_projectPdf}
                labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
                labelMaxFileSize = "Maximum file size can be 5MB"
                onaddfile={handleprojectPdf}
           
                
                
                // server="/api"
                name="projectPdf" /* sets the file input name, it's filepond by default */
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                

              /> : <FilePond
                
              files={projectPdf}
              onupdatefiles={setprojectPdf}
              allowMultiple={false}
              maxFileSize={"1MB"}
              id={styles.formData_archimg}
              labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
              labelMaxFileSize = "Maximum file size can be 1MB"
              onaddfile={handleprojectPdf}
              name="projectPdf" /* sets the file input name, it's filepond by default */
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              

            />  }
              
            </div>
            <div id={styles.project_desc} className={styles.project_form_div}>
              <label htmlFor="project_desc_field">Enter Project Overview</label>
              <TextField id={styles.project_desc_field} label="Project Overview" name='description' variant="outlined" onChange={handleChange} multiline rows={4} value={formData?.description} />
            </div>
            <div id={styles.project_status} className={styles.project_form_div}>
              <label htmlFor="project_status_field">Enter Project Status</label>
             
              <select
                id="project_status_field"
                // value={age}
                label="Age"
                name='status'
                value={formData?.status}
                onChange={handleChange}
                
              >
                <option value={"ongoing"}>Ongoing</option>
                <option value={"completed"}>Completed</option>
                <option value={"upcoming"}>Upcoming</option>
              </select>
            </div>
            
            <div className={styles.project_row} >
              <div id={styles.project_start_date} className={styles.project_form_div}>
                <label htmlFor="project_start_date_field">Project Start Date</label>
                <input type="date" name='projectStart' id={styles.project_start_date_field} onChange={handleChange} value={formData?.projectStart.slice(0,10)} />

              </div>
              <div id={styles.project_first_sale} className={styles.project_form_div}>
                <label htmlFor="project_first_sale_field">First Sale Date</label>
                <input type="date" name='firstSale' id={styles.project_first_sale_field} onChange={handleChange} value={formData?.firstSale.slice(0,10)} />

              </div>
            </div>
            <div className={styles.project_row} >
              <div id={styles.project_area} className={styles.project_form_div}>
                <label htmlFor="project_area_field">Area</label>
                <TextField id={styles.project_area_field} name='area' label="Area" variant="outlined" onChange={handleChange} value={formData?.area} />

              </div>
              <div id={styles.project_location} className={styles.project_form_div}>
                <label htmlFor="project_location_field">Location</label>
                <TextField id={styles.project_location_field} name='location' label="Location" variant="outlined" onChange={handleChange} value={formData?.location} />

              </div>
            </div>

            <div id={styles.project_type} className={styles.project_form_div}>
              <label htmlFor="project_type_field">Enter Project Type</label>
             
              <select
                id="project_type_field"
                value={formData?.type}
                label="Age"
                name='type'
                onChange={handleChange}
              >
                <option value={"residential"}>Residential</option>
                <option value={"commercial"}>Commercial</option>
               
              </select>
            </div>

            <div className={styles.project_row} >
              <div id={styles.project_flatsize} className={styles.project_form_div}>
                <label htmlFor="project_flatsize_field">Flat Size</label>
                <TextField id={styles.project_flatsize_field} name='flatSize' label="Flat size" variant="outlined" onChange={handleChange} value={formData?.flatSize} />

              </div>
              <div id={styles.project_floors} className={styles.project_form_div}>
                <label htmlFor="project_floors_field">Floors</label>
                <TextField id={styles.project_floors_field} name='floors' label="Floors" variant="outlined" onChange={handleChange} value={formData?.floors}/>

              </div>
            </div>
            <div id={styles.project_submit} className={styles.project_form_div}>
              <Button variant="contained" onClick={projectFormSubmitHandler}>Submit</Button>
            </div>


          </form>
        </div>
        
    </div>
  )
}

export default NewProject














