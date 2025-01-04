import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams,Navigate } from 'react-router-dom';
import { getTaskById, updateStatusTask } from '@/api/TaskAPI';
import { formatDate } from '@/utils/utils';
import { statusTranslations } from '@/locales/es';
import { toast } from 'react-toastify';
import { TaskStatus } from '@/types/index';



export default function TaskModalDetails() {
     const  navigate = useNavigate()
     const params =useParams()
     const projectId= params.projectId!
     
     const location = useLocation();
     const queryParams = new URLSearchParams(location.search)
     const taskId = queryParams.get('viewTask')!
     const show = taskId ? true : false

     const {data,isLoading,isError} = useQuery({
        queryKey:['task',taskId],
        queryFn: ()=> getTaskById({projectId,taskId}),
        enabled:!!taskId
      }) 
    
    const queryClient=useQueryClient() 

    const {mutate} =useMutation({
            mutationFn:updateStatusTask,
            onError:(error)=>{
               toast.error(error.message)
            },                         
            onSuccess:(data)=>{      
              queryClient.invalidateQueries({queryKey:['task',taskId]})      
              queryClient.invalidateQueries({queryKey:['editProject',projectId]})      
              toast.success(data.message)                                               
             }            
           })
    
   const handleEditStatusTask=(e:React.ChangeEvent<HTMLSelectElement>)=>{
    const status= e.target.value as TaskStatus   
    const data ={
            projectId,
            taskId,
            status
          }
          mutate(data)
    }



     if(isLoading) return 'Cargando ...'
     if(isError) return <Navigate to='/404' />
     if(data)    
     return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname,{replace:true}) }>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <p className='text-sm text-slate-400'>Agregada el: {formatDate(data.payload.createdAt)}</p>
                                    <p className='text-sm text-slate-400'>Última actualización: {formatDate(data.payload.updatedAt)} </p>
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{data.payload.name}
                                    </Dialog.Title>
                                    <p className='text-lg text-slate-500 mb-2'>Descripción: {data.payload.description}</p>
                                    <div className='my-5 space-y-3'>
                                        {/* <label className='font-bold'>Estado Actual: {statusTranslations[]}</label> */}
                                        <label className='font-bold'>Estado Actual:</label>
                                        <select className='w-full p-3 bg-white border border-gray-300'
                                         defaultValue={data.payload.status}
                                         onChange={handleEditStatusTask}
                                        >
                                                {Object.entries(statusTranslations).map(([key,value]) =>(
                                                    <option key={key} value={key}>{value}</option>
                                                ))}
                                        </select>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}