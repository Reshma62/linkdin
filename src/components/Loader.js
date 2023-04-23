import React from 'react'
import { ImSpinner3 } from 'react-icons/im';

const Loader = () => {
  return (
    <div className='flex flex-col h-screen items-center justify-center'>

      <p className='font-semibold font-nunito text-2xl '>Loading.... Please Wait</p>
      <ImSpinner3 className='text-2xl'/>
    </div>
  )
}

export default Loader