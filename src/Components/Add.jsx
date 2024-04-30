import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../services/allAPI';
import { addResponseContext } from '../contexts/Context';
function Add() {
  const {addResponse,setAddResponse} = useContext(addResponseContext)
  const [preview, setpreview] = useState('')
  const [imageFile, setimageFile] = useState(false)
  const [projectDetails, setprojectDetails] = useState({
    title: "", language: "", overview: "", github: "", website: "", projectImage: ""
  })


  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
    setprojectDetails({
      title: "", language: "", overview: "", github: "", website: "", projectImage: ""
    })

  };
  const handleShow = () => setShow(true);
  // console.log(projectDetails);

  useEffect(() => {
    if (projectDetails.projectImage.type == "image/png" || projectDetails.projectImage.type == "image/jpg" || projectDetails.projectImage.type == "image/jpeg") {
      setimageFile(true)
      setpreview(URL.createObjectURL(projectDetails.projectImage))
    } else {
      setimageFile(false)
      setpreview("https://imgs.search.brave.com/fL2ympGnFQZv3t2lxmFLfoF1Dorf89wgmz8lIwobE6M/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE3LzM0LzY3/LzM2MF9GXzIxNzM0/Njc4Ml83WHBDVHQ4/YkxOSnF2VkFhRFpK/d3Zaam0wZXBRbWo2/ai5qcGc")
      setprojectDetails({ ...projectDetails, projectImage: "" })
    }
  }, [projectDetails.projectImage])


  const handleUploadProject = async () => {
    const { title, language, overview, github, website, projectImage } = projectDetails
    console.log(projectDetails);
    if (!title || !language || !overview || !github || ! website || !projectImage) {
      toast.warn("Please fill the fields")
    }else{
      //api call - reqbody
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectImage",projectImage)
      //api call reqHead
      const token = sessionStorage.getItem("token")
      console.log(token);
      if(token){
   
        const reqHeader= {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        console.log(reqHeader.Authorization);
        //api call
        try {
       
          const result = await addProjectAPI(reqBody,reqHeader)
          console.log(result);
          if(result.status==200){
            setAddResponse(result)
            handleClose()
            
          }
          else{
            toast.warning(result.response.data)
          }
        } catch (error) {
          console.log(error);
        }
      }

    }

  }




  return (
    <div>
      <button className='btn' onClick={handleShow} ><i className='fa-solid fa-plus me-1'></i>Add</button>
      <Modal size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className="col-lg-6">

              <label className='d-flex justify-content-center align-items-center' >
                <input type="file" style={{ display: 'none' }}

                  onChange={(e) => setprojectDetails({ ...projectDetails, projectImage: e.target })}


                />

                <img style={{ height: "200px" }} className='img-fluid' src={preview} alt="input image" />
              </label>
              {!imageFile && <div className="text-danger fw-bolder my-2">*Upload only following file types(png , jpg , jpeg) here !!!</div>}

            </div>
            <div className="col-lg-6">
              <div className='mb-2'>
                <input type="text" className='form-control' placeholder='Project Title' value={projectDetails.title} onChange={(e) => setprojectDetails({ ...projectDetails, title: e.target.value })} />
              </div>
              <div className='mb-2'>
                <input type="text" className='form-control' placeholder='Language used in the project'
                  value={projectDetails.language} onChange={(e) => setprojectDetails({ ...projectDetails, language: e.target.value })} />
              </div>
              <div className='mb-2'>
                <input type="text" className='form-control' placeholder='Project GitHub' value={projectDetails.github} onChange={(e) => setprojectDetails({ ...projectDetails, github: e.target.value })} />
              </div>
              <div className='mb-2'>
                <input type="text" className='form-control' placeholder='Project Website'
                  value={projectDetails.website} onChange={(e) => setprojectDetails({ ...projectDetails, website: e.target.value })} />
              </div>

            </div>
          </div>
          <div className='mb-2'>
            <input type="text" className='form-control' placeholder='Project Overview'
              value={projectDetails.overview} onChange={(e) => setprojectDetails({ ...projectDetails, overview: e.target.value })} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleUploadProject} variant="primary">Upload</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </div>
  )
}

export default Add

