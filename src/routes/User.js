import React, { useState } from "react"
import { Link } from "react-router-dom"
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import { FaHandsHelping } from "react-icons/fa"
import Avatar from "../Components/smallComponants/Avatar"

const User = () => {
    const [nav, setNav] = useState(false)
    const handleNav = () => {
        setNav(!nav)
    }
    return (
        <div className="bg-white">
            <div className="flex justify-between items-center h-15 md:max-w-[1240px]  mx-auto  ">
                <Link className="flex items-center" to="/">
                    <FaHandsHelping size={30} className=" mx-2" />
                    <h1 className="w-full text-2xl font-bold text-yellow-400">minglee</h1>
                </Link>
                <ul className="hidden font-bold  md:flex ">
                    <li className="p-4">Home</li>
                    <li className="p-4">Events</li>
                    <li className="p-4">About</li>
                    <li className="p-4">Contact</li>
                    {/* <li className="p-2">
                <HiUserCircle className="" size={35}/>
                </li> */}
                    <li className="pt-3">
                        <button className="bg-red-600 rounded-full">
                            <Avatar />
                        </button>
                    </li>
                </ul>
                <div onClick={handleNav} className="block md:hidden p-10">
                    {!nav ? <AiOutlineMenu size={20} /> : <AiOutlineClose size={20} />}
                </div>
                <div className={nav ? "fixed left-0 top-0 w-[60%] border-r border-r-gray-900 h-full bg-white ease-in-out duration-500" : "fixed left-[-100%]"}>
                    <Link className="p-3 flex items-center" to="/"><FaHandsHelping size={30} className=" mx-2" /><h1 className="w-full text-2xl font-bold text-yellow-400">minglee</h1>
                    </Link>
                    <ul className="p-4 font-bold  uppercase">
                        <li className="p-4 border-b border-gray-600">Home</li>
                        <li className="p-4 border-b border-gray-600">Events</li>
                        <li className="p-4 border-b border-gray-600">About</li>
                        <li className="p-4 border-b border-gray-600">Contact</li>
                        <li className="p-5">
                            <button className="bg-red-600 rounded-full">
                                <Avatar />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default User;