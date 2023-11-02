import React, {useState, useEffect} from 'react'
import axios from 'axios'
import styles from "./ManageTestimonial.module.css"
import {Button} from '@mui/material'
import Swal from 'sweetalert2'

const ManageTestimonial = () => {
  const [allProjects, setAllProjects] = useState([])
  const [project,setProject]= useState({})
  const [isGlobal, setIsGlobal] = useState(false)
  const [testimony, setTestimony]= useState([])
  const [hasRendered, setHasRendered] = useState(false);
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

  useEffect(()=> {
    if(hasRendered){
    if(isGlobal==true){
    
    axios.get('http://64.227.148.189/api/testimony?isGlobal=true')
    .then(function (response) {
      setTestimony(response.data.data)   
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  else{
    axios.get(`http://64.227.148.189/api/testimony?projectId=${project._id}&isGlobal=false`)
    .then(function (response) {
      setTestimony(response.data.data)   
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}
  else {
    setHasRendered(true);
  }
    
  
  },[project ])

  


  const handleSelectChange = (e) => {
    if (e.target.value === 'global') {
      setIsGlobal(true);
    } else {
      setIsGlobal(false);
    }

    setProject(allProjects.find(project => project.projectName === event.target.value))
  };

  const deleteTestimonyHandler = (id) => {
    axios.delete(`http://64.227.148.189/api/testimony/${id}`,{
      headers: {
          'Authorization' : `Bearer ${localStorage.getItem('token')}`
      },
     
    })
    .then(function (response) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Testimony deleted successfully',
      }).then(function() {
        window.location.href = "/layout/managetestimonial"
    })  
    })
    .catch(function (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      }).then(function() {
        window.location.href = "/layout/managetestimonial"
    })  
    })

  }

  return (
    <div className={styles.manage_testimonial_container}>
      <h2>Manage testimonials</h2>
      <div className={styles.manage_testimonials_filter}>
        <p>Select Project : </p>
        <form >
            <div id={styles.selectProject}>
                <select onChange={handleSelectChange}  defaultValue="">
                      <option value="" disabled>
                                Select a project
                        </option>
                        <option value="global">
                                Global
                        </option>
                  {allProjects.map((project,i) => {
                    return ( 
                      <option key={i} value={project.projectName} >
                        {project.projectName}
                      </option>
                    );
                  })}
                </select>
            </div>
            </form>
      </div>
    <div className={styles.manage_testimonials}>
      {testimony.length? (
        testimony.map(test=> (
          <div className={styles.testimonial_card} key={test._id}>
          <div className={styles.testimonial_head}>
            <div className={styles.testimonial_img}>
              <img src={`http://64.227.148.189${test.userImage}`} alt="" />
            </div>
            <div>
              <h4>{test.name}</h4>
              <p>Guwahati</p>
            </div>
          </div>
          <div className={styles.testimonial_body}>
            <p>{test.review}</p>
            <div className={styles.testimonial_btn}>
            <Button variant="contained" onClick={() => deleteTestimonyHandler(test._id)}>Delete</Button>
            </div>
          </div>
        </div>
  
        ))
      ): <p>No testimony found</p>}
      
      
    
     
      
    </div>
    </div>
  )
}

export default ManageTestimonial