import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm } from "../types";


 export const createAccount =async (formData:UserRegistrationForm) => {
     try {
         const URLCREATE=`/auth/create-account`
         const {data}= await api.post(URLCREATE,formData)            
         return data
     } catch (error) {
         if(isAxiosError(error) && error.response){
             throw new Error(error.response.data.message)
          }
     }
   };

  export const confirmAccount =async (formData:ConfirmToken) => {
     try {
         const URLCREATE=`/auth/confirm-account`
         const {data}= await api.post(URLCREATE,formData)            
         return data
     } catch (error) {
        console.log(error)
         if(isAxiosError(error) && error.response){
             throw new Error(error.response.data.error)
          }
     }
   };  

   
  export const requestConfirmationCode =async (formData:RequestConfirmationCodeForm) => {
    try {
        const URLCREATE=`/auth/request-code`
        const {data}= await api.post(URLCREATE,formData)            
        return data
    } catch (error) {
       console.log(error)
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
         }
    }
  };  

  export const login =async (formData:UserLoginForm) => {
    try {
        const URLCREATE=`/auth/login`
        const {data}= await api.post(URLCREATE,formData)            
        localStorage.setItem('AUTH_TOKEN',data.jwtRes)
        return data
    } catch (error) {
       console.log(error)
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
         }
    }
  };  

  export const forgotPassword =async (formData:ForgotPasswordForm) => {
    try {
        const URLCREATE=`/auth/forgot-password`
        const {data}= await api.post(URLCREATE,formData)            
        return data
    } catch (error) {
       console.log(error)
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
         }
    }
  };  

  export const validateToken =async (formData:ConfirmToken) => {
    try {
        const URLCREATE=`/auth/validate-token`
        const {data}= await api.post(URLCREATE,formData)            
        return data
    } catch (error) {
       console.log(error)
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
         }
    }
  };  

  type updatePswAPIType={
     formData:NewPasswordForm,
     token: ConfirmToken['token']
     
  }  

  export const updatePassword =async ({formData,token}:updatePswAPIType) => {
    try {
        const URLCREATE=`/auth/update-password/${token}`
        const {data}= await api.post(URLCREATE,formData)            
        return data
    } catch (error) {
       console.log(error)
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
         }
    }
  }; 