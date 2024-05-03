//register

import { commonAPI } from "./commonAPI"
import { SERVER_URL } from "./serverUrl"

export const registerAPI =async(reqbody)=>{
    return await commonAPI('POST',`${SERVER_URL}/register`,reqbody)
}
export const loginAPI =async(reqbody)=>{
    return await commonAPI('POST',`${SERVER_URL}/login`,reqbody)
}

export const addProjectAPI =async(reqBody,reqHeader)=>{
    
    return await commonAPI('POST',`${SERVER_URL}/add-project`,reqBody,reqHeader)
}

export const getallProjectAPI =async(searchkey,reqHeader)=>{
    return await commonAPI('GET',`${SERVER_URL}/all-projects?search=${searchkey}`,"",reqHeader)
}
export const getuserProjectAPI =async(reqHeader)=>{
   return await commonAPI('GET',`${SERVER_URL}/user-projects`,"",reqHeader)
}

export const gethomeProjectAPI = async()=>{
    return await commonAPI('GET',`${SERVER_URL}/home-projects`,"")
}

export const editProjectAPI =async(projectId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/edit-project/${projectId}`,reqBody,reqHeader)
}
export const removeProjectAPI =async(projectId,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/removeProject/${projectId}`,{},reqHeader)
}

export const updateUserAPI =async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/edit-user`,reqBody,reqHeader)
}