import React from "react"
import { AiTwotoneCalendar } from "react-icons/ai"
import { NavLink } from "react-router-dom"

export const Blog = () => {
  const articles = [
    {
      id: 1,
      title: "Mastering Machine Learning in E-learning",
      cover: "https://img.freepik.com/free-photo/ai-chip-intelligence-technology_53876-129770.jpg",
      author: "Ulrich",
      date: "May 2, 2025",
      category: "E-learning",
    },
    {
      id: 2,
      title: "The Rise of Community Management in the Digital Age",
      cover: "https://img.freepik.com/free-photo/group-diverse-people-having-business-meeting_53876-25067.jpg",
      author: "Auriol",
      date: "April 18, 2025",
      category: "Community",
    },
    {
      id: 3,
      title: "How to Ensure Network Security in 2025",
      cover: "https://img.freepik.com/free-photo/lock-network-connection-abstract-technology-background-security-system_53876-124878.jpg",
      author: "Kageu",
      date: "March 30, 2025",
      category: "Cybersecurity",
    },
  ]

  return (
    <section className='courses'>
      <div className='w-4/5 m-auto'>
        <div className='heading text-center py-12'>
          <h1 className='text-3xl font-semibold text-black'>
            We Share <br />
            Our Thoughts On Tech & Education
          </h1>
          <span className='text-sm mt-2 block'>You're not alone — we're here to share insights that matter.</span>
        </div>

        <div className='grid grid-cols-3 gap-5 md:grid-cols-1'>
          {articles.map((item) => (
            <div key={item.id} className='box rounded-lg shadow-shadow1 bg-white'>
              <div className='images rounded-t-lg relative overflow-hidden h-40 w-full'>
                <img
                  src={item.cover}
                  alt={item.title}
                  className='rounded-t-lg object-cover w-full h-full transition ease-in-out delay-150 cursor-pointer hover:scale-125 duration-300'
                />
              </div>

              <div className='text p-3'>
                <span className='text-[12px] bg-backbg p-1 px-3 text-white rounded-[5px]'>{item.category}</span>
                <NavLink to='/single-blog'>
                  <h3 className='text-black my-4 font-medium h-12'>{item.title}</h3>
                </NavLink>

                <div className='user flex items-center justify-between'>
                  <div className='flex items-center'>
                    <img
                      className='rounded-full w-7 h-7 object-cover shadow-shadow1'
                      src='https://secure.gravatar.com/avatar/75ec18a5bf959aab895830be3a78cb34?s=50&d=mm&r=g'
                      alt=''
                    />
                    <span className='text-[14px] ml-2'>{item.author}</span>
                  </div>
                  <div className='flex items-center'>
                    <AiTwotoneCalendar />
                    <span className='text-[14px] ml-2'>{item.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
