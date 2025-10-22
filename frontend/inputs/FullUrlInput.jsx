const FullUrlInput = ({url,setUrl}) => {
  return (
      <input required type="url" value={url} onInput={(e) => setUrl(e.target.value)} className='py-1.5 px-4 border-1 rounded-lg text-[max(.9vw,14px)]' placeholder='https://example.com' />
  )
}

export default FullUrlInput
