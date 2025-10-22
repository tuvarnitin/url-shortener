import React from 'react'
import { useState } from 'react'
import Loader from '../loaders/Loader'
import { useContext } from 'react'
import { UrlContext } from '../contexts/UrlContext'

const CopyButton = ({ copyBtnRef, url }) => {
    const { notifySuccess } = useContext(UrlContext)
    const [isLoading, setIsLoading] = useState(false)

    const handleCopy = () => {
        setIsLoading(true)
        copyBtnRef.current.disabled = true
        notifySuccess("Copied to clipboard")
        navigator.clipboard.writeText(url)
        setTimeout(() => {
            setIsLoading(false)
            copyBtnRef.current.disabled = false
        }, 400);
    }

    return (
        <button ref={copyBtnRef} className={`disabled:bg-blue-400 disabled:cursor-no-drop bg-blue-600 active:bg-blue-500 py-1 pb-1.5 rounded-full xl:rounded-l-none w-full xl:w-fit px-3 font-medium cursor-pointer`} onClick={handleCopy}>
            {isLoading ? <Loader /> : <>Copy</>}
        </button>
    )
}

export default CopyButton
