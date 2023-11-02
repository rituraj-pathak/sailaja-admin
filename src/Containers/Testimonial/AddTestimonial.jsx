import React,{useState,useRef,useEffect} from 'react'
import styles from "./AddTestimonial.module.css"
import { Button, TextField, Switch } from '@mui/material'

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

const AddTestimonial = () => {
    const [allProjects,setAllProjects] = useState([])
    const [testimonialData,setTestimonialData] = useState({name:'',review:'',isGlobal:true,projectId:'',userImage:null});
    const [files, setFiles] = useState([]);
    const [disabled,setDisabled] = useState(testimonialData.isGlobal)
    const myRef = useRef(null);

    useEffect(()=> {
        axios.get('http://64.227.148.189/api/project/list', {
        })
        .then(function (response) {
          setAllProjects(response.data.data)
     
        })
        .catch(function (error) {
          console.log(error);
        })
      },[])


    const handleChangeProjectSwitch = () => {
       if(disabled){
        setDisabled(false)
        testimonialData.isGlobal=false
       }
       else{
        setDisabled(true)
        testimonialData.isGlobal=true
       }
    }

    const handleChange = (e) => {
        setTestimonialData({
            ...testimonialData,
            [e.target.name]: e.target.value,
           

        })

    }
    const handleUserImage = (err,item) => {
        setTestimonialData({
            ...testimonialData,
            userImage: item.source
        })
        console.log(item.source)
    }

    const testimonyHandler = (e) => {
        e.preventDefault();
        axios.post('http://64.227.148.189/api/testimony', {
      ...testimonialData      
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
            title: 'Success',
            text: 'Testimony Posted',
          }).then(function() {
            window.location.href = "/layout/addtestimonial"
        }) 
    })
    .catch(function (error) {
        console.log(error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response.data.message,
          }).then(function() {
            window.location.href = "/layout/addtestimonial"
        }) 
    });
}
console.log(testimonialData)

  return (
    <div className={styles.addtestimonial_container}>
        <div className={styles.addtestimonial_header}>
            <h2>Add Testimonial</h2>
        </div>
        <div className={styles.addtestimonial_body}>
            <form onSubmit={testimonyHandler}>
                <div id={styles.addtestimonial_profile} className={styles.addtestimonial_form_section}>
                    <label htmlFor="">Add Profile Picture</label>
                    <FilePond
                        files={files}
                        onupdatefiles={setFiles}
                        allowMultiple={false}
                        maxFileSize={"1MB"}
                        labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
                        labelMaxFileSize = "Maximum file size can be 1MB"
                        onChange={handleChange}
                        onaddfile={handleUserImage}
                        
                        // server="/api"
                        name="files" /* sets the file input name, it's filepond by default */
                        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              />
                    

                </div>
                <div id={styles.addtestimonial_name} className={styles.addtestimonial_form_section}>
                    <label htmlFor="">Name</label>
                    <TextField id={styles.project_floors_field} label="Name" name='name' variant="outlined" onChange={handleChange} />
                </div>
              
                <div className={styles.addtestimonial_form_section}>
                    <div className={styles.addtestimonial_project_q}>
                        <label htmlFor="">Related to a project: </label>
                        <Switch
                        // checked={checked}
                        
                        onChange={handleChangeProjectSwitch}
                        inputProps={{ 'aria-label': 'controlled' }}/>
                    </div>
                    <div className={styles.addtestimonial_project_select}>
                        <label htmlFor="">Select the project: </label>
                        <select name="projectId" id="" defaultValue="" className={styles.addtestimonial_project_drop} disabled={disabled} onChange={handleChange}  >
                        <option value="" disabled>
                                Select a project
                        </option>
                            {allProjects.map(project=>(
                                
                                <option value={project._id}>{project.projectName}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div id={styles.addtestimonial_review} className={styles.addtestimonial_form_section}>
                    <label htmlFor="">Enter your review</label>
                    <TextField id={styles.project_floors_field} label="Review" name='review' variant="outlined" onChange={handleChange}  multiline rows={4} />
                </div>
                <div  className={styles.addtestimonial_form_section}>
                    <Button type='submit' variant="contained">Submit</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddTestimonial