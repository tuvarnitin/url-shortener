import React from 'react'

const SlugInput = ({slug,setSlug}) => {
  return (
      <input required type="text" value={slug} onInput={(e) => setSlug(e.target.value)} className='py-1.5 px-4 border-1 rounded-lg text-[max(.9vw,14px)]' placeholder='Write Keyword' />
  )
}

export default SlugInput
