import React from 'react'
import { useAuth } from '../Context/Auth_context'

const TestPage = () => {
    const {userdata,isAdmin} = useAuth();
    console.log(userdata);
  return (
    <div className='h-[80vh] text-black bg-white'>
        Hello
        {userdata}
        {isAdmin}
        
      
    </div>
  )
}

export default TestPage
