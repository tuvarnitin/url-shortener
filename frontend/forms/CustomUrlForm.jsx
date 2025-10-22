import axios from 'axios'
import { useContext, useRef } from 'react'
import { useState } from 'react'
import { UrlContext } from '../contexts/UrlContext'
import CopyButton from '../buttons/CopyButton'
import ShortBtn from '../buttons/ShortBtn'
import FullUrlInput from '../inputs/FullUrlInput'
import ShortedUrlBox from '../inputs/ShortedUrlInput'
import SlugInput from '../inputs/SlugInput'

const CustomUrlForm = () => {
    const [url, setUrl] = useState("")
    const [customShortUrl, setCustomShortUrl] = useState("")
    const [slug, setSlug] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const shortBtnRef = useRef(null)
    const { BACKEND_URL, user, notifyError, notifySuccess } = useContext(UrlContext)

    const handleShort = async (e) => {
        shortBtnRef.current.disabled = true
        setIsLoading(true)
        e.preventDefault()
        try {
            if (url) {
                const res = await axios.post(`${BACKEND_URL}/api/url/custom`, { url, slug, userId: user._id })
                if (res.data.success) {
                    notifySuccess(res.data.message)
                    setCustomShortUrl(res.data.shortUrl)
                    setIsLoading(false)
                    shortBtnRef.current.disabled = false
                }
                else {
                    notifyError(res.data.message)
                    setIsLoading(false)
                    shortBtnRef.current.disabled = false
                }
            } else {
                setIsLoading(false)
                shortBtnRef.current.disabled = false
                throw new Error("Please enter valid url!")
            }
        } catch (error) {
            setIsLoading(false)
            shortBtnRef.current.disabled = false
            notifyError("Something went wrong")
        }
    }
    const copyBtnRef = useRef(null)

    return (
        <div className="w-full min-h-[100dvh] flex justify-center px-4 pt-40">
            <div className=' h-fit border-2 py-6 px-8 w-full sm:w-[80%] md:w-[68%] lg:w-[32%] min-h-[22vh] rounded-xl flex flex-col items-center gap-4'>
                <h1 className='font-bold text-[max(1.6vw,18px)]'>Custom URL Shortener</h1>
                <form onSubmit={(e) => handleShort(e)} className='w-full flex flex-col gap-2 '>
                    <FullUrlInput url={url} setUrl={setUrl} />
                    <SlugInput slug={slug} setSlug={setSlug} />
                    <ShortBtn btnRef={shortBtnRef} isLoading={isLoading} />
                </form>
                <ShortedUrlBox shortedUrl={customShortUrl} />
            </div>
        </div>
    )
}

export default CustomUrlForm
