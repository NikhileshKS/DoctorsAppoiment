/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
    return (
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12">
            {/* About Header */}
            <div className='text-center pt-6 cursor-pointer'>
                <h1 className="text-4xl font-bold text-gray-700 relative inline-block pb-2 group">
                    <span className="relative z-10">ABOUT </span>
                    <span className="text-blue-600 inline-block hover:animate-bounce relative z-10">US</span>
                    <span className="absolute bottom-0 left-0 w-0 h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500 group-hover:w-full"></span>
                </h1>
                <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
                    Connecting you to quality healthcare, seamlessly
                </p>
            </div>

            {/* Image and Text Section */}
            <div className="my-14 flex flex-col lg:flex-row gap-10 items-center">
                <div className="w-full lg:w-1/2 relative">
                    <img 
                        className='w-full rounded-xl shadow-xl hover:scale-[1.02] transition-transform duration-500'
                        src={assets.about_image} 
                        alt="MyDoctors healthcare team providing services" 
                    />
                    <div className="absolute -inset-2 bg-blue-100 rounded-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className='w-full lg:w-1/2 space-y-6 text-gray-700'>
                    <p className="text-lg leading-relaxed hover:text-gray-800 transition-colors duration-300">
                        Welcome to MyDoctors, your trusted partner in connecting with healthcare professionals effortlessly. We simplify the process of finding and booking appointments with qualified doctors, putting your health management right at your fingertips.
                    </p>
                    
                    <p className="text-lg leading-relaxed hover:text-gray-800 transition-colors duration-300">
                        MyDoctors is committed to excellence in healthcare accessibility. Our platform continuously evolves to incorporate the latest technologies, ensuring you have a seamless experience when searching for specialists, scheduling visits, or managing your medical appointments.
                    </p>
                    
                    <div className="mt-8">
                        <h3 className='text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300 inline-block border-b-2 border-blue-100 pb-1'>
                            Our Vision
                        </h3>
                        <p className="mt-4 text-lg leading-relaxed hover:text-gray-800 transition-colors duration-300">
                            At MyDoctors, we envision a healthcare ecosystem where patients can easily connect with the right medical professionals without unnecessary delays or complications. We're bridging the gap between doctors and those needing care through innovative digital solutions.
                        </p>
                    </div>
                </div>
            </div>

            {/* WHY CHOOSE US Section */}
            <div className="text-center mt-20 mb-12">
                <div className="inline-block cursor-pointer">
                    <h2 className="text-3xl font-bold text-gray-700 relative inline-block pb-2 group">
                        <span className="relative z-10">WHY </span>
                        <span className="text-blue-600 inline-block hover:animate-bounce relative z-10">CHOOSE US</span>
                        <span className="absolute bottom-0 left-0 w-0 h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500 group-hover:w-full"></span>
                    </h2>
                    <p className="mt-3 text-gray-500">
                        Experience healthcare like never before
                    </p>
                </div>
            </div>

            {/* Features Columns */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24'>
                {[
                    {
                        title: "Efficiency",
                        description: "Streamlined appointment scheduling that fits into your busy lifestyle.",
                        icon: "⏱️"
                    },
                    {
                        title: "Convenience",
                        description: "Access to a network of trusted healthcare professionals in your area.",
                        icon: "📍"
                    },
                    {
                        title: "Personalization",
                        description: "Tailored recommendations and reminders to help you stay on top of your health.",
                        icon: "✨"
                    }
                ].map((feature, index) => (
                    <div 
                        key={index}
                        className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className='text-xl font-semibold text-blue-600 mb-4 group-hover:text-blue-700 transition-colors duration-300'>
                                {feature.title}
                            </h3>
                            <p className='text-gray-700 group-hover:text-gray-800 transition-colors duration-300'>
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default About