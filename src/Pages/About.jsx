import React from "react";
import { motion } from "framer-motion";
import { Target, Lightbulb, Globe, User, Linkedin, Github, Twitter } from "lucide-react";

const teamMembers = [
  { name: "Iwu Constantine", role: "Project Lead", bio: "Oversees development and ensures smooth execution of edu/manager.", social: { linkedin: "#", github: "#", twitter: "#" } },
  { name: "Daniel Tobi", role: "Frontend Developer", bio: "Specializes in building clean, user-friendly interfaces for students and admins.", social: { linkedin: "#", github: "#", twitter: "#" } },
  { name: "Lifted Simon", role: "Backend Engineer", bio: "Designs and manages the course and enrollment database systems.", social: { linkedin: "#", github: "#", twitter: "#" } },
  { name: "Micheal Igwe", role: "UI/UX Designer", bio: "Creates intuitive layouts that simplify learning and administration.", social: { linkedin: "#", github: "#", twitter: "#" } },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.25 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const SectionHeader = ({ children }) => (
  <div className="text-center relative inline-block bg-blue-100/70 px-4 rounded-md">
    <motion.h1
      className="text-4xl font-bold text-blue-700 relative z-10"
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.h1>
    <motion.div
      className="h-1 bg-yellow-500 mt-2 rounded-full mx-auto relative z-10"
      initial={{ width: 0 }}
      whileInView={{ width: "100%" }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    />
  </div>
);

const AboutUs = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-blue-100 via-yellow-50 to-blue-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      <motion.div
        className="absolute top-1/3 left-1/2 w-[600px] h-[600px] bg-blue-200 rounded-full blur-3xl opacity-30"
        animate={{ x: [0, -50, 50, 0], y: [0, 30, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/2 w-[500px] h-[500px] bg-yellow-200 rounded-full blur-3xl opacity-30"
        animate={{ x: [0, 40, -40, 0], y: [0, -20, 20, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-12 font-sans z-10">
        {/* About Us Header */}
        <div className="flex justify-center mb-8">
          <SectionHeader>About Us</SectionHeader>
        </div>

        {/* Intro */}
        <motion.p
          className="mt-6 text-lg text-center text-gray-700 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          At <span className="font-semibold text-blue-700">edu/manager</span>, we believe
          education should be simple, accessible, and well-organized. Our platform
          bridges the gap between students and administrators, enabling efficient
          course management and seamless enrollment.
        </motion.p>

        {/* Mission, Vision, Values */}
        <motion.div
          className="mt-12 grid gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div className="flex items-start gap-4" variants={fadeInUp}>
            <Target className="text-blue-600" size={32} />
            <div>
              <h2 className="text-xl font-semibold text-blue-700">Mission</h2>
              <p className="mt-2 text-gray-600">
                To simplify education management by providing a platform where
                administrators can create courses and students can enroll
                seamlessly, ensuring a smooth academic experience for all.
              </p>
            </div>
          </motion.div>

          <motion.div className="flex items-start gap-4" variants={fadeInUp}>
            <Globe className="text-yellow-500" size={32} />
            <div>
              <h2 className="text-xl font-semibold text-yellow-600">Vision</h2>
              <p className="mt-2 text-gray-600">
                To become a leading educational management solution that empowers
                institutions worldwide with innovative tools for smarter learning
                and teaching.
              </p>
            </div>
          </motion.div>

          <motion.div className="flex items-start gap-4" variants={fadeInUp}>
            <Lightbulb className="text-blue-500" size={32} />
            <div>
              <h2 className="text-xl font-semibold text-blue-700">Core Values</h2>
              <ul className="mt-2 space-y-2 text-gray-600 list-disc list-inside">
                <li><span className="font-medium text-yellow-600">Accessibility</span> – Making education available and manageable for everyone.</li>
                <li><span className="font-medium text-yellow-600">Efficiency</span> – Streamlining academic processes for both students and administrators.</li>
                <li><span className="font-medium text-yellow-600">Innovation</span> – Continuously improving to meet evolving educational needs.</li>
                <li><span className="font-medium text-yellow-600">Collaboration</span> – Fostering a supportive environment between students and admins.</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Team Section */}
        <div className="flex justify-center mt-16 mb-8">
          <SectionHeader>Meet Our Team</SectionHeader>
        </div>

        <motion.div
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md text-center cursor-pointer hover:shadow-lg transition-shadow"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
            >
              <User className="mx-auto mb-3 text-blue-600" size={40} />
              <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
              <p className="text-yellow-600 font-medium">{member.role}</p>
              <p className="mt-2 text-sm text-gray-600">{member.bio}</p>

              <div className="mt-4 flex justify-center gap-4">
                <motion.a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2 }}>
                  <Linkedin className="text-blue-700" size={22} />
                </motion.a>
                <motion.a href={member.social.github} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2 }}>
                  <Github className="text-gray-800" size={22} />
                </motion.a>
                <motion.a href={member.social.twitter} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2 }}>
                  <Twitter className="text-sky-500" size={22} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.h2
          className="mt-16 text-center text-2xl font-semibold text-blue-700"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          “Smart Learning. Simple Management.”
        </motion.h2>
      </div>
    </div>
  );
};

export default AboutUs;
