import React from 'react'
import CopyButton from '../buttons/CopyButton'
import { useRef } from 'react'

const ShortedUrlInput = ({ shortedUrl }) => {
  const copyBtnRef = useRef(null)
  return (
    <>
      {shortedUrl && <div className=' flex xl:flex-row flex-col gap-2 xl:gap-0 w-full xl:border-2 xl:rounded-full'>
        <div className='w-full flex items-center h-10 bg-zinc-800 py-1 pb-1.5 xl:border-none rounded-l-full rounded-r-full px-2 cursor-pointer hover:underline border-1'>
          <a href={shortedUrl && shortedUrl} target="_blank" className="text-[max(.9vw,14px)] w-full overflow-hidden">{shortedUrl}</a>
        </div>
        <CopyButton url={shortedUrl} copyBtnRef={copyBtnRef} />
      </div>
      }
    </>
  )
}

export default ShortedUrlInput
