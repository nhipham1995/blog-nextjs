import React from 'react';
import Image from 'next/image';

const Author = ({author}) => {
  return (
    <div className='text-center mt-20 mb-8 p-12 relative rounded-lg bg-black'>
      <div className='absolute left-0 right-0 -top-14'>
        <Image
          src={author.photo[0].url}
          alt={author.name}
          unoptimized
          height="100px"
          width="100px"
          className="align-middle rounded-full "
        />
        <h3 className='text-white my-4 text-xl font-bold'>{author.name}</h3>
        <p className='text-white text-lg'>{author.bio}</p>
      </div>
    
    </div>
  )
}

export default Author