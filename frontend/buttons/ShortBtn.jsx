import React from 'react'
import Loader from '../loaders/Loader'
import { useState } from 'react'

const ShortBtn = ({ btnRef, isLoading }) => {
  return (
    <button ref={btnRef} className='w-full bg-blue-600 py-1 pb-1.5 font-medium rounded-md cursor-pointer text-[max(1vw,18px)] disabled:bg-blue-400' type="submit">{isLoading ? <Loader /> : <>Short</>}</button>
  )
}

export default ShortBtn
