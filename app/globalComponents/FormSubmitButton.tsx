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
        className={`btn btn-warning ${className}`}
        type="submit"
        disabled={pending}
        >
            {pending && <span className="loading loading-dots loading-lg"></span>}
            {children}
        </button>
    )
}