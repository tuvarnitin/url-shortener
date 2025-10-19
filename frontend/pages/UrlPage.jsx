import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import Url from '../src/components/Url';
import { UrlContext } from '../contexts/UrlContext';


const UrlPage = () => {
    const { BACKEND_URL,urls,setUrls,notifyError } = useContext(UrlContext)

  const fetchUrls = async () => {
    const userId = localStorage.getItem("userid");
    if (!userId) return;
    const response = await axios.get(`${BACKEND_URL}/urls/${userId}`);
    if (response.data.success) {
      setUrls(response.data.urls);
    } else {
      notifyError(res.data.message)
    }
  }
  useEffect(() => {
    fetchUrls();
  }, [urls]);

  return (
    <div className='flex w-full h-full px-4 text-white flex-col gap-4 py-20 items-center overflow-x-hidden overflow-y-auto'>
      <h1 className='text-[max(2.1vw,22px)] font-bold'>Your URLs</h1>
      <ul className='w-full flex gap-4 justify-center flex-wrap '>
        {urls.length > 0 ? [...urls].reverse().map(url => (
          <Url key={url._id} url={url} />
        )) : (
          <p>No URLs found</p>
        )}
      </ul>
    </div>
  )
}

export default UrlPage
