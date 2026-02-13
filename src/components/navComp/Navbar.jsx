import React, { useEffect, useState } from 'react'

function Navbar() {
  const [show, setShow] = useState(true)
  const [open, setOpen] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  // 🔥 Navbar hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShow(false)
      } else {
        setShow(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // 🔥 Scroll Lock when menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
      document.body.style.height = "100vh"
    } else {
      document.body.style.overflow = "auto"
      document.body.style.height = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
      document.body.style.height = "auto"
    }
  }, [open])

  return (
    <div
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-500 ease-in-out bg-white
        ${show ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}
    >
      <div className='flex flex-col max-sm:flex-row items-center max-sm:justify-between gap-12 py-10 max-sm:py-5 max-sm:px-2'>

        {/* Logo */}
        <div className='w-70 max-sm:w-48'>
          <img className='w-full h-full object-contain' src="sdtlogo1.png" alt="logo" />
        </div>

        {/* Desktop Menu */}
        <div className='max-sm:hidden'>
          <ul className='flex flex-wrap justify-center gap-5 sm:gap-7 font-DynaPuff text-base sm:text-lg'>
            <li className='cursor-pointer hover:text-gray-500 transition'>ILLUSTRATION</li>
            <li className='cursor-pointer hover:text-gray-500 transition'>CONTACT</li>
            <li className='cursor-pointer hover:text-gray-500 transition'>ABOUT</li>
            <li className='cursor-pointer hover:text-gray-500 transition'>SHOP</li>
          </ul>
        </div>

        {/* Hamburger / Cross Button */}
        <div className="sm:hidden">
          <button 
            onClick={() => setOpen(!open)}
            className="relative w-8 h-8 flex items-center justify-center z-50"
          >
            {/* Line 1 */}
            <span
              className={`absolute h-0.5 w-6 bg-black transition-all duration-300 ${
                open ? "rotate-45" : "-translate-y-2"
              }`}
            ></span>

            {/* Line 2 */}
            <span
              className={`absolute h-0.5 w-6 bg-black transition-all duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            ></span>

            {/* Line 3 */}
            <span
              className={`absolute h-0.5 w-6 bg-black transition-all duration-300 ${
                open ? "-rotate-45" : "translate-y-2"
              }`}
            ></span>
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden fixed left-0 w-full bg-white
        transition-all duration-500 ease-in-out
        ${open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
        `}
        style={{
          top: "79px",                 // logo ke neeche se start
          height: "calc(115vh - 120px)" // sirf neeche ka area cover
        }}
      >
        <ul className="flex flex-col items-center justify-center h-full gap-8 text-lg font-semibold text-black">
          <li onClick={() => setOpen(false)} className="hover:text-gray-400 cursor-pointer">ILLUSTRATION</li>
          <li onClick={() => setOpen(false)} className="hover:text-gray-400 cursor-pointer">CONTACT</li>
          <li onClick={() => setOpen(false)} className="hover:text-gray-400 cursor-pointer">ABOUT</li>
          <li onClick={() => setOpen(false)} className="hover:text-gray-400 cursor-pointer">SHOP</li>
        </ul>
      </div>

    </div>
  )
}

export default Navbar
