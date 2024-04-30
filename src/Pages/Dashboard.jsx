import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import View from '../Components/View'
import Profile from '../Components/Profile'
function Dashboard() {
const [displayName,setdisplayName] =useState('')

useEffect(()=>{
if(sessionStorage.getItem('existingUser')){

  const {username}=JSON.parse(sessionStorage.getItem('existingUser'))
setdisplayName(username)
}else{
setdisplayName('')
}
},[])


  return (
    <div>
      <Header insideDashboard={'ture'} />
     <div style={{marginTop:"100px"}} className='container-fluid'> 
     
     <div className="row mt-2">
      <div className="col-lg-8">
      <h1>Welcome <span className='text-warning'>{displayName}</span></h1>
       <View/>
      </div>
      <div className="col-lg-4">
        <Profile/>
      </div>
     </div>
      </div>
    </div>
  )
}

export default Dashboard
