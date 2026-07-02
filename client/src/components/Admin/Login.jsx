import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {

  const [Email,setEmail] = useState("");

  const {axios , setToken } = useAppContext();

  const [Password,setPassword] =useState("");

  //Handle Form submit
  const handleSubmit = async (event) =>{
     event.preventDefault();
    try {
      const {data} = await axios.post('/api/admin/login' ,{ Email,  Password});

      if(data.success){
        setToken(data.token);
        localStorage.setItem('token', data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        
      }else{
        toast.error(data.message);
      }
      
    } catch (error) {
      toast.error(error.message);
    }
   
  }


  return (

    
    <div className='flex items-center justify-center h-screen'>

      
      <div className='w-full max-w-sm p-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>

          {/*this is the headings of the form */}
          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'><span className='text-primary '>Admin</span> Login</h1>
            <p className='font-light'>Enter your credentials to access the admin panel</p>
          </div>

          {/*The main Login form */}
          <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
            <div className='flex flex-col'>
              <label htmlFor="email">Email</label>
              <input type="email" onChange={(event)=>setEmail(event.target.value)} value={Email} placeholder='your email id' required className='border-b-2 border-gray-300 p-2 outline-none mb-6' />
            </div>
             <div className='flex flex-col'>
              <label htmlFor="password">Password</label>
              <input type="password" onChange={(event)=>setPassword(event.target.value)} value={Password} placeholder='your password' required className='border-b-2 border-gray-300 p-2 outline-none mb-6' />
            </div>
            <button type='submit' className='border px-4 py-3 rounded bg-primary text-white w-full font-medium cursor-pointer hover:bg-primary/90 transition-all'>Login</button>
          </form>
          
        </div>

      </div>
    </div>
  )
}

export default Login