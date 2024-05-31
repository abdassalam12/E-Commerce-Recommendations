import React from 'react';
import { useState, useEffect } from 'react';
import { imageDb } from './config/Firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import Cookies from 'js-cookie';
import { v4 } from "uuid";
import axios from 'axios';
import Menu from './Menu';
import Navbar from './Navbar';
function Addproduct() {
    const [image, setImage] = useState('');
    const [Url, setUrl] = useState([]);
    const [title, setTitle] = useState('');
    const [available, setAvailability] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [uploaded, setIsUploaded] = useState(false);

    function handleImage(e) {
        setImage(e.target.files[0]);
        console.log(hello)
    }
    const handleClick = () => {
        const imgRef = ref(imageDb, `files/${v4()}`)
        uploadBytes(imgRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setUrl(data => [...data, url])
            });
        });
        setIsUploaded(true);
    }

    useEffect(() => {
        listAll(ref(imageDb, "files")).then(imgs => {
            console.log(imgs);
            imgs.items.forEach(val =>
                getDownloadURL(val).then(url => {
                    setUrl(data => [...data, url])
                })

            )
        });

        console.log('useEffect');
        console.log
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = Cookies.get('token');
        const response = await axios.get('http://127.0.0.1:8000/api/add_products', {
            params: {
                title: title,
                img_link: Url[Url.length - 1],
                price: price,
                availability: available,
                description: description,
            },
            headers: {
                Authorization: `token ${token}`, // Include token in Authorization header
            },
        });
        console.log(response.data);
    }
    return (
        <div >
             <Navbar />
            <div className='mt-20 w-screen h-screen flex items-center bg-white-500 justify-center '>
             
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                <div className="grid grid-cols-6 grid-rows-4 h-screen sm:w-11/12 md:w-8/12  p-6">

                    <div className='col-span-6 grid  spangrid   lg:grid-cols-6 grid-rows-8 gap-5'>

                        <div className='row-start-1 row-span-1   col-span-4 flex justify-center    lg:col-span-4  bg-gray-100 rounded-lg shadow-xl '>
                            <div className='h-24   w-10/12 '>
                                <h2 className="font-bold text-2xl text-[#002D74] mt-7">Ajouter votre produit !!</h2>
                            </div>
                        </div>

                        <div className='col-span-4 row-span-7  lg:col-span-2 lg:row-span-5 bg-gray-100 rounded-lg shadow-xl'>
                            <div className=''>
                                <div className=' w-10/12 mx-auto mt-6'>
                                    <label htmlFor="title"> Quantité </label>
                                </div>
                                <div className="relative mb-3 w-10/12 mx-auto mt-2">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <i className="fa-solid fa-bag-shopping"></i>
                                    </div>
                                    <input onChange={(e) => { setAvailability(e.target.value) }} name='title' type="text" id="input-group-1" className=" bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Titre du Produit" />
                                </div>
                            </div>
                            <div className=' w-10/12 mx-auto '>
                                <label htmlFor="title"> Description</label>
                            </div>
                            <div className="relative mb-3 w-10/12 mx-auto mt-2">
                                <div className="absolute top-4 left-0 flex items-center pl-3 pointer-events-none">
                                    <i className="fa-solid fa-pen"></i>
                                </div>
                                <textarea onChange={(e) => { setDescription(e.target.value) }} name="message" rows="9" placeholder="Your Description" required className=' border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' ></textarea>
                            </div>

                        </div>
                        <div className=' row-start-2  col-span-4 row-span-6 lg:col-span-4 lg:row-span-4 bg-yellow-300 rounded-lg shadow-xl '>
                            <div className='pb-4 '>
                                <div className=' w-10/12 mx-auto mt-6'>
                                    <label htmlFor="title"> Nom du produit</label>
                                </div>
                                <div className="relative mb-3 w-10/12 mx-auto mt-2">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <i className="fa-solid fa-bag-shopping"></i>
                                    </div>
                                    <input onChange={(e) => { setTitle(e.target.value) }} name='title' type="text" id="input-group-1" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Titre du Produit" />
                                </div>
                                <div className=' w-10/12 mx-auto flex items-center'>
                                    <h2 className="font-bold text-xl text-[#002D74] ">Média du produit</h2><span className='ml-2'>(optionnal)</span>
                                </div>
                                <div className='w-10/12 mx-auto mt-0'>
                                    <label className='text-sm'>Vous pouvez ajouter jusqu'à 1 image.</label>
                                </div>
                                <div className="mt-2 w-10/12  p-4 bg-white   mx-auto rounded-lg">
                                    <div className="file_upload  relative border-4 border-dotted border-gray-300 rounded-lg" >
                                        {uploaded && (
                                            <img className='mt-2 w-1/3 mx-auto mb-4' src={Url[Url.length - 1]} alt="Uploaded Image" />
                                        )}
                                        {!uploaded && (
                                            <svg className="text-indigo-500 w-24 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4V6a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2h-4l-4 4zm0 0l4-4m0 4l4 4m-4-4v12" /></svg>
                                        )}


                                        <div className="input_field flex flex-col w-max mx-auto text-center">
                                            <label>
                                                <input className="text-sm cursor-pointer w-36 hidden" type="file" multiple onChange={handleImage} />
                                                <div className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">Sélectionner</div>


                                            </label>
                                            <div onClick={handleClick} className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">Approuver</div>
                                            <div className="title text-indigo-500 uppercase">Approuver avant d'ajouter</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='col-span-4 row-span-7 bg-gray-100 rounded-lg shadow-xl'>
                            <div className='grid grid-cols-2'>
                                <div>
                                    <div className=' w-5/12 mx-auto mt-3'>
                                        <label htmlFor="title"> Prix minimum </label>
                                    </div>
                                    <div className="relative mb-3 w-5/12 mx-auto mt-2 pb-10">
                                        <input onChange={(e) => { setPrice(e.target.value) }} name='title' type="text" id="input-group-1" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Price" />
                                    </div>
                                </div>
                                <div>
                                    <div className=' w-5/12 mx-auto mt-3'>
                                        <label htmlFor="title"> Prix maximum </label>
                                    </div>
                                    <div className="relative mb-3 w-5/12 mx-auto mt-2 pb-10">
                                        <input name='title' type="text" id="input-group-1" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Price" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-4 lg:col-span-2 row-span-2 bg-gray-100 rounded-lg shadow-xl'>
                            <div className='h-24  w-10/12 mx-auto pt-8 '>
                                <div className='items-center h-full'>
                                    <input className="text-sm cursor-pointer w-36 hidden" type="file" multiple />
                                    <div onClick={handleSubmit} className="flex justify-center  text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">Ajouter un produit</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default Addproduct;