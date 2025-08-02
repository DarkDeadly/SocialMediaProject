import { Button } from '@/components/ui/button'
import { Input } from '@mui/material'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import SocialMedia from './SocialMedia'
import { useForm } from 'react-hook-form'
import { userContext } from "../context/UserContext"
import { Loader2Icon } from 'lucide-react'
import { toast } from 'react-toastify'
const LoginForm = () => {
   const Navigate = useNavigate()
   const {login , error , loading} = useContext(userContext)
   const {register , handleSubmit} = useForm()
   const LoginSubmit = async(data) => {
    
      const result = await login(data)
      if (!result) {
        toast.error(error)
      }
      else{
        toast.success("Logged in successfully")
      }
    
   }
  return (
    <div className='w-full h-full bg-white flex flex-col items-center justify-center gap-1.5'>
      <h1 className='LogoFont text-black text-center'>Social Sphere</h1>
      <p className='text-xl text-gray-600 italic text-center '>Get Started and Join the world with Social Sphere</p>
      <form onSubmit={handleSubmit(LoginSubmit)} className='flex flex-col gap-4 w-[95%]'>
        <Input {...register("email")} placeholder='Enter your Email' type='email'  />
        <Input {...register("password")}  placeholder='Enter your Password' type='password' />
        <Button className={"cursor-pointer"} disabled = {loading}> {loading && <Loader2Icon className='animate-spin' />} Login</Button>
        <SocialMedia/>
        <p className='text-center'>You Don't Have an account ? what you are waiting for <span className='hover:text-purple-600 cursor-pointer' onClick={()=> Navigate("/auth/register")}>Register</span></p>
       
      </form>
    </div>
  )
}

export default LoginForm
