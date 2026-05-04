import React, { useEffect, useRef, useState } from 'react'
// import Navbar from '../navComp/Navbar'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useUserStore from '../../store/userStore'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CursorEffect from './section/CursorEffect'


const bgimgurl = import.meta.env.BASE_URL


const ErrorMessage = ({ error, field }) => {
    return error[field] && <p className='text-red-500' > {error[field]} </p>
}

function Login() {


  const email = useRef("")
  const password = useRef("")
  const navigate = useNavigate()

  const [error, setError] = useState({})
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  //   const { setUser } = useUserStore()
  const { setAuth } = useUserStore.getState()

  const signInHandler = async (e) => {
    e.preventDefault()

    if (loading) return

    const object = {
      email: email.current.value.toLowerCase(),
      password: password.current.value
    }

    if (!object.email) {
      setError(prev => ({ ...prev, email: "Email is required" }))
      toast.error("Email is required")
      return
    } else {
      setError(prev => ({ ...prev, email: "" }))
    }

    if (!object.password) {
      setError(prev => ({ ...prev, password: "Password is required" }))
      toast.error("Password is required")
      return
    } else {
      setError(prev => ({ ...prev, password: "" }))
    }

    try {

      setLoading(true)

      const url = `${import.meta.env.VITE_API_URL}/login/`

      const fetchData = await fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(object)
      })

      const data = await fetchData.json()

      if (fetchData.ok) {
        console.log("SighnToken", data.token)
        localStorage.setItem("access_token", data.token, data.user_data)

        setAuth(data.user_data, data.token)

        toast.success("Login Successful 🎉")

        const fetchVerifyToken = async (token) => {
          try {

            const verify = await fetch(`${import.meta.env.VITE_API_URL}/verify-token/`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })

            const verifyData = await verify.json()

            const role = verifyData.user_data?.role

            setAuth(verifyData.user_data, data.token)

            // if (role === "admin") {
            //   navigate("/")
            // } else {
            navigate("/shop")
            // }

          } catch (err) {
            console.error("Token verification failed:", err)
            toast.error("Token verification failed")
          }
        }

        const token = localStorage.getItem("access_token")

        if (token) {
          fetchVerifyToken(token)
        }

      } else {

        if (data.error_type === "email") {
          setError(prev => ({ ...prev, email: data.message }))
        }

        if (data.error_type === "password") {
          setError(prev => ({ ...prev, password: data.message }))
        }

        toast.warning(data.message || "Login failed ❌")

      }

    } catch (err) {
      console.log(err)
      toast.error("Server error ❌")
    } finally {
      setLoading(false)
    }
  }
  console.log("token",)

    return (
        <div className='main-charecter w-full'
            style={{ backgroundImage: `url(${bgimgurl}login.png)` }}
        >
                <CursorEffect />
            <div className='max-sm:px-5 max-sm:py-5'>
                {/* <Navbar /> */}
                <div className=' w-full flex justify-between'>
                    <div className='w-full b-black max-sm:w-full h-screen flex justify-center items-center max-lg:px-20 max-sm:px-5'>
                        <div className='flex-col flex items-center text-center font-DynaPuff'>
                        {/* <Icon width={50} className='text-gray-800 text-center w-full' icon={"qlementine-icons:user-16"} /> */}
                        <div className='w-15 flex '>
                            <img src="faviconsdt1.png" alt="" srcset="" />
                        </div>
                        <div className='py-4 pt-6'>
                            <h1 className='text-xl  font-DynaPuff'>Login</h1>
                            <p className='text-md text-gray-700'>Welcome back</p>
                        </div>
                        <div className='flex-col flex w-full  text-start gap-5 py-2'>
                            <label htmlFor="" className='text-xl '>Email address*</label>
                            <input ref={email} type="text" className='border border-gray-400 rounded-md p-2' placeholder='Email address' />
                            <ErrorMessage error={error} field={"email"} />
                            {/* <label htmlFor="" className='text-xl'>Password*</label>
                            <input ref={password} type="password" className='border-2 border-gray-600 rounded-md p-2' placeholder='Password' />
                            <ErrorMessage error={error} field={"password"} /> */}
                            <div className="relative w-full">
                                <input
                                    type={show ? "text" : "password"}
                                    ref={password}
                                    className="w-full border border-gray-400 px-3 py-2 rounded-lg"
                                    placeholder="Password"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShow(!show)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                                >
                                    {show ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                        </div>
                        <div className='flex max-md:flex-col gap-2 pt-2 justify-between items-center w-full'>
                            <div className='flex gap-2'>
                                <input required type="checkbox" className='w-4' /><p className='font-Sourgummy text-gray-700'>Keep me logged in</p>
                            </div>
                            <Link to={'/forgetpassword'}><p className='text-blue-800 border-b border-blue-800'>forget password?</p></Link>
                        </div>
                        <div className='flex flex-col w-full px-1 p-5 gap-5 '>
                            <button onClick={signInHandler} className='text-white bg-pink-600 p-2 text-md hover:bg-pink-400 rounded-3xl w-full cursor-pointer'>Log in</button>
                            <Link to={"/signup"} className=''><button className='bg-black text-white p-2 text-md rounded-3xl w-full cursor-pointer'>Create Account</button></Link>
                        </div>
                        </div>
                    </div>
                    <div className='max-lg:hidden w-[45%] flex'>
                        <img className='' src="login.jpg" alt="" srcset="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login