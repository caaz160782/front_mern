import {z} from 'zod'

/**auth user */
export const authSchema= z.object({
    name: z.string(), 
    email: z.string(),    
    password: z.string(),
    password_confirmation: z.string(),   
    token: z.string()
})

export type Auth= z.infer<typeof authSchema>
export type UserLoginForm =Pick< Auth,'email'| 'password' >
export type UserRegistrationForm =Pick< Auth,'name'|'email'| 'password'|'password_confirmation' >

export type RequestConfirmationCodeForm =Pick< Auth,'email'>
export type ForgotPasswordForm =Pick< Auth,'email'>
export type NewPasswordForm =Pick< Auth, 'password'|'password_confirmation' >
export type ConfirmToken =Pick< Auth, 'token'>
/** user */
export const userSchema= z.object({
    _id: z.string(), 
    name: z.string(), 
    email: z.string()       
})
export type User= z.infer<typeof userSchema>
/** projects */
export const taskStatusSchema=z.enum(["pending" , "onHold" , "inProgress" , "underReview" , "completed"])
export type TaskStatus =z.infer<typeof taskStatusSchema>

export const taskSchema= z.object({
    _id: z.string(),
    name: z.string(),    
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
})

export type Task =z.infer<typeof taskSchema>
export type TaskFormData =Pick< Task,'name'| 'description' >

export const projectSchema= z.object({
    _id: z.string(),
    projectName: z.string(),
     clientName: z.string(),
    description: z.string(),
})

export const dashboardProjectSchema= z.array(
    projectSchema.pick({
        _id:true,
        projectName:true,
        clientName:true,
        description:true
    })
)

export type Project= z.infer<typeof projectSchema>
export type ProjectFormData= Pick< Project, 'clientName' |'description'|'projectName'>

/**team */
const teamMemberSchema = userSchema.pick({    
    _id: true,
    name: true,
    email:true,    
})

export const teamMembersSchema=z.array(teamMemberSchema)
export type TeamMember= z.infer<typeof teamMemberSchema>
export type TeamMemberForm= Pick<TeamMember,'email'>