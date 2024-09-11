import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="absolute z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-90 bg-white">
      <div className="text-center">
        <span className="bg-[#2F5382] loading loading-spinner loading-xl w-full text-[#2F5382]"></span>
        <p className="pt-5 text-lg text-[#2F5382] font-bold">Učitavanje...</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
