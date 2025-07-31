import { Button } from '@/components/ui/button'
import { Input } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'
import SocialMedia from './SocialMedia'

const LoginForm = () => {
   const Navigate = useNavigate()
  return (
    <div className='w-full h-full bg-white flex flex-col items-center justify-center gap-1.5'>
      <h1 className='LogoFont text-black text-center'>Social Sphere</h1>
      <p className='text-xl text-gray-600 italic text-center '>Get Started and Join the world with Social Sphere</p>
      <form action="" className='flex flex-col gap-4 w-[95%]'>
        <Input placeholder='Enter your Email' type='email'  />
        <Input placeholder='Enter your Password' type='password' />
        <Button className={"cursor-pointer"}>Login</Button>
        <SocialMedia/>
        <p className='text-center'>You Don't Have an account ? what you are waiting for <span className='hover:text-purple-600 cursor-pointer' onClick={()=> Navigate("/auth/register")}>Register</span></p>
       
      </form>
    </div>
  )
}

export default LoginForm
