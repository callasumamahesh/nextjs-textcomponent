"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

function TextComponent({ name, label, handleChange, type, icon='',focusInput}) {
    const [value, setValue] = useState("");
    const [focus, setFocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const inputRef = useRef(null)

    useEffect(() => {
        if (focusInput && inputRef.current) {
            inputRef.current.focus()
        }
    }, [focusInput])

    const handleFocus = () => {
        setFocus(true);
    };

    const handleBlur = () => {
        if (value === "") {
            setFocus(false);
        }
    };

    const handleInputChange = (event) => {
        setValue(event.target.value);
        handleChange(event);
    };

    return (
        <form className={`relative`}>
            <label
                htmlFor={name}
                className={`cursor-pointer absolute transition-all duration-300 ease-in-out ${focus ? "top-[-12px] left-5 bg-white pr-2 pl-2 " : "top-[9px] left-5"
                    }`}
            >
                {label}
            </label>
            {type === "password" ? (
                <>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name={name}
                        onChange={handleInputChange}
                        className={`cursor-pointer border-2  p-2 w-[280px] rounded-[6px] ml-2 outline-none pr-[30px] ${focus ? "border-blue-600" : "border-gray-400"
                            }`}
                        id={name}
                        onFocus={() => handleFocus()}
                        onBlur={() => handleBlur()}
                        ref={inputRef}
                        required
                    ></input>
                    {
                        showPassword ? <span className={`absolute top-3 right-[8px] text-lg ${focus ? 'text-blue-600' : ''}`} onClick={() => setShowPassword(!showPassword)}><IoEye /> </span>
                            : <span className={`absolute top-3 right-[8px] text-lg ${focus ? 'text-blue-600' : ''}`} onClick={() => setShowPassword(!showPassword)}><IoEyeOff /> </span>
                    }
                </>
            ) : (
                <>
                    <input
                        type={type}
                        name={name}
                        onChange={handleInputChange}
                        className={`cursor-pointer border-2  p-2 w-[280px] rounded-[6px] ml-2 outline-none pr-[30px] ${focus ? "border-blue-600" : "border-gray-400"
                            }`}
                        id={name}
                        onFocus={() => handleFocus()}
                        onBlur={() => handleBlur()}
                        required
                        ref={inputRef}
                    ></input>
                    <span
                        className={`absolute top-3 right-[8px] text-lg ${focus ? "text-blue-600" : ""
                            }`}
                    >
                        {icon}
                    </span>
                </>
            )}
        </form>
    );
}

export default TextComponent;
