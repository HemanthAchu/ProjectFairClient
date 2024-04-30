import React, { useState } from 'react'

import {Button, Card,Modal} from 'react-bootstrap';
import { SERVER_URL } from '../services/serverUrl';

function Project({project}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(project);
  console.log(` projectimage  :  ${project?.projectimage}`);
  return (
    <div>

    <Card className='shadow mb-5 btn' style={{ width: '18rem' }} onClick={handleShow} >
      
      <Card.Img variant="top" height={"200px"} src={`${SERVER_URL}/uploads/${project?.projectImage
}`} alt={project?.title} />


      <Card.Body>
        <Card.Title>{project?.title}</Card.Title>
        
      </Card.Body>
    </Card>
    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{project?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className="col-lg-6">
            <img style={{width:'300px',height:"250px"}}  src={`${SERVER_URL}/uploads/${project?.projectImage}`} alt="" />
            </div>
            <div className="col-lg-6">
              <h3>{project?.title}</h3>
              <h6><span className='fw-bolder'>Languages Used</span> :{project?.language} </h6>
              <p style={{textAlign:'justify'}}> <span>Description :</span> {project?.overview}</p>
            </div>
          </div>

          <div className='float-start mt-2'>
            <a href={project?.github} target='_blank' className='btn btn-secondary'  >
              <i className='fa-brands fa-github'></i>
            </a>

            <a href={project?.website} target='_blank' className='btn btn-secondary ms-2'  >
              <i className='fa-brands fa-link'></i>
            </a>
            {console.log(project?.website)}

          </div>
        </Modal.Body>
       
      </Modal>
    </div>
  )
}

export default Project
