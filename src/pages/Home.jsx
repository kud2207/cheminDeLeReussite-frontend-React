import React from "react"
import { motion } from "framer-motion"
import heroImg from "../components/assets/images/etudiantnoir.png"
import heroImgback from "../components/assets/images/hero-shape-purple.png"
import { FiSearch } from "react-icons/fi"
import { BsFillLightningChargeFill } from "react-icons/bs"
import { FaBookReader, FaGraduationCap, FaUsers } from "react-icons/fa"
import { About } from "./About"
import { Courses } from "./Courses"
import { Instructor } from "./Instructor"
import { Blog } from "./Blog"

export const Home = () => {
  return (
    <>
      <HomeContent />
      <About />
      <br />
      <br />
      <br />
      <Courses />
      <Instructor />
      <Blog />
    </>
  )
}

export const HomeContent = () => {
  return (
    <>
      <section className='bg-secondary py-10 h-[92vh] md:h-full'>
        <div className='container'>
          <div className='flex items-center justify-center md:flex-col'>
            <div className='left w-1/2 text-black md:w-full'>
              <h1 className='text-4xl leading-tight text-black font-semibold'>
                Launch your <br /> Own online learning <br /> Platform
              </h1>
              <h3 className='text-lg mt-3 font-semibold text-gray-800'>
                Unlimited access to over 60 expert instructors
              </h3>
              <span className='text-[14px] text-gray-600'>
                2 plans available (full access to all courses)
              </span>
              <div className='relative text-gray-600 focus-within:text-gray-400 mt-5 mb-5'>
                <input type='search' className='py-3 text-sm  bg-white rounded-md pl-10 focus:outline-none ' placeholder='Search...' autoComplete='off' />
                <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                  <button type='submit' className='p-1 focus:outline-none focus:shadow-outline'>
                    <FiSearch />
                  </button>
                </span>
              </div>
              <span className='text-[14px]'>You're guaranteed to find something that's right for you.</span>
            </div>

            <div className='right w-1/2 md:w-full relative'>
              <div className='images relative'>
                <motion.img 
                animate={{
                  y: [0, -10, 0], // Mouvement de haut en bas
                  scale: [1, 1.05, 1], // Légère augmentation de la taille
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,  // Répéter indéfiniment
                  ease: "easeInOut",
                  repeatType: "loop",
                  delay: 0.1, // Légère attente avant de commencer
                  loop: Infinity,
                }}
                src={heroImgback} alt='' className='absolute top-32 left-10 w-96 md:left-10' />
                <div className='img h-[84vh] w-full'>
                  <img src={heroImg} alt='' className='h-full w-full object-contain z-20 relative' />
                </div>
              </div>

              <div className='content'>
                <motion.button
                  className='bg-white shadow-md absolute top-56 left-[-30px] z-30 p-2 flex items-center rounded-md'
                  animate={{
                    y: [0, -10, 0], // Mouvement de haut en bas
                    scale: [1, 1.05, 1], // Légère augmentation de la taille
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,  // Répéter indéfiniment
                    ease: "easeInOut",
                    repeatType: "loop",
                    delay: 0.1, // Légère attente avant de commencer
                    loop: Infinity,
                  }}
                >
                  <div className='icon w-10 h-10 text-white rounded-full flex items-center justify-center bg-orange-400'>
                    <BsFillLightningChargeFill size={25} />
                  </div>
                  <div className='text flex flex-col items-start px-4'>
                    <span className='text-sm text-black'>3D Educational</span>
                    <span className='text-[12px]'>Immersive Learning Experience</span>
                  </div>
                </motion.button>

                <motion.button
                  className='bg-white shadow-md absolute bottom-32 left-48 z-30 p-2 flex items-center rounded-md pr-8'
                  animate={{
                    y: [0, -15, 0], // Mouvement plus accentué
                    scale: [1, 1.1, 1], // Animation plus large
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,  // Répéter indéfiniment
                    ease: "easeInOut",
                    repeatType: "loop",
                    delay: 0.5, // Délai plus important avant de commencer
                    loop: Infinity,
                  }}
                >
                  <div className='icon w-10 h-10 text-white rounded-full flex items-center justify-center bg-blue-400'>
                    <FaGraduationCap size={25} />
                  </div>
                  <div className='text flex flex-col items-start px-4'>
                    <span className='text-sm text-black'>2.1K</span>
                    <span className='text-[12px]'>Assisted Student</span>
                  </div>
                </motion.button>

                <motion.button
                  className='bg-white shadow-md absolute top-56 -right-32 z-30 p-2 md:top-96 md:-right-5 flex items-center rounded-md'
                  animate={{
                    y: [0, -5, 0], // Moins de mouvement vertical
                    scale: [1, 1.1, 1], // Léger agrandissement
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,  // Répéter indéfiniment
                    ease: "easeInOut",
                    repeatType: "loop",
                    delay: 1, // Délai de démarrage plus long
                    loop: Infinity,
                  }}
                >
                  <div className='icon w-10 h-10 text-white rounded-full flex items-center justify-center bg-orange-400'>
                    <FaUsers size={25} />
                  </div>
                  <div className='text flex flex-col items-start px-4'>
                    <span className='text-sm text-black'>User Experience Class</span>
                    <span className='text-[12px]'>Tomorrow is our</span>
                  </div>
                </motion.button>

                <motion.button
                  className='bg-white shadow-md absolute top-20 right-32 z-30 p-2 flex items-center rounded-md'
                  animate={{
                    y: [0, -8, 0], // Mouvement plus subtil
                    scale: [1, 1.1, 1], // Légère augmentation
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,  // Répéter indéfiniment
                    ease: "easeInOut",
                    repeatType: "loop",
                    delay: 1.5, // Délai de démarrage pour ce bouton
                    loop: Infinity,
                  }}
                >
                  <div className='icon w-10 h-10 text-white rounded-full flex items-center justify-center bg-indigo-400'>
                    <FaBookReader size={25} />
                  </div>
                  <div className='text flex flex-col items-start px-4'>
                  <span className='text-sm text-black'>User Experience Class</span>
                  <span className='text-[12px]'>Tomorrow is our</span>
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
