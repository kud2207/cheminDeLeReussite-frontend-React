import React from "react"
import { FaGraduationCap, FaUsers } from "react-icons/fa"
import { GiEvilBook, GiWorld } from "react-icons/gi"

export const Instructor = () => {
  return (
    <section className='instructor mb-16'>
      <div className='container'>
        <div className='heading py-12 text-center w-2/3 m-auto md:w-full'>
          <h1 className='text-3xl font-semibold text-black'>Your Path to Success Starts Here</h1>
          <span className='text-[14px] mt-2 block'>
            With our online training programs, you gain the most in-demand skills. At the end of your journey, you're ready to land an internship or a job with our partners like <strong>Catech Digital</strong>.
          </span>
        </div>

        <div className='content grid grid-cols-2 gap-5 md:grid-cols-1'>
          <div className='images rounded-lg relative overflow-hidden h-72 w-full before:bg-backbg before:h-72 before:w-full before:absolute before:top-0 before:left-0 before:content-[""] before:z-10'>
            <img src='https://bdevs.net/wp/educal/wp-content/uploads/2021/09/what-1.jpg' alt='' className='rounded-t-lg object-cover w-full h-72' />
            <div className='categ flex flex-col gap-4 absolute top-5 z-30 m-3 p-8 items-center justify-center text-center'>
              <h2 className='text-3xl text-white font-semibold'>Learn at Your Own Pace</h2>
              <button className='text-[15px] py-2 px-4 border border-gray-200 rounded-md text-white'>Start Learning Today</button>
            </div>
          </div>

          <div className='images rounded-lg relative overflow-hidden h-72 w-full before:bg-backbg before:h-72 before:w-full before:absolute before:top-0 before:left-0 before:content-[""] before:z-10'>
            <img src='https://bdevs.net/wp/educal/wp-content/uploads/2021/09/what-2.jpg' alt='' className='rounded-t-lg object-cover w-full h-72' />
            <div className='categ flex flex-col gap-4 absolute top-5 z-30 m-3 p-8 items-center justify-center text-center'>
              <h2 className='text-3xl text-white font-semibold'>Join as an Instructor</h2>
              <button className='text-[15px] py-2 px-4 border border-gray-200 rounded-md text-white'>Share Your Knowledge</button>
            </div>
          </div>
        </div>

        <div className='heading py-12 text-center w-2/3 m-auto md:w-full'>
          <h1 className='text-3xl font-semibold text-black'>Our Results Speak for Themselves</h1>
          <span className='text-[14px] mt-2 block'>
            Every journey matters. Our learners become fullstack developers, community managers, and market-ready designers.
          </span>
        </div>

        <div className='content grid grid-cols-4 gap-5 md:grid-cols-2'>
          <InstructorCard color='text-red-500' icon={<FaUsers size={40} />} title='+63' desc='Students Trained' />
          <InstructorCard color='text-orange-500' icon={<GiEvilBook size={40} />} title='20' desc='Available Courses' />
          <InstructorCard color='text-purple-500' icon={<FaGraduationCap size={40} />} title='100%' desc='Job-Ready Graduates' />
          <InstructorCard color='text-indigo-500' icon={<GiWorld size={40} />} title='Partners' desc='With companies like Catech Digital' />
        </div>
      </div>
    </section>
  )
}

export const InstructorCard = ({ color, icon, title, desc }) => {
  return (
    <div className='box p-5 py-5 rounded-md'>
      <div className={`${color}`}>{icon}</div>
      <div className='text mt-2'>
        <h4 className='text-lg font-semibold text-black'>{title}</h4>
        <p className='text-[15px]'>{desc}</p>
      </div>
    </div>
  )
}
