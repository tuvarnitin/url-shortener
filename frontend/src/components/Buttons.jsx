import axios from "axios";
import { GoPencil } from "react-icons/go";
import { FaWhatsapp } from "react-icons/fa6";
import { RiAttachment2 } from "react-icons/ri";
import { CiShare2 } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useContext } from "react";
import { UrlContext } from "../../contexts/UrlContext";
import { useState } from "react";
import Loader from "./Loader";

const Buttons = ({ isEditing, shortUrl, setIsEditing, url, setShowPop, fetchUrls }) => {

    const { BACKEND_URL,notifyError,notifySuccess } = useContext(UrlContext)
    const [isLoading,setIsLoading] = useState(false)

    const handleWhatsAppShare = () => {
        const text = shortUrl;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, "_blank");
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shortUrl);
        notifySuccess("Link copied to clipboard")
    };

    const handleWebShare = async () => {
        if (navigator.share) {
            await navigator.share({
                url: shortUrl,
            });
        } else {
            alert("Your device does not support native sharing. Use copy link instead.");
        }
    };
    const handleDelete = async () => {
        setIsLoading(true)
        const response = await axios.delete(`${BACKEND_URL}/api/url/${url._id}`);
        if (response.data.success) {
            notifySuccess("Link deleted successfuly")
            fetchUrls()
        }
        setIsLoading(false)
    }

    const handleSave = async () => {
        setShowPop(true)
        setIsEditing(false);
    }


    return (
        <div className="flex w-full gap-2 flex-wrap ">
            {isEditing ? (
                <button className='bg-zinc-900 text-sm text-white h-fit  py-1 px-3 rounded-full cursor-pointer border-[1px] border-[#ffffff30]' onClick={() => handleSave()}>Save</button>
            ) : (
                <button className='text-sm text-white py-1 px-3 rounded-full cursor-pointer border-[1px] border-[#ffffff30] flex items-center gap-2 text-nowrap bg-zinc-900' onClick={() => { setIsEditing(true) }}>Edit Name<GoPencil /></button>
            )}
            <button
                onClick={handleWhatsAppShare}
                className="text-lg text-green-300 p-1 px-1.5 rounded-full cursor-pointer border-[1px] border-[#ffffff30] flex items-center gap-2 text-nowrap bg-zinc-800"
            >
                <FaWhatsapp />
            </button>
            <button
                onClick={handleCopyLink}
                className="text-sm text-white py-1 px-3 rounded-full cursor-pointer border-[1px] border-[#ffffff30] flex items-center gap-2 text-nowrap bg-zinc-900"
            >
                Copy <RiAttachment2 />
            </button>
            <button
                onClick={handleWebShare}
                className="text-sm text-white py-1 px-3 rounded-full cursor-pointer border-[1px] border-[#ffffff30] flex items-center gap-2 text-nowrap bg-zinc-900"
            >
                Share<CiShare2 />
            </button>
            <button className='text-sm text-white h-fit bg-red-600 py-1 px-3 rounded-full cursor-pointer border-[1px] border-[#ffffff30] flex items-center gap-2'
                onClick={handleDelete}
            >{isLoading ? <Loader /> : <>Delete < MdDeleteOutline /></>}</button>
        </div>
    );
};

export default Buttons;
