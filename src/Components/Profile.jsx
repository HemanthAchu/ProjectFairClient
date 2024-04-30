import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
function Profile() {
  const [open, setOpen] = useState(false);
  return (
    <div>
     <div className="d-flex justify-content-between">
      <h3 className='text-warning'>Profile</h3>
      <button  onClick={() => setOpen(!open)}  className='btn' >
        <i className='fa-solid fa-chevron-down'></i>
      </button>
     </div>
     <Collapse in={open}>
        <div className='row justify-content-center align-items-center shadow rounded p-3' id="example-collapse-text">
        <label className='text-center mb-2'>
          <input type="file" style={{display:"none"}} />
          <img width={'200px'} height={'200px'} className='rounded-circle' src="https://imgs.search.brave.com/fL2ympGnFQZv3t2lxmFLfoF1Dorf89wgmz8lIwobE6M/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE3LzM0LzY3/LzM2MF9GXzIxNzM0/Njc4Ml83WHBDVHQ4/YkxOSnF2VkFhRFpK/d3Zaam0wZXBRbWo2/ai5qcGc" alt="profile photo" />
        </label>
        <div className='mb-2'>
          <input className='form-control' type="text" placeholder='Github' />
        </div>
        <div className='mb-2'>
          <input className='form-control' type="text" placeholder='LinkedIn URL' />
        </div>
        <div className='d-grid'>
          <button className='btn btn-warning'>Update Profile</button>
        </div>
        </div>
      </Collapse>
    </div>
  )
}

export default Profile
