import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-[90vh]">
      <span className="loading loading-spinner loading-xl w-32 text-[#2F5382]"></span>
      <p className='pt-5 text-lg'>Učitavanje...</p>
    </div>
  );
};

export default LoadingSpinner;
