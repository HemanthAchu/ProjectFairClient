import React, { useContext, useEffect, useState } from 'react'
import Edit from './Edit'
import Add from './Add'
import { getuserProjectAPI, removeProjectAPI } from '../services/allAPI'
import { addResponseContext, editResponseContext } from '../contexts/Context'

function View() {
  const {editResponse,seteditResponse}=useContext(editResponseContext)
  const {addResponse,setAddResponse}=useContext(addResponseContext)
  const [userProjects,setuserProjects] =useState([])
  console.log(userProjects);
  useEffect(()=>{
    userProject()
  },[addResponse,editResponse])
  const userProject= async()=>{
    const token = sessionStorage.getItem("token")
    const reqHeader= {
     
      "Authorization":`Bearer ${token}`
    }
  try{
 const result =await getuserProjectAPI(reqHeader)
 console.log(result);
 setuserProjects(result.data)
  }catch(err){
  console.log(err);
  }
  }
  const handleDelete =async(projectId)=>{
const token =sessionStorage.getItem("token")
if(token){
  const reqHeader= {
    "Content-Type":"multipart/form-data",
    "Authorization":`Bearer ${token}`
  }
  const result =await removeProjectAPI(projectId,reqHeader)
  if(result.status==200){
    userProject()
  }else{
    console.log(result);
  }
}

  }
  return (
    <div>
     <div className="d-flex justify-content-between w-100">
      <h2 className='text-warning'>All Projects</h2>
      <div>
     <Add/>
     </div>
     </div>
    <div className='mt-4'>
    { userProjects?.length>0 ? userProjects.map((projectlist)=>(
      <div className="mb-2 d-flex justify-content-between border p-2 rounded ">
        <h3>{projectlist.title}</h3>
        <div className='icons d-flex'>
          <div ><Edit project={projectlist} /></div>
          <a className=' btn'  href={projectlist.github} target='_blank' ><i className='fa-brands fa-github '></i></a>
          <button onClick={()=>handleDelete(projectlist._id)}  className='btn'> <i className='fa-solid fa-trash text-danger'></i>
          </button>

        </div>
      </div>
    )):<div className='text-center text-danger '>Not projects Uploads !!</div> }
    </div>
    </div>
  )
}

export default View
