import React, { ChangeEvent } from "react";

interface InputProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  type?: string;
  label: string;
}

export default function Input({
  value,
  onChange,
  disabled,
  type = "text",
  label,
}: InputProps) {
  return (
    <div className="relative w-full lg:w-[32rem]">
      <input
        value={value}
        onChange={onChange}
        disabled={disabled}
        type={type}
        className="outline-none p-2 mt-2 mb-3 input input-bordered input-primary w-full rounded-full 
        peer focus:border-neutral-200 disabled:bg-neutral-200 focus:bg-white bg-slate-200"
      />
      <label
        className="capitalize absolute -top-7 -left-1 text-[17px] px-3 py-2 peer-focus-within:scale-100 
      peer-focus-within:-top-3 peer-focus-within:rounded-full peer-focus-within:text-[14px] 
      peer-focus-within:bg-white peer-focus-within:px-2 bg-transparent transition-all duration-200 
      ease-in-out text-[#2f5382]"
      >
        {label}
      </label>
    </div>
  );
}
