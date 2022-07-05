import React from 'react';
import Image from 'next/image';
// import '../styles/aboutme.scss';
// const ava = require('../public/ava.png');
import { Categories } from '../components'
const Aboutme = () => {
  return (
    <div className='container mx-auto px-10 mb-8 mt-9 pt-10'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
            <div className='col-span-1 lg:col-span-8 bg-white shadow-lg rounded-lg p-0 lg:p-8 pd-12 mb-8 min-h-screen px-5'>
                <h2 className='transition duration-700 text-center mb-10 cursor-pointer hover:text-pink-600 text-3xl font semibold'>About Me</h2>
                <p className='text-lg mb-5'>I'm Nhi and I'm developper web, precisely in Front-end part with the languages: JS, ReactJS, NextJS,...</p>
                <p className='text-lg'>Besides, I'm a huge fan of beauty. I have a big curiosity about skincare products or about makeup products. So I hope this blog can inspire women and give some personal experiences of products for theme before buying these products. </p>
                <div className='mt-10 flex justify-center'>
                <Image 
                    src='/ava.jpg'
                    height="290px"
                    width="300px"
                    className="rounded-lg object-center"/>
                </div>
                
            </div>
            <div className='col-span-1 lg:col-span-4'>
                <div className='relative lg:sticky top-8 '>
                    <Categories />
                </div>
            </div>
          
        </div>
    </div>
  )
}

export default Aboutme