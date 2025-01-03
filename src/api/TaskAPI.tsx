import api from "@/lib/axios";
import { Project,TaskFormData } from "../types";
import { isAxiosError } from "axios";


type TaskAPIType={
   formTaskData:TaskFormData,
   projectId:Project['_id']
}  

export const createTask =async ({formTaskData, projectId}:TaskAPIType) => {
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