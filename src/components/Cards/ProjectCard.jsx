import React,{useState} from 'react'
import styles from "./ProjectCard.module.css"
import { Switch } from '@mui/material'
import {Button} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const ProjectCard = ({projectInfo}) => {
    const [isChecked, setIsChecked] = useState(projectInfo.isActive);
    const navigate = useNavigate()

    const editProjectHandler = () => {
        navigate('/layout/newproject',{state:{projectInfo}})

    }
    const projectShowHandler = (e) => {
      
        setIsChecked(prev=>!prev)
      
        if(isChecked){
            axios.delete(`http://68.183.94.172/api/project/delete/${projectInfo._id}`, {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            },
            data: {
              isActive:false
            }
          }).then(response => {
            console.log(response);
          });

        }
        else{
            axios.delete(`http://68.183.94.172/api/project/delete/${projectInfo._id}`, {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            },
            data: {
              isActive:true
            }
          }).then(response => {
            console.log(response);
          });
        }

        
    }

  
  return (
    <div className={styles.projectcard}>
        <div className={styles.projectcard_img}>
            <img src={`http://68.183.94.172/${projectInfo.projectImage}`} alt="projectcard_image" />
        </div>
        <div className={styles.projectcard_body}>
            <div className={styles.projectcard_body_headinfo}>
                <p><strong>{projectInfo.status}</strong></p>
                <Switch onChange={projectShowHandler} checked={isChecked}  />
            </div>
            <div className={styles.projectcard_body_main}>
                <h3>{projectInfo.projectName}</h3>
            </div>
            <div className={styles.projectcard_body_btn}>
                <Button variant="outlined" onClick={editProjectHandler}>Edit</Button>
            </div>
        </div>

    </div>
  )
}

export default ProjectCard