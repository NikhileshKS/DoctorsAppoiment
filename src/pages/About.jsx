import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
    return (
        <div>
            
            <div>
                <p>ABOUT <span>US</span></p>
            </div>

            <div>
                <img src={assets.about_image} alt="" />
            </div>

        </div>
    )
}

export default About