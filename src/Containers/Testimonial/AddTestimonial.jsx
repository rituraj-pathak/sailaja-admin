import React,{useState,useRef} from 'react'
import styles from "./AddTestimonial.module.css"
import { Button, TextField, Switch } from '@mui/material'

import { FilePond, registerPlugin } from 'react-filepond'

import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview,FilePondPluginFileValidateSize)

const AddTestimonial = () => {
    const [files, setFiles] = useState([]);
    const [disabled,setDisabled] = useState(true)
    const myRef = useRef(null);
    const handleChangeProjectSwitch = () => {
       if(disabled){
        setDisabled(false)
       }
       else{
        setDisabled(true)
       }
       

    }
  return (
    <div className={styles.addtestimonial_container}>
        <div className={styles.addtestimonial_header}>
            <h2>Add Testimonial</h2>
        </div>
        <div className={styles.addtestimonial_body}>
            <form action="">
                <div id={styles.addtestimonial_profile} className={styles.addtestimonial_form_section}>
                    <label htmlFor="">Add Profile Picture</label>
                    <FilePond
                        files={files}
                        onupdatefiles={setFiles}
                        allowMultiple={false}
                        maxFileSize={"1MB"}
                        labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
                        labelMaxFileSize = "Maximum file size can be 1MB"
                        
                        // server="/api"
                        name="files" /* sets the file input name, it's filepond by default */
                        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              />
                    

                </div>
                <div id={styles.addtestimonial_name} className={styles.addtestimonial_form_section}>
                    <label htmlFor="">Name</label>
                    <TextField id={styles.project_floors_field} label="Name" variant="outlined" />
                </div>
              
                <div id={styles.addtestimonial_location} className={styles.addtestimonial_form_section}>
                    <label htmlFor="">Location</label>
                    <TextField id={styles.project_floors_field} label="Location" variant="outlined" />
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
                        <select name="" id="" className={styles.addtestimonial_project_drop} disabled={disabled} >
                            <option value="">Project</option>
                            <option value="">Project</option>
                            <option value="">Project</option>
                        </select>
                    </div>
                </div>
                <div id={styles.addtestimonial_review} className={styles.addtestimonial_form_section}>
                    <label htmlFor="">Enter your review</label>
                    <TextField id={styles.project_floors_field} label="Review" variant="outlined"  multiline rows={4} />
                </div>
                <div  className={styles.addtestimonial_form_section}>
                <Button variant="contained">Submit</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddTestimonial