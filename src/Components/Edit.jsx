import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { SERVER_URL } from '../services/serverUrl';
import { toast } from 'react-toastify';
import { editProjectAPI } from '../services/allAPI';
import { editResponseContext } from '../contexts/Context';

function Edit({project}) {
  const {editResponse,seteditResponse}=useContext(editResponseContext)
  console.log(project);

  const [projectdata,setprojectdata]=useState({
    id:project._id,title:project?.title,language:project?.language,overview:project?.overview,github:project?.github,website:project?.website,projectImage:""
  })
  console.log(projectdata);
  const [preview,setpreview] =useState("")
  const [show, setShow] = useState(false);

  const handleClose = () =>{ setShow(false)
  
    setprojectdata({
      id:project._id,title:project?.title,language:project?.language,overview:project?.overview,github:project?.github,website:project?.website,projectImage:""
    })
    setpreview("")

  }
  const handleShow = () => {setShow(true);
    setprojectdata({
      id:project._id,title:project?.title,language:project?.language,overview:project?.overview,github:project?.github,website:project?.website,projectImage:""
    })
}
  useEffect(()=>{
if(projectdata.projectImage){
setpreview(URL.createObjectURL(projectdata.projectImage))
}else{
setpreview("")
}
  },[projectdata.projectImage])

const handleUpdateProject =async ()=>{
  const {title,language,overview,github,website,projectImage}=projectdata
  if(!title || !language || !overview || !github || !website){
toast.warning("plz fill the form completely")
  }else{
//process api call
const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)
      //api call reqHead
    const token =sessionStorage.getItem("token")
    if(token){
      const reqHeader ={
        "Content-Type":preview?"multipart/form-data":"application/json",
          "Authorization":`Bearer ${token}`
      }
      try{
const result = await editProjectAPI(projectdata.id,reqBody,reqHeader)
console.log(result);
if(result.status==200){
  handleClose()
  seteditResponse(result)
//pass response view
}else{
  console.log(result.data);
}
      }catch(err){

      }
    }

      
}
}
  return (
    <div>
      <button className='btn' onClick={handleShow} ><i  className='fa-solid fa-edit '></i></button>
      <Modal size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className='row'>
          <div className="col-lg-6">

<label className='d-flex justify-content-center align-items-center' >
  <input type="file" onChange={e=>setprojectdata({...projectdata,projectImage:e.target.files[0]})}   style={{display:'none'}}/>
  <img style={{height:"200px"}} className='img-fluid ' src={preview?preview:`${SERVER_URL}/uploads/${project?.projectImage}`} alt="input image" />
</label>

          </div>
          <div className="col-lg-6">
<div className='mb-2'>
  <input value={projectdata?.title} onChange={(e)=>setprojectdata({...projectdata,title:e.target.value})} type="text" className='form-control' placeholder='Project Title' />
</div>
<div className='mb-2'>
  <input value={projectdata?.language} onChange={(e)=>setprojectdata({...projectdata,language:e.target.value})}  type="text" className='form-control' placeholder='Language used in the project' />
</div>
<div className='mb-2'>
  <input value={projectdata?.github} onChange={(e)=>setprojectdata({...projectdata,github:e.target.value})} type="text" className='form-control' placeholder='Project GitHub' />
</div>
<div className='mb-2'>
  <input value={projectdata?.website} onChange={(e)=>setprojectdata({...projectdata,website:e.target.value})} type="text" className='form-control' placeholder='Project Website' />
</div>

          </div>
         </div>
         <div className='mb-2'>
  <input value={projectdata?.overview} onChange={(e)=>setprojectdata({...projectdata,overview:e.target.value})} type="text" className='form-control' placeholder='Project Overview' />
</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleUpdateProject} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Edit
