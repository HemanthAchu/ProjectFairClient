import React, { createContext, useState } from 'react'
export const  addResponseContext =createContext()
export const editResponseContext =createContext()
function Context({children}) {
    const [addResponse,setAddResponse] =useState("")
    const [editResponse,seteditResponse] =useState("")
  return (
    <>
    <addResponseContext.Provider value={{addResponse,setAddResponse}}>
<editResponseContext.Provider value={{editResponse,seteditResponse}}>
{children}
</editResponseContext.Provider>
        
    </addResponseContext.Provider>
      
    </>
  )
}

export default Context
