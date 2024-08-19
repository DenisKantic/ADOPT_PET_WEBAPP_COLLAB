import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="absolute top-0 left-0 bg-red-400 w-full z-10 flex flex-col items-center justify-center h-screen">
      <span className="bg-white loading loading-spinner loading-xl w-32 text-[#2F5382]"></span>
      <p className='pt-5 text-lg'>Učitavanje...</p>
    </div>
  );
};

export default LoadingSpinner;
