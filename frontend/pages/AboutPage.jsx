
const AboutPage = () => {
  return (
    <div className='w-full min-h-[100dvh] bg-zinc-800 flex flex-col flex-wrap py-26
     justify-start px-10 gap-6 text-[max(.9vw,16px)]'>
      <div className="text-left text-white bg-zinc-800 rounded-2xl p-8 border-[1px] border-[#ffffff0a] shadow-xl">
        <h3 className="text-[max(1.3vw,20px)] font-semibold mb-4">✨ Key Features</h3>
        <ul className="list-disc pl-6  space-y-3">
          <li>
            <span className="font-semibold text-blue-600">Create Short Links Instantly:</span>
            Anyone can shorten a URL — no login required.
          </li>
          <li>
            <span className="font-semibold text-blue-600">Custom Short URLs:</span>
            Registered users can create personalized short links using a unique slug or keyword.
          </li>
          <li>
            <span className="font-semibold text-blue-600">User-Friendly Interface:</span>
            A responsive, modern design built with React for a smooth experience.
          </li>
          <li>
            <span className="font-semibold text-blue-600">Secure and Scalable Backend:</span>
            Powered by Node.js and Express.js, with MongoDB for efficient data handling.
          </li>
        </ul>
      </div>

      <div className="text-left text-white bg-zinc-800 rounded-2xl p-8 border-[1px] border-[#ffffff0a] shadow-xl">
        <h3 className="text-[max(1.3vw,16px)] font-semibold mb-4">💡 Why I Built This Project</h3>
        <p className=" leading-relaxed">
          I developed this project to enhance my <span className="font-semibold">full-stack development skills</span>
          and gain hands-on experience with authentication, API design, and database management.
          It demonstrates how frontend and backend logic work together to deliver a seamless and functional user experience.
        </p>
      </div>

      <div className="text-left text-white bg-zinc-800 rounded-2xl p-8 border-[1px] border-[#ffffff0a] shadow-xl">
        <h3 className="text-[max(1.3vw,16px)] font-semibold mb-4">🧩 Tech Stack</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <li><span className="font-semibold text-blue-600">Frontend:</span> React</li>
          <li><span className="font-semibold text-blue-600">Backend:</span> Node.js, Express.js</li>
          <li><span className="font-semibold text-blue-600">Database:</span> MongoDB</li>
          <li><span className="font-semibold text-blue-600">Authentication:</span> JWT (JSON Web Token)</li>
        </ul>
      </div>
    </div>
  )
}

export default AboutPage
