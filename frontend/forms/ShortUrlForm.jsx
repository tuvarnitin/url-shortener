import axios from "axios"
import { useContext, useRef } from "react"
import { useState } from 'react'
import { UrlContext } from "../contexts/UrlContext"
import CopyButton from "../buttons/CopyButton"
import ShortBtn from "../buttons/ShortBtn"
import FullUrlInput from "../inputs/FullUrlInput"
import ShortedUrlBox from "../inputs/ShortedUrlInput"

const ShortUrlForm = () => {
    const [url, setUrl] = useState("")
    const [shortUrl, setShortUrl] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const shortBtnRef = useRef(null)

    const { BACKEND_URL, user, notifyError, notifySuccess } = useContext(UrlContext)

    const handleShort = async (e) => {
        e.preventDefault()
        shortBtnRef.current.disabled = true
        setIsLoading(true)
        try {
            if (url) {
                const res = await axios.post(`${BACKEND_URL}/api/url`, { url, userId: user._id })
                if (res.data.success) {
                    notifySuccess(res.data.message)
                    setShortUrl(res.data.shortUrl)
                    setIsLoading(false)
                    shortBtnRef.current.disabled = false
                } else {
                    notifySuccess(res.data.message)
                    setIsLoading(false)
                    shortBtnRef.current.disabled = false
                }
            } else {
                setIsLoading(false)
                shortBtnRef.current.disabled = false
                throw new Error("Please enter valid url!")
            }
        } catch (error) {
            notifyError("Something went wrong")
            shortBtnRef.current.disabled = false
            setIsLoading(false)
        }
    }

    return (
        <div className='border-2 py-6 px-8 w-full h-fit sm:w-[80%] md:w-[68%] lg:w-[32%] min-h-[22vh] rounded-xl flex flex-col items-center gap-4'>
            <h1 className='font-bold text-[max(1.6vw,18px)]'>URL Shortener</h1>
            <form onSubmit={(e) => handleShort(e)} className='w-full flex flex-col gap-2 '>
                <FullUrlInput url={url} setUrl={setUrl} />
                <ShortBtn btnRef={shortBtnRef} isLoading={isLoading} />
            </form>
            <ShortedUrlBox shortedUrl={shortUrl} />
        </div>
    )
}

export default ShortUrlForm
