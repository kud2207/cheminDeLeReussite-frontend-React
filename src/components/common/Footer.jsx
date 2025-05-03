import React from "react"
import { BsApple, BsGooglePlay } from "react-icons/bs"
import { NavLink } from "react-router-dom"

export const Footer = () => {
  return (
    <>
      <section className='app w-4/5 m-auto rounded-lg shadow-shadow2 text-white flex md:flex-col bg-primary mt-16 relative z-10'>
        <div className='left w-[60%] md:w-full p-10'>
          <h1 className='text-4xl font-semibold leading-tight'>
            Start learning by <br /> downloading our app.
          </h1>
        </div>
        <div className='right w-[40%] md:w-full flex items-center px-5 rounded-r-lg rounded-bl-[500px] gap-8 bg-[#FF7C54] md:bg-transparent md:p-8'>


          <div className='box flex gap-2 items-center px-5 py-3 border text-white border-gray-50 hover:bg-white hover:text-black shadow-shadow1 rounded-sm cursor-pointer'>
            <BsApple />
            <span className='text-sm'>App Store</span>
          </div>
          <div className='box flex gap-2 items-center px-5 py-3 bg-white text-black shadow-shadow1 rounded-sm cursor-pointer'>
            <BsGooglePlay />
            <span className='text-sm'>Play Store</span>
          </div>
        </div>
      </section>

      <footer className='bg-[#F3F4F8] py-10 pt-32 -mt-24'>
        <div className='container grid grid-cols-4 gap-5 md:grid-cols-2'>

          <div className='logo'>
            <h2 className='text-xl font-bold text-black mb-2'>Chemin de la Réussite</h2>
            <p className='text-[14px] mb-2'>coe Kazzeu Idriss,</p>
            <p className='text-[14px] mb-2'>
              Founder and Co-founder Kageu Ulrich <br />
              Bertoua - 692134088 <br />
              &copy; 2025
            </p>
            <p className='text-[14px]'>
              A company specialized in digital training and academic support.
            </p>
          </div>

          <ul>
            <h4 className='text-black text-sm font-semibold mb-5'>Company</h4>
            <li><NavLink to='#' className='text-[14px] block mb-2'>Contact</NavLink></li>
            <li><NavLink to='#' className='text-[14px] block mb-2'>Portfolio</NavLink></li>
            <li><NavLink to='#' className='text-[14px] block mb-2'>Blog</NavLink></li>
            <li><NavLink to='#' className='text-[14px] block mb-2'>Our Team</NavLink></li>
            <li><NavLink to='#' className='text-[14px] block mb-2'>FAQ</NavLink></li>
            <li><NavLink to='#' className='text-[14px] block mb-2'>News</NavLink></li>
          </ul>

          <ul>
            <h4 className='text-black text-sm font-semibold mb-5'>Platform</h4>
            <li><NavLink to='#' className='text-[14px] block mb-2'>Shop</NavLink></li>
            <li><NavLink to='#' className='text-[14px] block mb-2'>Pricing</NavLink></li>
            <li><NavLink to='#' className='text-[14px] block mb-2'>Blog</NavLink></li>
            <li><NavLink to='#' className='text-[14px] block mb-2'>Home</NavLink></li>
          </ul>

          <ul>
            <h4 className='text-black text-sm font-semibold mb-5'>About</h4>
            <li><NavLink to='#' className='text-[14px] block mb-2'>Who we are</NavLink></li>
            <li><NavLink to='#' className='text-[14px] block mb-2'>Contact</NavLink></li>
            <li><NavLink to='#' className='text-[14px] block mb-2'>Reviews</NavLink></li>
            <li><NavLink to='#' className='text-[14px] block mb-2'>Services</NavLink></li>
          </ul>

        </div>
      </footer>
    </>
  )
}
