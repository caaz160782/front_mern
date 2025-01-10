import api from "@/lib/axios";
import { Project,Task,TaskFormData } from "../types";
import { isAxiosError } from "axios";


type TaskAPIType={
   formTaskData:TaskFormData,
   projectId:Project['_id'],
   taskId: Task['_id'],
   status: Task['status']
}  

export const createTask =async ({formTaskData, projectId}: Pick<TaskAPIType, 'formTaskData'|'projectId'>) => {
    try {
        const URLTASK=`/projects/${projectId}/tasks`
        const {data}= await api.post(URLTASK,formTaskData)            
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message)
         }
    }
  };

  export const getTaskById = async ({projectId, taskId}:Pick<TaskAPIType, 'projectId'|'taskId'>) => {
    try {
        const URLTASK=`/projects/${projectId}/tasks/${taskId}`
        const {data}= await api(URLTASK)            
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message)
         }
    }
  };
  
  export const updatedTask = async ({formTaskData,projectId, taskId}:Pick<TaskAPIType, 'formTaskData'|'projectId'|'taskId'>) => {
    try {
        const URLTASK=`/projects/${projectId}/tasks/${taskId}`
        const {data}= await api.patch(URLTASK,formTaskData)            
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message)
         }
    }
  };
  
 export const deletedTaskById = async ({projectId, taskId}:Pick<TaskAPIType, 'projectId'|'taskId'>) => {
    try {
        const URLTASK=`/projects/${projectId}/tasks/${taskId}`
        const {data}= await api.delete(URLTASK)            
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message)
         }
    }
  };

  export const updateStatusTask = async ({projectId, taskId,status}:Pick<TaskAPIType, 'projectId'|'taskId'|'status'>) => {
    try {
        const URLTASK=`/projects/${projectId}/tasks/${taskId}/status`
        const {data}= await api.post(URLTASK,{status})            
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message)
         }
    }
  };