import Url from './Url'
import { useContext, useState } from 'react'
import { UrlContext } from '../../contexts/UrlContext'
import { useEffect } from 'react'
import api from '../utils/api'

const Urls = () => {

    const [isReverse, setIsReverse] = useState(true)
    const { notifyError, setUrls,urls } = useContext(UrlContext)
      const [isStandardUrls, iSetIsStandardUrls] = useState(true)   

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

    const standardUrls = urls.filter((url) => !url.slug)
    const customUrls = urls.filter((url) => url.slug)
    return (
        <>
            <div className='w-full flex justify-evenly border-b-1'>
                <button onFocus={() => iSetIsStandardUrls(true)} autoFocus={isStandardUrls && true} className='focus:bg-zinc-700 outline-none focus:rounded-tl-md py-2 w-1/2 flex justify-center border-r-[1px]'>Standard</button >
                <button onFocus={() => iSetIsStandardUrls(false)} className='focus:bg-zinc-700 outline-none focus:rounded-tr-md py-2 w-1/2 flex justify-center'>Custom</button >
            </div>   
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
          {
            isStandardUrls ?
                    <ul className='w-full flex gap-4 justify-center flex-wrap '>
                        {standardUrls.length > 0 ?
                            (isReverse) ?
                                [...standardUrls].reverse().map(url =>
                                (
                                    <Url key={url._id} url={url} fetchUrls={fetchUrls} />
                                ))
                                :
                                standardUrls.map(url =>
                                (
                                    <Url key={url._id} url={url} fetchUrls={fetchUrls} />
                                ))
                            :
                            (
                                <p>No URLs found</p>
                            )}
                    </ul>
                    :
                    <ul className='w-full flex gap-4 justify-center flex-wrap '>
                        {customUrls.length > 0 ?
                            (isReverse) ?
                                [...customUrls].reverse().map(url =>
                                (
                                    <Url key={url._id} url={url} fetchUrls={fetchUrls} />
                                ))
                                :
                                standardUrls.map(url =>
                                (
                                    <Url key={url._id} url={url} fetchUrls={fetchUrls} />
                                ))
                            :
                            (
                                <p>No URLs found</p>
                            )}
                    </ul>
          }
        </>
    )
}

export default Urls
