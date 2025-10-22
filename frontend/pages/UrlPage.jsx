import { lazy, Suspense, useContext } from 'react';
import FullPageLoader from '../loaders/FullPageLoader';
import { useState } from 'react';
import { UrlContext } from '../contexts/UrlContext';
const Urls = lazy(() => import("../src/components/Urls"))

const UrlPage = () => {

  const [isStandardUrls, iSetIsStandardUrls] = useState(true)
  const {urls} = useContext(UrlContext)
  const standardUrls = urls.filter((url)=> !url.slug)
  const customUrls = urls.filter((url)=> url.slug)

  return (
    <>
      <div className='flex w-full h-full px-4 text-white flex-col gap-4 py-20 items-center overflow-x-hidden overflow-y-auto relative'>
        <Suspense fallback={<FullPageLoader />}>
        <div className='w-full justify-center'>
            <div className='w-full flex justify-evenly border-b-1'>
              <button onFocus={()=>iSetIsStandardUrls(true)} autoFocus={true} className='focus:bg-zinc-700 outline-none focus:rounded-tl-md py-2 w-1/2 flex justify-center border-r-[1px]'>Standard</button >
              <button onFocus={()=>iSetIsStandardUrls(false)} className='focus:bg-zinc-700 outline-none focus:rounded-tr-md py-2 w-1/2 flex justify-center'>Custom</button >
              </div> 
                <Urls urls={isStandardUrls ? standardUrls : customUrls} />               
        </div>
        </Suspense>
      </div>
    </>
  )
}

export default UrlPage
