import React from 'react'

const FullPageLoader = () => {
return (
    <div className="fixed w-screen h-screen inset-0 bg-zinc-800/ bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-[9999]">
        <div className="w-16 h-16 border-8 border-gray-700 border-t-blue-400 rounded-full animate-spin"></div>
    </div>
)
}

export default FullPageLoader
