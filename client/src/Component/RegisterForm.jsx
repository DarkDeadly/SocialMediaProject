import { Button } from '@/components/ui/button'
import { Input } from '@mui/material'
import { Loader2Icon, Mail } from 'lucide-react'
import React, { useContext } from 'react'
import SocialMedia from './SocialMedia'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import {userContext} from '../context/UserContext'
import { yupResolver } from '@hookform/resolvers/yup';
import {registerSchema} from "../util/validation"
import { toast } from 'react-toastify'
const RegisterForm = () => {

   


    const Navigate = useNavigate()
    const {register , handleSubmit , formState:{ errors }} = useForm(
      {resolver : yupResolver(registerSchema)}
    )
    const {registerUser , loading , error } = useContext(userContext)
    const SubmitRegister = async(data) => {
       const result = await registerUser(data)
        if (result) {
          Navigate("/auth/login")
          toast.success("Registered Successfully")
        }
       else{
        toast.error(error) 
       }
       
    }

  return (
    <div className='w-full h-full bg-white flex flex-col items-center justify-center gap-1.5'>
      <h1 className='LogoFont text-black text-center'>Social Sphere</h1>
      <p className='text-xl text-gray-600 italic text-center '>Get Started and Join the world with Social Sphere</p>
      <form onSubmit={handleSubmit(SubmitRegister)} className='flex flex-col gap-4 w-[95%]'>
        <Input placeholder='Enter your Username' {...register("username")} />
        <p className="text-red-500 text-sm">{errors?.username?.message}</p>
        <Input placeholder='Enter your Email' type='email' {...register("email")} />
        <p className="text-red-500 text-sm">{errors?.email?.message}</p>
        <Input placeholder='Enter your Password' type='password'{...register("password")} />
        <p className="text-red-500 text-sm">{errors?.password?.message}</p>
        <Input placeholder='Confirm your Password' type='password'{...register("confirmPassword")} />
        <p className="text-red-500 text-sm">{errors?.confirmPassword?.message}</p>
        <Button className={"cursor-pointer"}  disabled={loading} type = "submit">{loading && <Loader2Icon className='animate-spin' />} Register</Button>
        <SocialMedia/>
        <p className='text-center'>You Have an account ? what you are waiting for <span className='hover:text-purple-600 cursor-pointer' onClick={()=> Navigate("/auth/login")}>Login</span></p>
       
      </form>
    </div>
  )
}

export default RegisterForm
