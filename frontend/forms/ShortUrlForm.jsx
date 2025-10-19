import axios from "axios"
import { useContext, useRef } from "react"
import { useState } from 'react'
import { UrlContext } from "../contexts/UrlContext"
import Loader from "../src/components/Loader"

const ShortUrlForm = () => {

    const [url, setUrl] = useState("")
    const [shortUrl, setShortUrl] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const { BACKEND_URL, user, notifyError, notifySuccess } = useContext(UrlContext)

    const handleShort = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            if (url) {
                const res = await axios.post(`${BACKEND_URL}/api/url`, { url, userId: user._id })
                if (res.data.success) {
                    setShortUrl(res.data.shortUrl)
                    setIsLoading(false)
                } else {
                    notifySuccess(res.data.message)
                    setIsLoading(false)
                }
            } else {
                setIsLoading(false)
                throw new Error("Please enter valid url!")
            }
        } catch (error) {
            notifyError("Something went wrong")
            setIsLoading(false)
        }
    }
    const copyBtnRef = useRef(null)

    const handleCopy = () => {
        copyBtnRef.current.disabled = true
        if (shortUrl) {
            navigator.clipboard.writeText(shortUrl)
            notifySuccess("Copied to clipboard")
        }
        setTimeout(() => {
            copyBtnRef.current.disabled = false
        }, 2000);
    }
  return (
      <div className='border-2 py-6 px-8 w-full h-fit sm:w-[80%] md:w-[68%] lg:w-[32%] min-h-[22vh] rounded-xl flex flex-col items-center gap-4'>
          <h1 className='font-bold text-[max(1.6vw,18px)]'>URL Shortener</h1>
          <form onSubmit={(e) => handleShort(e)} className='w-full flex flex-col gap-2 '>
              <input required type="url" value={url} onInput={(e) => setUrl(e.target.value)} className='py-1.5 px-4 border-1 rounded-lg text-[max(.9vw,14px)]' placeholder='https://example.com' />
              <button className='w-full bg-blue-600 py-1 pb-1.5 font-medium rounded-md cursor-pointer text-[max(1vw,18px)]' type="submit">{isLoading ? <Loader /> : <>Short</>}</button>
          </form>
          {shortUrl && <div className=' flex xl:flex-row flex-col gap-2 xl:gap-0 w-full xl:border-2 xl:rounded-full'>
              <div className='w-full overflow-hidden bg-zinc-800 py-1 pb-1.5 xl:border-none rounded-l-full rounded-r-full px-3 cursor-pointer hover:underline border-1'><a href={shortUrl && shortUrl} target="_blank" className="text-[max(.9vw,14px)]">{shortUrl}</a>
              </div>
              <button ref={copyBtnRef} className={`disabled:bg-blue-400 disabled:cursor-no-drop bg-blue-600 active:bg-blue-500 py-1 pb-1.5 rounded-full xl:rounded-l-none w-full xl:w-fit px-3 font-medium cursor-pointer`} onClick={handleCopy}>
                  Copy
              </button>
          </div>}
      </div>
  )
}

export default ShortUrlForm
