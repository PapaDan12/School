import React from 'react'
import { motion } from 'framer-motion'


const Contact = () => {
  return (
    <>
      <section className="min-h-screen bg-[url(photo-3.avif)] flex flex-col items-center justify-center  py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: false }}
        className="transition mb-8 text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-2">Get in Touch</h2>
        <p className="text-white max-w-md mx-auto">We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out.</p>
      </motion.div>
      <div className="p-12 max-w-lg mx-auto  bg-neutral-500 mt-5 rounded shadow">
        <h1 className="text-3xl font-bold mb-6 ">Contact Us</h1>
        <form className="space-y-4 max-w-md">
          <input type="text" placeholder="Your Name" className="w-full p-2 border rounded" />
          <input type="email" placeholder="Your Email" className="w-full p-2 border rounded" />
          <textarea placeholder="Your Message" className="w-full p-2 border rounded" rows="4"></textarea>
          <button className="bg-amber-500 text-white px-6 py-2 rounded cursor-pointer hover:bg-amber-600">Send</button>
        </form>
      </div>
      </section>
    </>
  )
}

export default Contact
