import React, { useState } from 'react'
import "./Login.css"
import { useNavigate } from 'react-router-dom'
import logo from "../../assets/logo.png"
const Login = () => {
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
  
    fetch('http://68.183.94.172/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
       .then((response) => response.json())
       .then((data) => {
        if(data.status==200){
          navigate('/layout')
          localStorage.setItem('token', data.token);
        }

       })
       .catch((err) => {
          console.log(err.message);
       });
    
    
  }
  return (
    <div className="login_container">
      <div className='login_card'>
          <div className='login_card_head'>
            <img src={logo} alt="" />
            <h2>Admin Login</h2>
            <p>Please enter your details to sign in</p>
          </div>

          <form action="">
            <div className='email'>
              <input type="email" name='email' required placeholder='Email' onChange={(e)=> setEmail(e.target.value) } />
            </div>
            <div className='email'>
              <input type="password" name='password' required placeholder='Password'  onChange={(e)=> setPassword(e.target.value)} />
            </div>
            <button type='button' onClick={handleSubmit}>Submit</button>
          </form>
      </div>
    </div>
  )
}

export default Login