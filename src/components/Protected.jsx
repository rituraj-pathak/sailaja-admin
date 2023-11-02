import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Protected = ({Component}) => {
    const navigate = useNavigate()
    useEffect(()=> {
        let login = localStorage.getItem('token')
        if(!login){
            navigate('/')
        }
    },[])
  return (
    <div>
        <Component/>
    </div>
  )
}

export default Protected