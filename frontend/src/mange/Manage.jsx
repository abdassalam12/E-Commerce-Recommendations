import { useState, useEffect } from 'react'; // Fichier CSS pour les styles personnalisés
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../Each.css';

function Manage({ post, type }) {

    let id;
    const [SearchParams, setSearchParams] = useSearchParams()
    const productId = SearchParams.get('filter')
    const [title, settitle] = useState(post.title);
    const [price, setprice] = useState(post.price);
    const [quantity, setquantity] = useState(post.availability);
    const [description, setdescription] = useState(post.description);
    const handleDelete = async (e) => {
        //  e.preventDefault();
        window.location.reload();
        const token = Cookies.get('token'); 
        const response = await axios.post('http://127.0.0.1:8000/api/delete_product/', {
            title: post.title,
        }, {
            headers: {
                Authorization: `Token ${token}`, // Include token in Authorization header
            },
        });
  };

  const handleUpdate = async (e) => {
    //  e.preventDefault();
    window.location.reload();
    const token = Cookies.get('token'); 
    const response = await axios.post('http://127.0.0.1:8000/api/update_product/', {
        titlekdim: post.title,
        title: title,
        price: price,
        quantity:quantity,
        description:description,
    }, {
        headers: {
            Authorization: `Token ${token}`, // Include token in Authorization header
        },
    });
};
    

    return (
        <div className=''>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
            <div className="w-500 h-300 mx-4 mt-3 bgGray-500  gap-6 flexWrap flex justifyCenter itemsCenter"  >

                {/* Card 1 s*/}
                <div className="mb-4   bg-gray-100 h-full w-full p-2  rounded-xl transform transition-all hover:translate-y-2 duration-300 shadow-lg hover:shadow-2xl  lg:mt-0" onClick={() => { setIsVisible(false) }}>
                    <button onClick={handleDelete} type="button" className="mb-4   bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Fermer le menu</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div>
                        <img src={post.img_link} alt="" className='h-60  rounded-t-xl  mx-auto' />
                    </div>

                    <div className="p-2">
                    <div className="mt-2  flex flex-col items-left gap-0">
                            <div className=' '>
                                <label htmlFor="title">Titre </label>
                            </div>
                            <div className="relative mb-3  mt-2">
                                <div className="absolute top-4 left-0 flex items-center pl-3 pointer-events-none">
                                    <i className="fa-solid fa-pen"></i>
                                </div>
                                <textarea value={title} onChange={(e) => settitle(e.target.value)} name="message"  placeholder="Your Title" required className=' border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' ></textarea>
                            </div>

                        </div>
                        <div className="flex flex-col items-left gap-0">
                            <h2>Prix</h2>
                            <div className="mt-2  md:col-span-2">
                                <input  type="text" id="Price" name="Price" placeholder="Prix" value={price} onChange={(e) => setprice(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                            </div>
                        </div>
                        <div className="mt-2  flex flex-col items-left gap-0">
                        <div className=' '>
                                <label htmlFor="title"> Quantité </label>
                            </div>
                            <div className="mt-2 md:col-span-2">
                                <input type="text" id="Price" name="Price" placeholder="Price" value={quantity} onChange={(e) => setquantity(e.target.value)}  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>

                        </div>
                        <div className="mt-2  flex flex-col items-left gap-0">
                            <div className=' '>
                                <label htmlFor="title"> Description</label>
                            </div>
                            <div className="relative mb-3  mt-2">
                                <div className="absolute top-4 left-0 flex items-center pl-3 pointer-events-none">
                                    <i className="fa-solid fa-pen"></i>
                                </div>
                                <textarea name="message" rows="9" value={description} onChange={(e) => setdescription(e.target.value)} required className=' border bg-yellow-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' ></textarea>
                            </div>

                        </div>

                    </div>
                    <div className="flex itemCenter justifyCenter gap-2 mb-3">
                        <div onClick={handleUpdate} className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">aprouav</div>
                    </div>
                </div>
                {/* Card 1 */}
            </div>
        </div>
    )

}

export default Manage;
