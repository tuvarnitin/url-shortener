import Url from './Url'
import { useContext } from 'react'
import { UrlContext } from '../../contexts/UrlContext'
import { useEffect } from 'react'
import api from '../utils/api'

const Urls = () => {
    const { urls, notifyError,setUrls } = useContext(UrlContext)

    const fetchUrls = async () => {
        try {
            const userId = localStorage.getItem("userid");
            if (!userId) return;
            const response = await api.get(`/urls/${userId}`);
            if (response.data.success) {
                setUrls(response.data.urls);
            }
        } catch (error) {
            notifyError(error.response?.data?.message || "Failed to fetch URLs");
        }
    };

    useEffect(() => {
        fetchUrls();
    }, []);
  return (
      <>
          <ul className='w-full flex gap-4 justify-center flex-wrap '>
              {urls.length > 0 ? [...urls].reverse().map(url => (
                  <Url key={url._id} url={url} fetchUrls={fetchUrls}/>
              )) : (
                  <p>No URLs found</p>
              )}
          </ul>
      </>
  )
}

export default Urls
