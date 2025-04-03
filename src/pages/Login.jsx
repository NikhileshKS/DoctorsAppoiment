// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'

const Login = () => {
  const [state, setSta] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmithandle = async (event) => {
    event.preventDefault()
    // Add your form submission logic here
  }

  return (
    <form onSubmit={onSubmithandle} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
        <p>Please {state === 'Sign Up' ? "sign up" : "log in"} to book appointment</p>
        
        {state === 'Sign Up' && (
          <div className='w-full'>
            <p>Full Name</p>
            <input 
              className='border border-zinc-800 rounded w-full p-2 mt-1' 
              type="text" 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              required
            />
          </div>
        )}
        
        <div className='w-full'>
          <p>Email</p>
          <input 
            className='border border-zinc-800 rounded w-full p-2 mt-1' 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            required
          />
        </div>
        
        <div className='w-full'>
          <p>Password</p>
          <input 
            className='border border-zinc-800 rounded w-full p-2 mt-1' 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            required
          />
        </div>
        
        <button type="submit" className='bg-primary text-white w-full py-2 rounded-md text-base'>
          {state === 'Sign Up' ? "Create Account" : "Login"}
        </button>
        
        {state === "Sign Up" ? (
          <p className='text-center'>Already have an account? <span className='text-primary cursor-pointer' onClick={() => setSta('Login')}>Login</span></p>
        ) : (
          <p className='text-center'>Don&apos;t have an account? <span className='text-primary cursor-pointer' onClick={() => setSta('Sign Up')}>Sign Up</span></p>
        )}
      </div>
    </form>
  )
}

export default Login;