import { useContext, useState } from 'react';
import CodeEditor from './CodeEditor';
import axios from 'axios';
import Buttons from './Buttons';
import { UrlContext } from '../../contexts/UrlContext';

const Url = ({url}) => {
    const [urlName, setUrlName] = useState("Name");
    const [isEditing, setIsEditing] = useState(false);
    const [showPop, setShowPop] = useState(false);
    const { BACKEND_URL, notifySuccess } = useContext(UrlContext)

    const updateUrlDetails = async () => {
        setShowPop(false)
        await axios.put(`${BACKEND_URL}/api/url/${url._id}`, { urlName: urlName.trim() });
        notifySuccess("Url updated")
    }

    const handleCancel = () => {
        setShowPop(false)
        setUrlName("Name")
    }

    return (
        <li key={url._id} className='h-fit relative py-4 bg-zinc-800  rounded-md w-2/7 min-w-[340px] px-0 pl-4 flex gap-2 flex-col justify-between items-start text-[max(.9vw,12px)]  border-[1px] border-[#ffffff0a] shadow-xl'>
            {showPop && <div className='w-full h-full fixed z-11 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-[#111]/80'>
                <div className='w-fit bg-zinc-800 border-1 py-8 px-6  rounded-md flex flex-col gap-4'>
                    <h1>Are you sure?</h1>
                    <div className='flex gap-4 justify-end'>
                        <button className='cursor-pointer border-[1px] border-white py-0.5 px-4 rounded-full' onClick={handleCancel}>Cancel</button>
                        <button className='cursor-pointer border-[1px] border-white py-0.5 px-4 rounded-full' onClick={updateUrlDetails}>Ok</button>
                    </div>
                </div>
            </div>}
            <div className='w-3/5'>
                <div className='flex items-center gap-1 w-full overflow-clip'>Name : <CodeEditor urlName={url.name || "Name"} setUrlName={setUrlName} isEditing={isEditing} />
                </div>
                <p className='w-full truncate'>Original Url : {url.originalUrl}</p>
                <p className='w-full truncate'>Short Url : <a href={url.shortUrl} target="_blank" className='text-blue-500 hover:underline'>{url.shortUrl}</a></p>
                <p>Clicks: {url.clicks}</p>
            </div>
            <div className='flex h-full gap-2 items-center pr-6 w-full'>
                <Buttons isEditing={isEditing} shortUrl={url.shortUrl} setIsEditing={setIsEditing} url={url} setShowPop={setShowPop} />
            </div>
        </li>
    )
}

export default Url
