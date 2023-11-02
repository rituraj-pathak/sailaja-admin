import React, { useState,useEffect } from 'react'
import "./Login.css"
import { useNavigate } from 'react-router-dom'
import logo from "../../assets/logo.png"
import Swal from 'sweetalert2'

const Login = () => {
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(()=> {
    let login = localStorage.getItem('token')
    if(login){
        navigate('/layout')
    }
},[])

  const handleSubmit = (e) => {
    e.preventDefault()

    const LoginSubmitBtn = document.getElementById('loginBtn');

    let flag = true;
    const email =  document.forms['loginForm']['email'].value;
    const password =  document.forms['loginForm']['password'].value;
    const regName = /^[a-zA-Z ]*$/;
    const regEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/

    if(email.length==0){
        setError('email','*Email cannot be empty')
        flag=false
  
      }
      if(password.length==0){
        setError('password','*Password cannot be empty')
        flag=false
  
      }
      if(!regEmail.test(email) &&email.length!=0){
        setError('email','*Invalid Email')
        flag=false;
      }
      
      if(flag==true){
        LoginSubmitBtn.disabled = true;
        LoginSubmitBtn.innerHTML='Logging in...'
      
        fetch('http://64.227.148.189/api/admin/login', {
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
              LoginSubmitBtn.disabled = false;
              document.forms['loginForm']['email'].value = '';
              document.forms['loginForm']['password'].value = '';
              LoginSubmitBtn.innerHTML=`Submit`
            }
            else{
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "Your email or password is wrong",
              })
              LoginSubmitBtn.disabled = false;
              LoginSubmitBtn.innerHTML=`Submit`
            }

          })
          .catch((err) => {
              // console.log(err.message);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "Something went wrong!",
              })
            
              LoginSubmitBtn.disabled = false;
              document.forms['loginForm']['email'].value = '';
              document.forms['loginForm']['password'].value = '';
              LoginSubmitBtn.innerHTML=`Submit`
          });
      }
    
  }

  const setError = (id,error) => {
    const element = document.getElementById(id);
    element.getElementsByClassName('loginFormErrorClass')[0].innerHTML = error;
  }
  return (
    <div className="login_container">
      <div className='login_card'>
          <div className='login_card_head'>
            <img src={logo} alt="" />
            <h2>Admin Login</h2>
            <p>Please enter your details to sign in</p>
          </div>

          <form action="" name='loginForm'>
            <div className='email' id='email'>
              <input type="email" name='email' required placeholder='Email' onChange={(e)=> {setEmail(e.target.value);  setError(e.target.parentNode.id,'')} } />
              <p className='loginFormErrorClass'></p>
            </div>
            <div className='password' id='password'>
              <input type="password" name='password' required placeholder='Password'  onChange={(e)=>{ setPassword(e.target.value); setError(e.target.parentNode.id,'')}} />
              <p className='loginFormErrorClass'></p>
            </div>
            <button type='submit' id='loginBtn' onClick={handleSubmit}>Submit</button>
          </form>
      </div>
    </div>
  )
}

export default Login