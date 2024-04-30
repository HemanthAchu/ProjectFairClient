import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Project from '../Components/Project'
import { getallProjectAPI } from '../services/allAPI'
function Projects() {
  const [searchkey,setsearchkey] =useState("")
const [allprojects,setallprojects]=useState([])
  useEffect(()=>{
getAllProject()
  },[searchkey])
console.log(allprojects);
  const getAllProject= async()=>{
    const token = sessionStorage.getItem("token")
    const reqHeader= {
      "Authorization":`Bearer ${token}`
    }
    try{
      const result =await getallProjectAPI(searchkey,reqHeader)
   
    if(result.status==200){
      setallprojects(result.data)
    }

    }catch(err){
console.log(err);
    }

  }
  return (
    <>
    <Header/>
    <div  style={{marginTop:'150px'}} className='container-fulid'>
      <div className="d-flex justify-content-between">
        <h1>All Projects</h1>
        <input onChange={(e)=>setsearchkey(e.target.value)} className='form-control w-25' type="text" placeholder='search Project By language used' />
      </div>
      <div className="row mt-5">
      {allprojects?.length>0 ? allprojects?.map((allproject)=>(
        <div key={allproject} className='col-lg-4'>
          <Project project={allproject}/>
        </div>
      )):<div className='fw-bolder text-danger m-5 text-center'>Project Not Found</div> }
        
      </div>
    </div>
    </>
  )
}

export default Projects
