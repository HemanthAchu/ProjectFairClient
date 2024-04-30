import React, { useEffect, useState } from 'react'
import Project from '../Components/Project'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { gethomeProjectAPI } from '../services/allAPI';
function Home() {

  const [homeProjects,setHomeProjects]=useState([])

  const navigate =useNavigate()

  const [loginStatus,setLoginStatus] =useState(false)
  useEffect(()=>{
 getHomeProjects()
    if(sessionStorage.getItem('token')){
setLoginStatus(true)
    }else{
setLoginStatus(false)
    }
  },[])
console.log(homeProjects);

  const getHomeProjects =async ()=>{
    try{
const result =await gethomeProjectAPI()
console.log(result);

if(result.status==200){

  setHomeProjects(result.data)
}
    }catch(err){
      console.log(err);
    }
  }

  const handleprojects =()=>{
    if(loginStatus){
    navigate('/projects')
    }else{
   toast.warning("please login to get full access to our projects!!!")
    }
  }

  return (
    <>
    <div className='container '>
      <div style={{height:'100vh'}} className='row w-100 border'>
       <div  className="col-lg-6 d-flex align-items-center justify-content-center ">
       <div  >
          <h1 className='d-flex align-items-center' style={{fontSize:"88px"}}> <i class="fa-solid fa-arrow-trend-up me-2 "></i> ProjectFair</h1>
          <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quos tempore dolorem ea necessitatibus expedita incidunt tenetur ullam beatae neque vero recusandae error nobis est, quaerat obcaecati vitae debitis. Sequi!</p>
        {loginStatus? <Link style={{textDecoration:'none'}} to={'/dashboard'}>
         <button className='btn btn-info d-flex justify-content-between align-items-center'>Manage Your Projects <i class="fa-solid fa-arrow-right ms-2 "></i></button>
         </Link>: <Link style={{textDecoration:'none'}} to={'/login'}>
         <button className='btn btn-info d-flex justify-content-between align-items-center'>Start to Explore <i class="fa-solid fa-arrow-right ms-2 "></i></button>
         </Link>}
        </div>
       </div>
        
        <div   className="col-lg-6 border d-flex align-items-center justify-content-center  p-2 "><img style={{width:"100%"}} src="https://imgs.search.brave.com/10EqDr2um96Mj_l0KzUmcCDUlWiVnhJNgUMozY_wcyE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTY1/MDM1ODgyL3ZlY3Rv/ci9jb21wdXRlci1j/YXJ0b29uLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1wb0ph/RWtCelNPalN1aFV0/eFdhSmxFaWd6dHU4/cVBOTlNaeTd2SG04/QWZ3PQ" alt="image" /></div>
      </div>
    </div>
    <div className='mt-5 text-center'>
      <h1 className='text-center mb-5'>
        Explore Our Projects
      </h1>
      <marquee>
        <div className='d-flex'>
          {homeProjects?.length>0 && homeProjects?.map((project)=>(
            <div key={project} className='me-5'>
            <Project project={project} />
          </div>
          ))}
        </div>
      </marquee>
      <button onClick={handleprojects} className='btn btn-link mt-3'>Click here to view More Projects...</button>
    </div>
    <hr />
    <h1 className='text-center'>Our Testimoials</h1>
    <div className="d-flex justify-content-center align-items-center mb-5 mt-5 ">
      
      <div className="d-flex justify-content-evenly align-items-center mt-3 w-100">
      <Card style={{ width: '18rem' }}>
      
      <Card.Body>
        <Card.Title className='d-flex justify-content-evenly align-items-center flex-column mt-3'>
          
        <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://imgs.search.brave.com/ww5k7GZKu3CaMGwAsbPlFlyM7ogaHe2ZnHdOvxrz9kE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0Lzk4LzcyLzQz/LzM2MF9GXzQ5ODcy/NDMyM19Gb25BeThM/WVlmRDFCVUMwYmNL/NTZhb1l3dUxISjJH/ZS5qcGc" alt="image" /> <span>Max miller</span></Card.Title>
        <Card.Text>
          <div className='d-flex justify-content-center'>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
          </div>
          <p style={{textAlign:"justify"}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis cumque, dolore, explicabo recusandae voluptate quibusdam rerum mollitia tempora voluptatum reprehenderit enim, cupiditate nobis error nihil at. Cum cupiditate modi laudantium.</p>
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
      </div>
      <div className="d-flex justify-content-evenly align-items-center mt-3 w-100">
      <Card style={{ width: '18rem' }}>
      
      <Card.Body>
        <Card.Title className='d-flex justify-content-evenly align-items-center flex-column mt-3'>
          
        <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://imgs.search.brave.com/ww5k7GZKu3CaMGwAsbPlFlyM7ogaHe2ZnHdOvxrz9kE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0Lzk4LzcyLzQz/LzM2MF9GXzQ5ODcy/NDMyM19Gb25BeThM/WVlmRDFCVUMwYmNL/NTZhb1l3dUxISjJH/ZS5qcGc" alt="image" /> <span>Max miller</span></Card.Title>
        <Card.Text>
          <div className='d-flex justify-content-center'>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
          </div>
          <p style={{textAlign:"justify"}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis cumque, dolore, explicabo recusandae voluptate quibusdam rerum mollitia tempora voluptatum reprehenderit enim, cupiditate nobis error nihil at. Cum cupiditate modi laudantium.</p>
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
      </div>
      <div className="d-flex justify-content-evenly align-items-center mt-3 w-100">
      <Card style={{ width: '18rem' }}>
      
      <Card.Body>
        <Card.Title className='d-flex justify-content-evenly align-items-center flex-column mt-3'>
          
        <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://imgs.search.brave.com/ww5k7GZKu3CaMGwAsbPlFlyM7ogaHe2ZnHdOvxrz9kE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0Lzk4LzcyLzQz/LzM2MF9GXzQ5ODcy/NDMyM19Gb25BeThM/WVlmRDFCVUMwYmNL/NTZhb1l3dUxISjJH/ZS5qcGc" alt="image" /> <span>Max miller</span></Card.Title>
        <Card.Text>
          <div className='d-flex justify-content-center'>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
          </div>
          <p style={{textAlign:"justify"}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis cumque, dolore, explicabo recusandae voluptate quibusdam rerum mollitia tempora voluptatum reprehenderit enim, cupiditate nobis error nihil at. Cum cupiditate modi laudantium.</p>
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
      </div>
    </div>
    <ToastContainer position='top-center' theme='colored' autoClose={3000}/>
    </>
  )
}

export default Home
