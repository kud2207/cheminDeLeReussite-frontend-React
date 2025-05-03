import React from "react"
import aboutImg from "../components/assets/images/enfantecole.png"
import aboutImgBanner from "../components/assets/images/about-banner.jpg"
import imgs from "../components/assets/images/join1.png"
import { FaBookDead } from "react-icons/fa"
import { AiOutlineCheck } from "react-icons/ai"

export const About = () => {
  return (
    <>
      <section className='about py-16'>
        <div className='container'>
          <div className='heading text-center py-12'>
            <h1 className='text-3xl font-semibold text-black'>An Innovative Education and Career Platform</h1>
            <span className='text-sm mt-2 block'>Get trained, find a job or internship, with our support and guidance.</span>
          </div>
          <div className='grid grid-cols-4 gap-5 mt-5 md:grid-cols-2'>
            <AboutCard color='bg-[#2D69F0]' icon={<FaBookDead size={50} />} title='4,000+ Training Programs' desc="Access diverse content to build your skills." />
            <AboutCard color='bg-[#DD246E]' icon={<FaBookDead size={50} />} title='Internship Offers' desc="Find opportunities that match your profile and goals." />
            <AboutCard color='bg-[#8007E6]' icon={<FaBookDead size={50} />} title='Personalized Support' desc="Get tailored guidance for your career path." />
            <AboutCard color='bg-[#0CAE74]' icon={<FaBookDead size={50} />} title='Targeted Job Offers' desc="Easily find the job that suits you." />
          </div>
        </div>
      </section>
      <AboutContent />
    </>
  )
}

export const AboutCard = (props) => {
  return (
    <div className={`box shadow-md p-5 py-8 rounded-md text-white ${props.color} cursor-pointer transition ease-in-out delay-150 hover:-translate-y-4 duration-300`}>
      <div className='icon'>{props.icon}</div>
      <div className='text mt-5'>
        <h4 className='text-lg font-semibold my-3'>{props.title}</h4>
        <p className='text-sm'>{props.desc}</p>
      </div>
    </div>
  )
}

export const AboutContent = () => {
  return (
    <section className='mb-16'>
      <div className='container flex md:flex-col'>
        <div className='left w-1/3 md:w-full mr-8 md:mr-0 relative'>
          <img src={aboutImg} alt='aboutImg' className='rounded-xl' />
          <img src={aboutImgBanner} alt='aboutImg' className='rounded-xl absolute -bottom-14 -left-24 h-56 md:left-80' />
          <div className='img-group ml-24 mt-3'>
            <img src={imgs} alt='' />
            <span className='text-[14px]'>
              Join over <label className='text-black text-sm'>4,000+</label> students and young professionals
            </span>
          </div>
        </div>
        <div className='right w-2/3 md:w-full md:mt-16 mt-12'>
          <div className='heading w-4/5 md:w-full'>
            <h1 className='text-3xl font-semibold text-black'>Achieve Your Goals with JobConnect</h1>
            <span className='text-sm mt-2 block leading-6'>Our platform supports you throughout your journey—whether you're learning, looking for an internship, searching for a job, or building your career. Enjoy a dynamic space tailored to your needs.</span>
            <ul className='my-5'>
              <li className='text-sm flex items-center gap-5'>
                <AiOutlineCheck className='text-green-500' /> Certified and practical training programs
              </li>
              <li className='text-sm flex items-center gap-5 my-2'>
                <AiOutlineCheck className='text-green-500' /> Access thousands of internships and job offers
              </li>
              <li className='text-sm flex items-center gap-5'>
                <AiOutlineCheck className='text-green-500' /> Individual coaching and career support
              </li>
              <li className='text-sm flex items-center gap-5 mt-2'>
                <AiOutlineCheck className='text-green-500' /> Individual coaching and career support
              </li>
              
            </ul>
            <button className='px-5 py-2 border border-gray-300 rounded-md text-sm'>Join Now</button>
          </div>
        </div>
      </div>
    </section>
  )
}
