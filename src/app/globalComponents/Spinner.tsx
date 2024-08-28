import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="w-full z-10 flex flex-col items-center justify-center h-screen bg-[#2F5382]">
      <span className="bg-white loading loading-spinner loading-xl w-32 text-[#2F5382]"></span>
      <p className="pt-5 text-lg text-white font-bold">Učitavanje...</p>
    </div>
  )
}

export default LoadingSpinner
