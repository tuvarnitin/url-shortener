import { lazy, Suspense } from 'react';
import FullPageLoader from '../src/components/FullPageLoader';

const Urls = lazy(() => import("../src/components/Urls"))

const UrlPage = () => {

  return (
    <>
      <div className='flex w-full h-full px-4 text-white flex-col gap-4 py-20 items-center overflow-x-hidden overflow-y-auto'>
        <Suspense fallback={<FullPageLoader />}>
          <h1 className='text-[max(2.1vw,22px)] font-bold'>Your URLs</h1>
          <Urls />
        </Suspense>
      </div>
    </>
  )
}

export default UrlPage
