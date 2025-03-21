import React, { useState, useContext } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate, Link } from 'react-router-dom'
import Input from '../../components/inputs/Input'
import { validateEmail } from '../../utils/helper'
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPath'
import { UserContext } from '../../context/userContext'
import uploadImage from '../../utils/uploadImage'

function Signup() {
  const [profilePic, setProfilePic] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullname] = useState('')
  const [error, setError] = useState('')

  const {updateUser} = useContext(UserContext)

  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()

    let profileImageUrl = ''

    if(!fullName){
      setError("Please enter your full name")
      return
    }
    if(!validateEmail(email)){
      setError("Please enter a valid email address")
      return
    }
    if(!password){
      setError('Please enter the password')
      return
    }

    setError('')

    //Signup api called
    try {

      // upload image if present
      if(profilePic){
        const imgUploadRes = await uploadImage(profilePic)
        // profileImageUrl = imgUploadRes.data.url
        profileImageUrl = imgUploadRes.imageUrl || ''
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        fullName,
        email,
        password,
        profileImageUrl

      })
      const {token,user} = response.data

      if(token){
        localStorage.setItem('token',token)
        updateUser(user)
        navigate('/dashboard')
      }
    } catch (error) {
        if(error.response && error.response.data.message){
          setError(error.response.data.message)
        }else{
          setError('Something went wrong')
        }
    }

  }
  

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignup}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
            
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              type='text'
              label='Full Name'
              placeholder='John Doe'
              value={fullName}
              onChange={(e) => setFullname(e.target.value)}
            />
            <Input
              type='email'
              label='Email'
              placeholder='John@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className='md:col-span-2'>

              <Input
                type='password'
                label='Password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>
          SIGN UP
          </button>

          <p className='text-[15px] text-slate-800 mt-3'>
            Already have an account? {" "}
            <Link className='font-medium text-primary underline' to='/login'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Signup
