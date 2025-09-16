import React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { GraduationCap, UserCheck, Shield } from "lucide-react"
import Body from "../Components/Body"

const Home = () => {
  return (
    <>
      <Body />

      {/* Role Selection Section */}
      <section className="p-16 text-center bg-red-500">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl font-bold mb-4 text-gray-800"
        >
          Start Your Journey
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mb-8 text-gray-600"
        >
          Choose your role to continue
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row justify-center gap-6"
        >
          <Link to="/login?role=student">
            <button className="bg-amber-500 px-8 py-3 rounded-xl text-white font-semibold shadow-md hover:bg-amber-600 transition flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              I’m a Student
            </button>
          </Link>
          <Link to="/login?role=admin">
            <button className="bg-blue-500 px-8 py-3 rounded-xl text-white font-semibold shadow-md hover:bg-blue-600 transition flex items-center gap-2">
              <UserCheck className="w-5 h-5" />
              I’m an Admin
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Why Edubox Section */}
      <section className="p-16 bg-blue-500">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="text-3xl font-bold text-center mb-10 text-gray-800"
        >
          Why Edubox?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10 text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <GraduationCap className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2 text-gray-700">
              Flexible Learning
            </h3>
            <p className="text-gray-600">
              Students choose tutors and courses that match their goals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <UserCheck className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2 text-gray-700">
              Easy Management
            </h3>
            <p className="text-gray-600">
              Admins manage courses, students, and issue certificates easily.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: false }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2 text-gray-700">
              Secure Platform
            </h3>
            <p className="text-gray-600">
              Authentication and dashboards tailored to each role.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Home
