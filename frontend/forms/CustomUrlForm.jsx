import axios from 'axios'
import { useContext, useRef } from 'react'
import { useState } from 'react'
import { UrlContext } from '../contexts/UrlContext'

const CustomUrlForm = () => {
    const [url, setUrl] = useState("")
    const [customShortUrl, setCustomShortUrl] = useState("")
    const [slug, setSlug] = useState("")
    const { BACKEND_URL, user,notifyError,notifySuccess } = useContext(UrlContext)

    const handleShort = async (e) => {
        e.preventDefault()
        try {
            if (url) {
                const res = await axios.post(`${BACKEND_URL}/api/url/custom`, { url, slug, userId: user._id })
                if (res.data.success) {
                    notifySuccess(res.data.message)
                    setCustomShortUrl(res.data.shortUrl)
                }
                else notifyError(res.data.message)
            } else {
                throw new Error("Please enter valid url!")
            }
        } catch (error) {
            notifyError("Something went wrong")
        }
    }
    const copyBtnRef = useRef(null)
    const handleCopy = () => {
        copyBtnRef.current.disabled = true
        if (customShortUrl) {
            notifySuccess("Copied to clipboard")
            navigator.clipboard.writeText(customShortUrl)
        }
        setTimeout(() => {
            copyBtnRef.current.disabled = false
        }, 2000);
    }

    return (
        <div className="w-full min-h-[100dvh] flex justify-center px-4 pt-40">
            <div className=' h-fit border-2 py-6 px-8 w-full sm:w-[80%] md:w-[68%] lg:w-[32%] min-h-[22vh] rounded-xl flex flex-col items-center gap-4'>
                <h1 className='font-bold text-[max(1.6vw,18px)]'>Custom URL Shortener</h1>
                <form onSubmit={(e) => handleShort(e)} className='w-full flex flex-col gap-2 '>
                    <input required type="url" value={url} onInput={(e) => setUrl(e.target.value)} className='py-1.5 px-4 border-1 rounded-lg text-[max(.9vw,14px)]' placeholder='https://example.com' />
                    <input required type="text" value={slug} onInput={(e) => setSlug(e.target.value)} className='py-1.5 px-4 border-1 rounded-lg text-[max(.9vw,14px)]' placeholder='Write Keyword' />
                    <button className='w-full bg-blue-600 py-1 pb-1.5 font-medium rounded-md cursor-pointer text-[max(1vw,18px)]' type="submit">Short</button>
                </form>
                {customShortUrl && <div className=' flex xl:flex-row flex-col gap-2 xl:gap-0 w-full xl:border-2 xl:rounded-full'>
                    <div className='w-full overflow-hidden bg-zinc-800 py-1 pb-1.5 xl:border-none rounded-l-full rounded-r-full px-4 cursor-pointer hover:underline border-1'>{customShortUrl ? <a href={customShortUrl} target="_blank" className="text-[max(.9vw,14px)]">{customShortUrl}</a> : <span className="opacity-50 pointer-events-none text-[max(.9vw,14px)] text-wrap">https://surl/sdgds1</span>}</div>
                    <button ref={copyBtnRef} className={`disabled:bg-blue-400 disabled:cursor-no-drop bg-blue-600 active:bg-blue-500 py-1 pb-1.5 rounded-full xl:rounded-l-none w-full xl:w-fit px-3 font-medium cursor-pointer`} onClick={handleCopy}>
                        Copy
                    </button>
                </div>}
            </div>
        </div>
    )
}

export default CustomUrlForm
