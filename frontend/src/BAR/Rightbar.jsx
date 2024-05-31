import { useState } from 'react';
import './Bar.css';
function Rightbar() {


    return (
        <div className="bg-white font-sans">

            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"  />
            <div className='grid '>

                <div style={{ display: 'grid', gridTemplateColumns: '50px 30px 50px 100px' }} className="h-12">

                    <div>
                        <button type="submit" className=" h-full px-4 py-2 bg-black text-white border border-black rounded-full hover:bg-gray-800 flex items-center justify-center">
                            <i className="fa-sharp fa-regular fa-heart"></i>
                        </button>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>

    )
}

export default Rightbar;
