import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { object, string } from 'yup'
import { setUserData } from '../../state/userReducer'
import axios from '../../utils/axios'
import { editProfile } from '../../utils/constants'
const EditProfile = ({ setIsModal }) => {
    const user = useSelector((state) => state.user)
    const token = useSelector((state) =>state.token)
    const dispatch = useDispatch()
    const initialValues = {
        userName: user.userName,
        bio: user.bio,
        email: user.email,
        phoneNumber: user.phoneNumber,
    }
    const profileSchema = object({
        email: string().email().required("Email Required"),
        userName: string().min(2).max(20).required('please enter your username '),
        phoneNumber: string().matches(/^\d{10}$/, 'Please enter a 10-digit phone number').required('Phone is required'),
        bio: string()
    })
    const[isSubmitting, setIsSubmitting] = useState(false)
    const handleSubmit = (values) => {
        setIsSubmitting(true)
      const userId = user._id
      const{userName, email, bio, phoneNumber} = values
        const data = {userName, email, bio, phoneNumber,userId}
        axios.put(editProfile,data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then((response)=>{
            dispatch(setUserData({user:response.data.user}))
            setIsSubmitting(false)
            setIsModal(false)
        }).catch((err)=>{
            setIsSubmitting(false)
            setIsModal(false)
        })
    }
    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-50">
                <div className="w-3/4 md:w-full max-w-md mx-auto mt-16">
                    {/* Modal content */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={profileSchema}
                            onSubmit={handleSubmit}
                        >
                            <Form >
                                <label>userName</label>
                                <Field className="w-full p-3 bg-slate-100" type="text" name="userName" />
                                <ErrorMessage className="w-full" name="userName" component="div" />
                                <label>email</label>
                                <Field type="text" name="email" className="w-full p-3 bg-slate-100" />
                                <ErrorMessage name="email" component="div" className="w-full" />
                                <label>Bio</label>
                                <Field type="text" name="bio"
                                    as="textarea"
                                    rows={3}
                                    onInput={(e) => {
                                        e.target.style.height = "auto";
                                        e.target.style.height = e.target.scrollHeight + "px";
                                    }} className="w-full focus:outline-none p-3 bg-slate-100" />
                                <ErrorMessage name="bio" component="div" className="w-full" />
                                <label>phone</label>
                                <Field type="text" name="phoneNumber" className="w-full p-3 bg-slate-100" />
                                <ErrorMessage name="phoneNumber" component="div" className="w-full" />

                                <button type='submit' onClick={handleSubmit} className="bg-gray-500 mr-2 my-2 text-white  py-2 px-4 rounded">
                                    Submit
                                </button>
                                <button onClick={() => setIsModal(false)} type="button" className="bg-gray-400  text-white  py-2 px-4 rounded">
                                    Cancel 
                                </button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProfile