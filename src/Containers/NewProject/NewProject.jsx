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
  const [formData, setFormData] = useState({ projectName: "", projectImage: null, projectNoc:null, reraNoc:null, approvedPlan:null,brochure:null, description: "",status: "", location: '',startDate:'',endDate:''});

  
  const [files, setFiles] = useState([]);
  const [projectNoc, setprojectNoc] = useState([])
  const [reraNoc, setReraNoc] = useState([])
  const [approvedPlan, setApprovedPlan] = useState([])
  const [brochure, setBrochure] = useState([])
  

 

  useEffect(() => {
    
    if (state !== null) {
      setFormData(state.projectInfo);
    }
  }, [state]);
  console.log(formData)

  // useEffect(()=> {
  //   if(state!=null){
  //     setFiles([`http://64.227.148.189${formData.projectImage}`])
  //   }
  // },[state])

  useEffect(() => {
   
    if (formData?.projectImage && files.length === 0) {
      const projectImageFile = {
        source: `http://64.227.148.189${formData.projectImage}`,
        location: {
          type: 'local'
        }
      };
      setFiles([projectImageFile]);
    }

  
    if (formData?.projectNoc &&projectNoc.length === 0) {
      const projectPdfFile = { 
        source:  `http://64.227.148.189/${formData?.projectNoc}`,
        location: {
         type: "local"
        }
     };
     setprojectNoc([projectPdfFile]);
    }
    if (formData?.reraNoc &&reraNoc.length === 0) {
      const reraNocFile = { 
        source:  `http://64.227.148.189/${formData?.reraNoc}`,
        location: {
         type: "local"
        }
     };
     setReraNoc([reraNocFile]);
    }
    if (formData?.brochure &&brochure.length === 0) {
      const brochureFile = { 
        source:  `http://64.227.148.189/${formData?.brochure}`,
        location: {
         type: "local"
        }
     };
     setBrochure([brochureFile]);
    }
    if (formData?.approvedPlan &&approvedPlan.length === 0) {
      const approvedPlanFile = { 
        source:  `http://64.227.148.189/${formData?.approvedPlan}`,
        location: {
         type: "local"
        }
     };
     setApprovedPlan([approvedPlanFile]);
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


    // if(state==null){
    // formData['projectImage'] = item.source
    // }
    if(item.relativePath != undefined){
    setFormData({
      ...formData,
      projectImage:item.source
    })
  }
   
   
  }

 
  function handleprojectNoc(err,item){
    if(err) {
      console.warn(err); return;
    }
  
   
    if(item.relativePath != undefined){
      setFormData({
        ...formData,
        projectNoc:item.source
      })
    }
    

  }


  function handleReraNoc(err,item){
    if(err) {
      console.warn(err); return;
    }
  
   
    if(item.relativePath != undefined){
      setFormData({
        ...formData,
        reraNoc:item.source
      })
    }
    

  }


  function handleApprovedPlan(err,item){
    if(err) {
      console.warn(err); return;
    }
  
   
    if(item.relativePath != undefined){
      setFormData({
        ...formData,
        approvedPlan:item.source
      })
    }
    

  }
  function handleBrochure(err,item){
    if(err) {
      console.warn(err); return;
    }
  
    if(item.relativePath != undefined){
      setFormData({
        ...formData,
        brochure:item.source
      })
    }

  }

  




  const projectFormSubmitHandler = () => {

   
    if(state==null){
      console.log(formData)
    
    axios.post('http://64.227.148.189/api/project', {
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
      }).then(function() {
        window.location.href = "/layout/projectlist"
    })
    
    })
    .catch(function (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.message,
      })
    });
  }
  else{
    console.log(formData)
    axios.put(`http://64.227.148.189/api/project/${state.projectInfo._id}`, {
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
      console.log(response)
      Swal.fire({
        icon: 'success',
        title: 'Submission Successfully',
        text: 'The project was successfully edited',
      }).then(function() {
        window.location.href = "/layout/projectlist"
    })
   
    })
    .catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.message,
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
                maxFileSize={"5MB"}
                id={styles.formData_img}
                allowFileEncode={true}
                onaddfile={handleAddProjectImg}
               
                // source={`http://64.227.148.189/${formData?.projectInfo?.projectImage}`}
              //  src={baserrl+formaData?.projectInfo?.projectImage}
                labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
                labelMaxFileSize = "Maximum file size can be 5MB"
                name="projectImage"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                

              />:  <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={false}
              maxFileSize={"5MB"}
              id={styles.formData_img}
              allowFileEncode={true}
              onaddfile={handleAddProjectImg}
              labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
              labelMaxFileSize = "Maximum file size can be 5MB"
              name="projectImage"
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              

            />
}
            </div>
           
            {/* *************  projectPdf************************ */}
            <div id={styles.project_projectPdf} className={styles.project_form_div}>
              <label htmlFor="project_projectPdf_field">Upload NOC</label>
              {formData?.projectNoc != null ? 
              <FilePond
                files={projectNoc}
                onupdatefiles={setprojectNoc}
                allowMultiple={false}
                maxFileSize={"5MB"}
                id={styles.formData_projectPdf}
                labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
                labelMaxFileSize = "Maximum file size can be 5MB"
                onaddfile={handleprojectNoc}
           
                
                
                // server="/api"
                name="projectNoc" /* sets the file input name, it's filepond by default */
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                

              /> : <FilePond
                
              files={projectNoc}
              onupdatefiles={setprojectNoc}
              allowMultiple={false}
              maxFileSize={"5MB"}
              id={styles.formData_projectNoc}
              labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
              labelMaxFileSize = "Maximum file size can be 5MB"
              onaddfile={handleprojectNoc}
              name="projectNoc" /* sets the file input name, it's filepond by default */
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              

            />  }
              
            </div>

              {/* *****************************RERA NOC STARTS **************************** */}     
            <div id={styles.project_reranoc} className={styles.project_form_div}>
              <label htmlFor="project_reranoc_field">Upload RERA NOC</label>
              {formData?.reraNoc != null ? 
              <FilePond
                files={reraNoc}
                onupdatefiles={setReraNoc}
                allowMultiple={false}
                maxFileSize={"5MB"}
                id={styles.formData_reraNoc}
                labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
                labelMaxFileSize = "Maximum file size can be 5MB"
                onaddfile={handleReraNoc}
           
                
                
                // server="/api"
                name="reraNoc" /* sets the file input name, it's filepond by default */
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                

              /> : <FilePond
                
              files={reraNoc}
              onupdatefiles={setReraNoc}
              allowMultiple={false}
              maxFileSize={"5MB"}
              id={styles.formData_reraNoc}
              labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
              labelMaxFileSize = "Maximum file size can be 5MB"
              onaddfile={handleReraNoc}
              name="reraNoc" /* sets the file input name, it's filepond by default */
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              

            />  }
              
            </div>
            {/* *****************************RERA NOC ENDS **************************** */}


            {/* Approved Plan */}
            <div id={styles.project_approvedPlan} className={styles.project_form_div}>
              <label htmlFor="project_approvedPlan_field">Upload Approved Plan</label>
              {formData?.approvedPlan != null ? 
              <FilePond
                files={approvedPlan}
                onupdatefiles={setApprovedPlan}
                allowMultiple={false}
                maxFileSize={"5MB"}
                id={styles.formData_approvedPlan}
                labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
                labelMaxFileSize = "Maximum file size can be 5MB"
                onaddfile={handleApprovedPlan}
           
                
                
                // server="/api"
                name="approvedPlan" /* sets the file input name, it's filepond by default */
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                

              /> : <FilePond
                
              files={approvedPlan}
              onupdatefiles={setApprovedPlan}
              allowMultiple={false}
              maxFileSize={"5MB"}
              id={styles.formData_approvedPlan}
              labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
              labelMaxFileSize = "Maximum file size can be 5MB"
              onaddfile={handleApprovedPlan}
              name="approvedPlan" /* sets the file input name, it's filepond by default */
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              

            />  }
              
            </div>
             {/* Brochure */}
             <div id={styles.project_brochure} className={styles.project_form_div}>
              <label htmlFor="project_brochure_field">Upload Brochure</label>
              {formData?.brochure != null ? 
              <FilePond
                files={brochure}
                onupdatefiles={setBrochure}
                allowMultiple={false}
                maxFileSize={"5MB"}
                id={styles.formData_brochure}
                labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
                labelMaxFileSize = "Maximum file size can be 5MB"
                onaddfile={handleBrochure}
           
                
                
                // server="/api"
                name="brochure" /* sets the file input name, it's filepond by default */
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                

              /> : <FilePond
                
              files={brochure}
              onupdatefiles={setBrochure}
              allowMultiple={false}
              maxFileSize={"5MB"}
              id={styles.formData_brochure}
              labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
              labelMaxFileSize = "Maximum file size can be 5MB"
              onaddfile={handleBrochure}
              name="brochure" /* sets the file input name, it's filepond by default */
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
                defaultValue={""}
                
              >
                <option value="" disabled>Select</option>
                <option value={"ongoing"}>Ongoing</option>
                <option value={"completed"}>Completed</option>
                <option value={"upcoming"}>Upcoming</option>
              </select>
            </div>
          
            
           
        
            
              <div id={styles.project_location} className={styles.project_form_div}>
                <label htmlFor="project_location_field">Location</label>
                <TextField id={styles.project_location_field} name='location' label="Location" variant="outlined" onChange={handleChange} value={formData?.location} />

              </div>

              <div className={` ${styles.project_form_outerdiv}`}>
                <div id={styles.project_start} className={styles.project_form_div}>
                  <label htmlFor="project_start_field">Start Date</label>
                  <TextField id={styles.project_start_field} name='startDate' type='date' variant="outlined" onChange={handleChange} value={formData?.startDate} />
                </div>
                <div id={styles.project_end} className={styles.project_form_div}>
                  <label htmlFor="project_end_field">End Date</label>
                  <TextField id={styles.project_end_field} name='endDate' type='date'  variant="outlined" onChange={handleChange} value={formData?.endDate} />
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














