import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Project, TeamMember, TeamMemberForm, teamMembersSchema } from "../types";

type TeamAPIType={
   formData:TeamMemberForm,
   projectId:Project['_id'],
   
}  

export const findUserByEmail =async ({formData, projectId}: Pick<TeamAPIType, 'formData'|'projectId'>) => {
    try {
        const URLFINDUSER=`/projects/${projectId}/team/find`
        const {data}= await api.post(URLFINDUSER,formData)            
        return data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
         }
    }
  };

export const addUserTeam =async ({projectId,id}: {projectId:Project['_id'],id:TeamMember['_id']}) => {
    try {
        const URLFINDUSER=`/projects/${projectId}/team/`
        const {data}= await api.post(URLFINDUSER,{id})            
        return data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
         }
    }
  };

export const getProjectTeam =async ({projectId}: {projectId:Project['_id']}) => {
    try {
        const URL=`/projects/${projectId}/team/`
        const {data}= await api(URL)      
        const response=teamMembersSchema.safeParse(data)
        if(response.success){
            return response.data
        }              
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
         }
    }
  };

  export const deleteUserTeam =async ({projectId,id}: {projectId:Project['_id'],id:TeamMember['_id']}) => {
    try {
        const URL=`/projects/${projectId}/team/${id}`
        const {data}= await api.delete(URL)            
        return data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
         }
    }
  };