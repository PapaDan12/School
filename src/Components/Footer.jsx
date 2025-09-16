import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: false }}
            className="transition"
          >
          <h2 className="text-xl font-bold text-white mb-4">Edubox</h2>
          <p className="text-sm">Your learning marketplace for skills and growth.</p>
          </motion.div>
        </div>

        {/* Quick Links */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5}}
            viewport={{ once: false }}
            className="transition"
          >
          <h3 className="font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
          </motion.div>
        </div>

        {/* Contact Info */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: false }}
            className="transition"
          >
          <h3 className="font-semibold text-white mb-3">Contact</h3>
          <p>Email: support@edubox.com</p>
          <p>Phone: +234 802 144 7132</p>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="hover:text-white">Facebook</a>
            <a href="#" className="hover:text-white">Twitter</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
          </div>
          </motion.div>
        </div>

      </div>
      <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}  
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: false }}
            className="transition"
          >
      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Edubox. All rights reserved.
      </div>
      </motion.div>
    </footer>
    
  )
}

export default Footer
