import React, { useState } from "react"
import LogoImg from "../assets/images/logoCDLR.png"
import { LinkData } from "../assets/data/dummydata"
import { NavLink } from "react-router-dom"
import { BiShoppingBag } from "react-icons/bi"
import { HiOutlineMenuAlt1, HiViewGrid } from "react-icons/hi"
import { FiLogIn } from "react-icons/fi"

export const Header = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className='bg-white py-4 text-black sticky z-50 shadow-md top-0 left-0 w-full'>
      <div className='container flex justify-between items-center'>

        {/* Logo + Titre */}
        <div className='logo flex items-center gap-6'>
          <img src={LogoImg} alt='logo' className='w-8' />
          <div className='category flex items-center text-sm gap-3'>
            <HiViewGrid size={20} />
            <span className="font-bold">chemin de la reussite</span>
          </div>
        </div>

        {/* Menu de navigation */}
        <nav className={open ? "mobile-view" : "desktop-view"}>
          <ul className='flex items-center gap-6'>
            {LinkData.map((link) => (
              <li key={link.id} onClick={() => setOpen(false)}>
                <NavLink
                  to={link.url}
                  className={({ isActive }) =>
                    isActive
                      ? " relative text-primary text-sm after:absolute after:content-[''] after:w-5 after:h-[2px] after:bg-blue-600 after:left-1/2 after:-translate-x-1/2 after:-bottom-1"
                      : "text-[15px] hover:text-primary  transition duration-200"
                  }
                >
                  {link.title}
                </NavLink>

              </li>
            ))}
          </ul>
        </nav>

        {/* Espace Login, Panier, Menu */}
        <div className='account flex items-center gap-5'>

          {/* Login avec icône + point clignotant */}
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-2 text-primary text-sm transition-all duration-1000 ease-in-out"
                : "flex items-center gap-2 text-[15px] hover:scale-125 transition-all duration-1000 ease-in-out"
            }
          >
            <FiLogIn size={22} className="transition-transform duration-300 ease-in-out" />
            <span className="transition-all duration-300 ease-in-out">Login</span>
            <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          </NavLink>


          {/* Panier */}
          <button>
            <BiShoppingBag size={30} />
          </button>

          {/* Bouton menu responsive */}
          <button className='open-menu' onClick={() => setOpen(!open)}>
            <HiOutlineMenuAlt1 size={25} />
          </button>
        </div>
      </div>
    </header>
  )
}
