"use client"

import { ComponentProps } from "react"
import { useFormStatus } from "react-dom"

type FormSubmitButtonProps = {
    children: React.ReactNode,
    className?: string,
} & ComponentProps<"button">


export default function FormSubmitButton({children, className, ...props}: FormSubmitButtonProps){

    const {pending} = useFormStatus();

    return (
        <button
        {...props} // everything what we pass from the form will be passed here
        className={`btn px-6 bg-[#2F5382] text-md text-white rounded-full mt-5
        hover:bg-white hover:border-[#2F5382] hover:text-[#2F5382] ${className}`}
        type="submit"
        disabled={pending}
        >
            {pending && <span className="loading loading-dots loading-lg bg-[#2F5382]"></span>}
            {children}
        </button>
    )
}