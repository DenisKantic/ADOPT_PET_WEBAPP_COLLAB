import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="w-full relative z-10 flex flex-col items-center justify-center">
      <span className="bg-[#2F5382] loading loading-spinner loading-xl w-32 text-[#2F5382]"></span>
      <p className="pt-5 text-lg text-[#2F5382] font-bold">
        {' '}
        Aktiviranje korisničkog naloga...
      </p>
    </div>
  )
}

export default LoadingSpinner
