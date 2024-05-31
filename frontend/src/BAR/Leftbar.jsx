import { useState } from 'react';
import './Bar.css';
import Menu from '../Menu';
function Leftbar() {


    return (
        
        <div className="bg-white font-sans ">
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
            <div className='grid '>

                <div className="" style={{ display: 'grid', gridTemplateColumns: '50px  100px' }} >
                    
                    <div>
                        <button type="submit" className=" h-full px-4 py-2 bg-black text-white border border-black rounded-full hover:bg-gray-800 flex items-center justify-center">
                        <i className="fa-solid fa-bars"></i>
                        </button>
                    </div>
                    <div className="flex justify-center   rounded-full">
                        <div className="relative">
                            <img  className="  w-12 h-12" src="https://firebasestorage.googleapis.com/v0/b/fire-images-65561.appspot.com/o/files%2Fimages.png?alt=media&token=b89b22c7-c20e-41cb-9d91-69925bfe4409" alt="img" />
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Leftbar;
