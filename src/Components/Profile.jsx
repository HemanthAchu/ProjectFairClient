import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { SERVER_URL } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserAPI } from '../services/allAPI';
function Profile() {
  const [preview, setpreview] = useState("")
  const [exitingImg, setExistingImg] = useState("")
  const [userDetails, setuserDetails] = useState({
    username: "", email: "", password: "", github: "", linkedIn: "", profileImage: ""
  })
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("existingUser")) {
      const existingUserDetails = JSON.parse(sessionStorage.getItem("existingUser"))
      setuserDetails({
        ...userDetails, username: existingUserDetails.username, email: existingUserDetails.email, password: existingUserDetails.password, github: existingUserDetails.github,
        linkedIn: existingUserDetails.linkedIn
      })
      setExistingImg(existingUserDetails.profile)
    }
  }, [open])


  useEffect(() => {
    if (userDetails.profileImage) {
      setpreview(URL.createObjectURL(userDetails.profileImage))
    } else {
      setpreview("")
    }
  }, [userDetails.profileImage])

  const handleUserprofile = async () => {
    const { useranme, email, password, github, linkedIn, profileImage } = userDetails
    if (!github || !linkedIn) {
      toast.warning('plz fill completely')
    } else {
      const reqBody = new FormData()
      reqBody.append("username", useranme)
      reqBody.append("email", email)
      reqBody.append("password", password)
      reqBody.append("github", github)
      reqBody.append("linkedIn", linkedIn)
      preview ? reqBody.append("profileImage", profileImage) :
        reqBody.append("profileImage", exitingImg)
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        try {
          const result = await updateUserAPI(reqBody, reqHeader)
          if (result.status == 200) {
            setOpen(!open)
            sessionStorage.setItem("existingUser", JSON.stringify(result.data))
          } else {
            console.log(result);
          }
        } catch (err) {
          console.log(err);
        }
      }

    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h3 className='text-warning'>Profile</h3>
        <button onClick={() => setOpen(!open)} className='btn' >
          <i className='fa-solid fa-chevron-down'></i>
        </button>
      </div>
      <Collapse in={open}>
        <div className='row justify-content-center align-items-center shadow rounded p-3' id="example-collapse-text">
          <label className='text-center mb-2'>
            <input onChange={e => setuserDetails({ ...userDetails, profileImage: e.target.files[0] })} type="file" style={{ display: "none" }} />

            {exitingImg == "" ? <img width={'200px'} height={'200px'} className='rounded-circle' src={preview ? preview : "https://imgs.search.brave.com/fL2ympGnFQZv3t2lxmFLfoF1Dorf89wgmz8lIwobE6M/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE3LzM0LzY3/LzM2MF9GXzIxNzM0/Njc4Ml83WHBDVHQ4/YkxOSnF2VkFhRFpK/d3Zaam0wZXBRbWo2/ai5qcGc"} alt="profile photo" /> :
              <img width={'200px'} height={'200px'} className='rounded-circle' src={preview ? preview : `${SERVER_URL}/uploads/${exitingImg}`} />
            }
          </label>
          <div className='mb-2'>
            <input value={userDetails.github} onChange={e => setuserDetails({ ...userDetails, github: e.target.value })} className='form-control' type="text" placeholder='Github' />
          </div>
          <div className='mb-2'>
            <input value={userDetails.linkedIn} onChange={e => setuserDetails({ ...userDetails, linkedIn: e.target.value })} className='form-control' type="text" placeholder='LinkedIn URL' />
          </div>
          <div className='d-grid'>
            <button onClick={handleUserprofile} className='btn btn-warning'>Update Profile</button>
          </div>
          <ToastContainer position='top-center' theme='colored' autoClose={3000} />
        </div>
      </Collapse>
    </div>
  )
}

export default Profile
