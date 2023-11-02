import React,{useState} from 'react'
import styles from './CreateAmenities.module.css'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';

import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import { TextField, Button } from '@mui/material'
import axios from 'axios'
import Swal from 'sweetalert2'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview,FilePondPluginFileValidateSize,FilePondPluginFileEncode)

const CreateAmenities = () => {
    const [amenities,setAmenities] = useState({amenityName:'',amenity:null})
    const [files,setFiles] = useState([])

    const handleChange = (e) => {
        setAmenities({
            ...amenities,
            [e.target.name]: e.target.value, 
        })

    }
    function handleAmenityIcon(err,item){
        if(err) {
          console.warn(err); return;
        }
          setAmenities({
            ...amenities,
            amenity:item.source
          })
          console.log(item.source)
      }
      const handleSubmit = (e) => {
        console.log(amenities)
        e.preventDefault()
        axios.post('http://64.227.148.189/api/amenity', {
            ...amenities,
            
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
            console.log(response)
          
          })
          .catch(function (error) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Please fill the form',
            })
            console.log(error)
          });
         
      }

  return (
    <div className={styles.create_amenity_container}>
        <h2>Create Amenity</h2>
        <div className={styles.create_amenity}>

            <form action="" onSubmit={handleSubmit}>
                <div className={styles.createamenity_form_div}>
                    <label htmlFor="">Add Amenity Icon</label>
                    <FilePond
                    files={files}
                    onupdatefiles={setFiles}
                    maxFileSize={"1MB"}
                    onaddfile={handleAmenityIcon}
                    labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
                    labelMaxFileSize = "Maximum file size can be 1MB"
                    name="files" /* sets the file input name, it's filepond by default */
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />
                </div>
                <div className={styles.createamenity_form_div}>
                    <label htmlFor="">Add Amenity Name</label>
                    <TextField label="Amenity Name" name='amenityName' variant="outlined" onChange={handleChange} />
                </div>
                <div className={styles.createamenity_form_div}>
                    <Button type='submit' variant="contained" >Submit</Button>
                </div>

            </form>
        </div>
    </div>
  )
}

export default CreateAmenities