import React from 'react'
import { motion } from 'framer-motion'


const About = () => {
  return (
    <>
      
      <div className="p-12 bg-[url(/photo-2.avif)] bg-cover bg-center min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: false }}
        className="text-2xl font-bold text-black-400"
      >
       
        <div className='bg-neutral-200 p-5 rounded-lg'>
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        <p className="mb-4">Edubox connects students with tutors and administrators who provide high-quality education.</p>
        
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="mb-6">To make learning accessible by providing a platform where tutors share knowledge and students grow skills.</p>

        <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
        <p className="mb-6">To be the most trusted education marketplace for skill and career growth.</p>

        <h2 className="text-2xl font-semibold mb-2">Meet the Team</h2>
        <ul className="list-disc pl-6">
          <li>Developers building the platform</li>
          <li>Admins managing courses</li>
          <li>Students gaining new skills</li>
        </ul>
        <p className="mt-6">We believe education transforms lives and are committed to making learning easy and effective for everyone.</p>
        <p className="mt-6">Join us on this journey to unlock potential through learning!</p>
        </div>
      </motion.div>
      </div>
    
     
    </>
  )
}

export default About
