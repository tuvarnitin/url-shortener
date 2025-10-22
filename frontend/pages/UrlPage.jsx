import { lazy, Suspense, useContext } from 'react';
import FullPageLoader from '../loaders/FullPageLoader';
import { useState } from 'react';
import { UrlContext } from '../contexts/UrlContext';
const Urls = lazy(() => import("../src/components/Urls"))

const UrlPage = () => {

  return (
    <>
      <div className='flex w-full h-full px-4 text-white flex-col gap-4 py-20 items-center overflow-x-hidden overflow-y-auto relative'>
        <Suspense fallback={<FullPageLoader />}>
        <div className='w-full justify-center'>
          <Urls />             
        </div>
        </Suspense>
      </div>
    </>
  )
}

export default UrlPage
