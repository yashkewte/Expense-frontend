import React from 'react'
import { useState } from 'react'
import {FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

function Input({ type, value, onChange, label, placeholder }) {
    const [showPassword, setShowPassword] = useState(false)
    const togglePassword = () => {
        setShowPassword(!showPassword)
    }
    return (
        <div>
            <label className='text-[13px] text-slate-800'>{label}</label>
            <div className='input-box'>
                <input
                    type={type == 'password' ? showPassword ? 'text' : 'password' : type} 
                    placeholder={placeholder}
                    value={value}
                    onChange={(e)=>{onChange(e)}}
                    className='w-full bg-transparent outline-none border-b-2 border-slate-300 focus:border-slate-500 p-2'    
                />
                {
                    type === 'password' && (
                        <>
                            {
                                showPassword ? (
                                    <FaRegEye
                                      size={22}
                                      className='text-primary cursor-pointer'
                                      onClick={() => togglePassword()}
                                    />
                                ) : (
                                    <FaRegEyeSlash
                                      size={22}
                                      className='text-primary cursor-pointer'
                                      onClick={() => togglePassword()}
                                    />
                                )
                            }
                        </>
                    )
                }
            </div>

        </div>
    )
}

export default Input
