import React from 'react'

import close from '../assets/close.png'

const AddPhoto = () => {
    
    return (
        <div className='absolute bg-transparent w-full min-h-screen flex justify-center items-center'>
            <div className='relative w-4/5 lg:w-1/2 h-fit flex-col justify-center items-center bg-white p-10'>
                <img src={close} className=' absolute top-3 right-3 h-5 w-5' alt="" />
                <div className='border border-black w-full h-96 rounded-xl mb-2'>
                </div>
                <div className='w-full h-fit flex flex-col justify-center
                px-4 gap-5'>
                    <button className="bg-[#ff4b4b] text-white text-lg font-bold px-8 py-1 mx-10 rounded-lg shadow-lg border border-gray-400 hover:bg-[#e04343] transition duration-300">
                        Capture
                    </button>
                    <button className="bg-cyan-600 text-white text-lg font-bold px-8 py-1 rounded-lg shadow-lg border border-gray-400 transition duration-300">
                        Choose from device
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddPhoto