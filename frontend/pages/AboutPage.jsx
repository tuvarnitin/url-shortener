
const AboutPage = () => {
  return (
    <div className='w-full min-h-[100dvh] bg-zinc-800 flex flex-col flex-wrap py-26
     justify-start px-10 gap-6 text-[max(.9vw,16px)]'>
        <h3 className="text-[max(1.3vw,20px)] font-semibold mb-4">✨ Features</h3>
        <ul className="list-disc pl-6  space-y-3">
          <li>
            <span className="font-semibold text-blue-600">Create Short Links Instantly : </span>
            Anyone can shorten a URL — no login required.
          </li>
          <li>
            <span className="font-semibold text-blue-600">Custom Short URLs : </span>
            Registered users can create personalized short links using a unique slug or keyword.
          </li>
          <li>
            <span className="font-semibold text-blue-600">User-Friendly Interface : </span>
            A responsive, modern design built with React for a smooth experience.
          </li>
          <li>
            <span className="font-semibold text-blue-600">Secure and Scalable Backend : </span>
            Powered by Node.js and Express.js, with MongoDB for efficient data handling.
          </li>
        </ul>
        </div>
  )
}

export default AboutPage
