TextComponent

A reusable, customizable TextComponent built with React, ideal for use in Next.js projects. This component supports various input types like text, password, and includes optional icons and auto-focus functionality.

Installation You can install the package via npm:
npm install nextjs-textcomponent

Usage

Here’s an example of how to use the TextComponent in your Next.js or React project:

import React, { useState } from 'react';
import TextComponent from 'nextjs-textcomponent';
import { MdOutlineEmail } from 'react-icons/md';

export default function MyForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <TextComponent
        name="email"
        label="Email"
        type="email"
        handleChange={handleChange}
        icon={<MdOutlineEmail />}   // Optional icon for the input
        focusInput={true}           // Auto-focus on load
      />

      <TextComponent
        name="password"
        label="Password"
        type="password"
        handleChange={handleChange}
      />
    </div>
  );
}


Props

name	string	The name attribute for the input field.	

label	string	The label text for the input field.	''

handleChange	function	Callback function to handle the input field's value changes.	Required

type	string	The type of the input field (e.g., text, email, password)

icon	ReactElement	Optional icon component to display inside the input field (e.g., from react-icons).

focusInput	boolean	If true, the input field will be focused automatically when the page loads.	false


Features

Label Animation: The label animates based on whether the input is focused or has a value.
Password Visibility Toggle: When the input type is password, users can toggle between showing and hiding the password using icons.

Auto-focus: Pass the focusInput prop to automatically focus the input field when the component is mounted.

Icons Support: You can pass any icon component (such as react-icons) to display inside the input field.


Styling

The component uses basic CSS for input styling. If you want to customize the look and feel, you can either override the CSS classes or pass additional styles through props. Here are some key classes used:

Input Field: .input-field
Label: .input-label
Icon: .input-icon



Example with Password Toggle
import React, { useState } from 'react';
import TextComponent from 'nextjs-textcomponent';
import { MdLock } from 'react-icons/md';

export default function PasswordInput() {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <TextComponent
      name="password"
      label="Password"
      type="password"
      handleChange={handlePasswordChange}
      icon={<MdLock />}
    />
  );
}

Contributing
Feel free to open issues and submit pull requests to improve this component!

License
This project is licensed under the MIT License.

This README.md gives users a clear guide on how to install, use, and customize your TextComponent. You can adjust it to reflect your specific component's details as needed.



Code Example

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
