import React,{useState,useEffect} from 'react'
import styles from './AddAmenities.module.css'
import { Button } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddAmenities = () => {
    const [allProjects, setAllProjects] = useState([]);
    const [amenities,setAmenities] = useState([]);
    const [projectAmenity,setProjectAmenity] = useState([]);
    const [fetchedAmenity,setFetchedAmenity] = useState([]);
    const [project,setProject] = useState('');

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
        axios.get('http://64.227.148.189/api/amenity')
        .then(function (response) {
          // handle success
          setAmenities(response.data.data);
          
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
      },[])

      const handleChangeAmenity = (e) => {
        if (e.target.checked) {
          setProjectAmenity([
            ...projectAmenity,
            e.target.value
          ]);
        }
        else{
          setProjectAmenity(prevAmenities =>
            prevAmenities.filter(item => item !== e.target.value)
          );
        }
      }
        const handleChangeProject = (e) => {
          setProject(e.target.value);
          // console.log(e.target.value)
          console.log(document.querySelectorAll('.amenity_list_item_check_class'))
          axios.get(`http://64.227.148.189/api/amenity/project/${e.target.value}`)
        .then(function (response) {
          // handle success
          setFetchedAmenity(response.data.data.amenities)
          
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
      
  }
  useEffect(()=> {
  const amenityElements = document.querySelectorAll('.amenity_list_item_check_class');
    amenityElements.forEach(amenityElement=> {
      const amenityId = amenityElement.getAttribute('value');
      if (fetchedAmenity.some(item => item._id === amenityId)) {
        amenityElement.setAttribute('checked', true);
       
      }
      else{
        amenityElement.removeAttribute('checked');
      }

    })
    const amenityIds = fetchedAmenity.map(item => item._id);
    setProjectAmenity(amenityIds);

  },[fetchedAmenity])

      const amenityAddHandler = (e) => {
        e.preventDefault();
        
        axios.put('http://64.227.148.189/api/amenity/add/project', {
          projectId: project,
          amenityId: projectAmenity
          
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
            text: 'Amenities were successfully submitted',
          }).then(function() {
            window.location.reload()
        });
        
        })
        .catch(function (error) {
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Please fill the form',
          })
        });
       

      }
    

  return (
    <div className={styles.addAmenities_container}>
        <h2>Add Amenity</h2>
        <div className={styles.addAmenities}>
            <form action="" className={styles.addamenityForm}>
                    <div className={styles.add_amenity_project_select}>
                        <label htmlFor="add_amenity_project_select_field">Select your project</label>
                        <select id={styles.add_amenity_project_select_field} defaultValue="" onChange={handleChangeProject}>
                            <option value="" disabled>
                                Select a project
                            </option>
                            {allProjects.map((project, i) => (
                                <option key={i} value={project._id}>
                                    {project.projectName}
                                </option>
                            ))}
                        </select>
                    </div> 
                    <div className={styles.amenity_list_container}>
                      <h3>Add amenity to your project</h3>
                    <div className={styles.amenity_list}>
                      {amenities.map(amenity=> (
                        <div className={styles.amenity_list_item} key={amenity._id}>
                          <label htmlFor="amaneity_list_item">{amenity.amenityName}</label>
                          <input type="checkbox" id='amenity_list_item_check' className='amenity_list_item_check_class' name={amenity.amenityName} value={amenity._id} onClick={handleChangeAmenity}/>
                        </div>
                    ))}
                    
                    

                    </div> 
                    </div>
                    <div>
                      <Button variant="contained" type='submit' onClick={amenityAddHandler}>Submit</Button>
                    </div>             
            </form>
        </div>
    </div>
  )
}

export default AddAmenities