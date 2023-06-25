import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from '../../utils/axios'
import { setLogin } from '../../state/userReducer'
import toast, { Toaster } from 'react-hot-toast';
import { googleLogin, loginPost } from '../../utils/constants'
import { GoogleLogin } from '@react-oauth/google'
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const handleLogin = (e) => {
        e.preventDefault()
        axios.post(loginPost, { userName, password }, {
            headers: { "Content-Type": "application/json" },
        }).then((userData) => {
            dispatch(setLogin(userData.data))
            navigate('/')
        }).catch((err) => {
            ((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                });
            })(err);
        })
    }
    const responseMessage = (response) => {
        setUser(response.credential)
    };
    const errorMessage = (error) => {
        console.log(error);
    };
    useEffect(() => {
        if (user) {
            const getUser =async ()=>{
                const response = await axios.get(googleLogin,{
                    headers: {
                        "Authorization": `barear ${user}`
                    }
                })
                dispatch(setLogin(response.data))
                navigate('/')
            }
            getUser();
        }
    }, [user,dispatch,navigate])

    return (
        <div className="flex min-h-screen bg-[#02abc5] items-center justify-around py-32 px-4 sm:px-6 lg:px-8">
            <div></div>
            <div className="w-full max-w-md space-y-8 rounded p-2  ">
                <div>
                    <img className="h-12 w-auto" src="https://st2.depositphotos.com/4398873/9839/i/600/depositphotos_98397934-stock-photo-triangle-geometric-knot-outline-logo.jpg" alt="Your Company" />
                    <h2 className=" text-center text-3xl font-bold tracking-tight text-gray-700">Sign in to Social Media</h2>

                </div>
                <form className="mt-8 space-y-6" onSubmit={(e) => handleLogin(e)}>

                    <div className="-space-y-px rounded-md shadow-sm">    
                        <div>
                            <label htmlFor="user-name" className="sr-only">User Name</label>
                            <input onChange={(e) => setUserName(e.target.value)} id="user-name" name="userName" type="text" required className=" pl-3 relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 sm:text-sm " placeholder="Enter UserName" />
                        </div>
                        <div className='pt-5'>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" required className="pl-3 relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 sm:text-sm sm:leading-6" placeholder="Password" />
                        </div>
                    </div>

                    <div>
                        <div className="text-sm justify-between flex ">
                            <Link to='/register' className='w-1/2'>
                                <p className="text-sm text-white px-4 hover:font-bold">Create new Account ?</p>
                            </Link>
                            <p onClick={() => navigate('/forgottPassword')} className="w-1/2  cursor-pointer text-gray-500 hover:font-bold">Forgot your password?</p>
                        </div>
                    </div>
                    <div className='w-full'>
                    <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                    </div>
                    <div>
                        <button type='submit' className="group relative flex w-full justify-center rounded-md bg-slate-800 py-2 px-3 text-sm font-semibold text-white hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="h-5 w-5 group-hover:text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Sign in
                        </button>
                        <Toaster />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login
