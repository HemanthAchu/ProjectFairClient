import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Form,FloatingLabel } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allAPI';
import { tokenAuthContext } from '../contexts/tokenContextAPI';
function Auth({insideRegister}) {
  const {isAuthorised,setIsAuthorised} =useContext(tokenAuthContext)
  const navigate =useNavigate()
  const [userInputs,setuserInputs] =useState({
    username:"",
    email:"",
    password:""
  })
  console.log(userInputs);

  const handleRegister= async (e)=>{
  e.preventDefault()
  if(userInputs.email && userInputs.password && userInputs.username){
//api call
try{
  const result =await registerAPI(userInputs)
  if(result.status==200){
    toast.success(`welcome ${result.data.username}...please login to explore our website`)
    setuserInputs({username:"",email:"",password:""})
    setTimeout(() => {
      navigate('/login')
    }, 2000);
  }else{
    toast.error(result.response.data)
    setTimeout(() => {
      setuserInputs({username:"",email:"",password:""})
    }, 2000);
  }

}catch(err){
console.log(err);
}

  }else{
toast.info('Fill the form completely')
  }

  }


const handleLogin =async (e)=>{
e.preventDefault()
if(userInputs.email && userInputs.password){
//api call
try{
const result =await loginAPI(userInputs)
if(result.status==200){
  //store existingUser and token
  sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
  sessionStorage.setItem("token",result.data.token)
  setIsAuthorised(true)
  console.log(JSON.stringify(result.data.token));
  console.log(result.data.token);
  toast.warning(`welcome  ${result.data.existingUser.username}....`)
  setuserInputs({username:"",email:"",password:""})
  setTimeout(()=>{
  navigate('/')
  },2000)
}else{
  toast.error(result.response.data)
}
}
catch(err){
console.log(err);
}
  


}else{
  toast.warning('please fill the form completely!!!')
}
}


  return (
    <div style={{width:'100%',height:'100vh'}} className='d-flex justify-content-center align-items-center' >
      <div className="container w-75">
        
        <Link to={'/'} style={{textDecoration:"none"}} className='fw-bloder' >
          <i className='fa-solid fa-arrow-left me-2'></i>
          Bcak to Home</Link>

<div className="card shadow p-5">
  <div className='row'>
    <div className="col-lg-6">
<img className='w-100' src="https://imgs.search.brave.com/NgmUpFvRzYrPxZLfgWiNmCKXuuMjC7QAhNsLd7Mhi-I/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ0/OTMwNzQ1NS9waG90/by9maW5nZXJwcmlu/dC1hdXRoZW50aWNh/dGlvbi1idXR0b24t/YmlvbWV0cmljLXNl/Y3VyaXR5LmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1GOVMx/RWprMlJKVjUtanhL/U0stOF9pTWdnVXFx/cWpzOVNfUjcwOE5L/cGVBPQ" alt="" />
    </div>
    <div className="col-lg-6">
    <h1 className='fw-bolder mt-2' >
      <i className='fa-brands fa-docker'></i>
      Project Fair
    </h1>
    <h5 className='fw-bolder mt-2'>
      sign {insideRegister? 'up':'in'}to your Account
    </h5>
    <Form>
      {insideRegister && 
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control value={userInputs.username} onChange={e=>setuserInputs({...userInputs,username:e.target.value})} type="email" placeholder="name@example.com" />
        </FloatingLabel>
      }
    <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control value={userInputs.email} onChange={e=>setuserInputs({...userInputs,email:e.target.value})} type="email" placeholder="name@example.com" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control value={userInputs.password} onChange={e=>setuserInputs({...userInputs,password:e.target.value})} type="password" placeholder="Password" />
      </FloatingLabel>
      {
        insideRegister?<div className='mt-3'>
          <button onClick={handleRegister} className='btn btn-primary'>Register</button>
          <p>Already have an Account? click here to <Link to={'/login'}>Login</Link></p>
        </div> :
        <div className='mt-3'>
          <button onClick={handleLogin} className='btn btn-primary'>Login</button>
          <p>New User? Click here to <Link to={'/register'}>Register</Link></p>
        </div>
        
      }
    </Form>
    </div>
  </div>
</div>
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </div>
  )
}

export default Auth
