
import { useContext, useState } from 'react'
import { UrlContext } from '../contexts/UrlContext'
import axios from 'axios'
import Loader from '../loaders/Loader'
import { MdAttachEmail } from "react-icons/md";
import { FaGit, FaGithub, FaInstagram, FaLinkedin, FaPhone, FaWhatsapp } from 'react-icons/fa6';
const ContactPage = () => {
  const { notifySuccess, notifyError, BACKEND_URL } = useContext(UrlContext)
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!formData.name || !formData.email || !formData.message) {
        notifyError("All feilds are required")
        return
      }
      setIsLoading(true)
      const response = await axios.post(`${BACKEND_URL}/api/contact`, formData)
      if (response.data.success) {
        notifySuccess('Thank you for reaching out! Your message has been sent. We will get back to you soon.')
        setFormData({ name: '', email: '', message: '' })
      } else {
        notifyError('Sorry, we couldn’t send your message. Please try again later or contact support at support@example.com.')
      }
      setIsLoading(false)

    } catch (error) {
      notifyError('Sorry, we couldn’t send your message. Please try again later or contact support at support@example.com.')
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-[100dvh] bg-zinc-800 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center md:flex-row flex-col gap-6">
      <div className="sm:w-full md:w-[70%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%] w-full h-fit bg-zinc-800 rounded-lg shadow-lg p-8 text-white ring-[1px] ring-zinc-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="mt-2 text-zinc-600">We'd love to hear from you!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="hover:bg-zinc-700/10 outline-none mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:shadow-zinc-700 px-3 py-2"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className=" hover:bg-zinc-700/10 outline-none mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:shadow-zinc-700 px-3 py-2"
              placeholder="example@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="outline-none hover:bg-zinc-700/10 mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:shadow-zinc-700 px-3 py-2"
              placeholder="Your message here..."
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLoading ? <Loader /> : "Send"}
            </button>
          </div>
        </form>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex items-center justify-around sm:flex-row flex-col">

            <div className="flex gap-2 items-center justify-center">
              <div className="font-medium text-red-700 items-center">
                <MdAttachEmail size={20} />
              </div>
              <div className="text-md">thissidenitin@gmail.com</div>
            </div>

            <div className="flex gap-2 items-center justify-center">
              <div className="font-medium text-red-700 items-center">
                <FaPhone size={16} />
              </div>
              <div className="text-md">+1 (555) 123-4567</div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex md:flex-col justify-around rounded-full ring ring-zinc-700 w-full md:w-fit bg-zinc-900/20 md:px-4 md:py-6 py-2 md:gap-15'>
        <a
          href='https://wa.me/+918053445590'
          target="_blank"
          className='md:w-14 md:h-14 w-10 h-10 md:p-3 rounded-full flex items-center justify-center bg-green-600'
        >
          <FaWhatsapp size={30} />
        </a>
        <a
          href='https://instagram.com/_nitin_tuvar_'
          target="_blank"
          className='md:w-14 md:h-14 w-10 h-10 md:p-3 rounded-full flex items-center justify-center '
        >
          <FaInstagram size={30} />
        </a>
        <a
          href='https://github.com/tuvarnitin'
          target="_blank"
          className='md:w-14 md:h-14 w-10 h-10 md:p-3 rounded-full flex items-center justify-center bg-zinc-900'
        >
          <FaGithub size={30} />
        </a>
        <a
          href='https://linkedin.com/in/tuvar-nitin'
          target="_blank"
          className='md:w-14 md:h-14 w-10 h-10 md:p-3 rounded-full flex items-center justify-center bg-blue-700'
        >
          <FaLinkedin size={30} />
        </a>
      </div>
    </div>
  )
}

export default ContactPage
