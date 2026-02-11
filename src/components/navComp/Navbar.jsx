import React, { useEffect, useState } from 'react'

function Navbar() {
  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // scroll down → hide
        setShow(false)
      } else {
        // scroll up → show
        setShow(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <div
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-500 ease-in-out bg-white
        ${show ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}
    >
      <div className='flex flex-col items-center gap-4 py-10'>
        <div className='w-60 sm:w-72'>
          <img className='w-full h-full object-contain' src="sdtlogo1.png" alt="logo" />
        </div>

        <div>
          <ul className='flex flex-wrap justify-center gap-5 sm:gap-7 font-DynaPuff text-base sm:text-lg'>
            <li className='cursor-pointer hover:text-gray-500 transition'>ILLUSTRATION</li>
            <li className='cursor-pointer hover:text-gray-500 transition'>CONTACT</li>
            <li className='cursor-pointer hover:text-gray-500 transition'>ABOUT</li>
            <li className='cursor-pointer hover:text-gray-500 transition'>SHOP</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar