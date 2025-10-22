import Url from './Url'
import { useContext, useState } from 'react'
import { UrlContext } from '../../contexts/UrlContext'
import { useEffect } from 'react'
import api from '../utils/api'

const Urls = ({urls}) => {

    const [isReverse, setIsReverse] = useState(true)
    const { notifyError, setUrls } = useContext(UrlContext)
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
            <div className='custom-select-wrapper rounded-md md:self-end md:mr-[10vw] self-center my-4'>
                <select className='bg-zinc-800 px-3 py-2 rounded-sm focus:bg-zinc-700'
                    onChange={() => setIsReverse(prev => !prev)}
                >
                    <option value="newer-to-older" className='bg-zinc-800 selection:bg-zinc-700'>
                        {" Newer -> Older "}
                    </option>
                    <option value="older-to-newer" className='bg-zinc-800 selection:bg-zinc-700'>
                        {`Older  -> Newer`}
                    </option>
                </select>
            </div>
            <ul className='w-full flex gap-4 justify-center flex-wrap '>
                {urls.length > 0 ?
                    (isReverse) ?
                             [...urls].reverse().map(url =>
                            (
                                <Url key={url._id} url={url} fetchUrls={fetchUrls} />
                            ))
                            :
                        urls.map(url =>
                        (
                            <Url key={url._id} url={url} fetchUrls={fetchUrls} />
                        ))
                    :
                    (
                        <p>No URLs found</p>
                    )}
            </ul>
        </>
    )
}

export default Urls
