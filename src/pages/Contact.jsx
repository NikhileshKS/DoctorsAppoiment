// eslint-disable-next-line no-unused-vars
import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="bg-gray-50">
      <div className="text-center pt-16 pb-8 group">
        <div className="relative inline-block">
          <h2 className="text-3xl font-light text-gray-600 pb-3">
            CONTACT 
            <span className="text-blue-600 inline-block hover:animate-bounce font-semibold">
              US
            </span>
          </h2>
          {/* Center-originating underline */}
          <span className="
            absolute bottom-0 left-1/2 w-0 h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 
            transform -translate-x-1/2 transition-all duration-500 ease-out 
            group-hover:w-full
          "></span>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-12 md:gap-16 items-center'>
        <div className='w-full md:w-1/2 lg:w-2/5'>
          <img 
            className='w-full h-auto rounded-lg shadow-md transition-all duration-300 hover:shadow-lg' 
            src={assets.contact_image} 
            alt="Our office location" 
          />
        </div>

        <div className='w-full md:w-1/2 lg:w-3/5 space-y-6'>
          <div className='space-y-2'>
            <h3 className='text-xl font-semibold text-gray-700'>OUR OFFICE</h3>
            <p className='text-gray-600 leading-relaxed'>
              Doddaballapura 561203<br/>
              Karnataka, India
            </p>
            <p className='text-gray-600'>Tel: +91 8088521583</p>
          </div>

          <div className='pt-4 space-y-4 border-t border-gray-200'>
            <h3 className='text-xl font-semibold text-gray-700'>Careers at MyDoctors</h3>
            <p className='text-gray-600 leading-relaxed'>
              Learn more about our teams and exciting job opportunities
            </p>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact