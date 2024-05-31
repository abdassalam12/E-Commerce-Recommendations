import { useState, useEffect } from "react";
import React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Signup() {
    const [fullName, setfullName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [billing, setBilling] = useState('');
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('');
    const navigator = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const jsonData = {
            password: password,
            fullName: fullName,
            email: email,
            address: address,
            city: city,
            country: country,
            state: state,
            zipcode: zipcode,
            billing: billing,
            image: image // Assuming image is a base64 encoded string
        };
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/signup', jsonData);
            console.log(response.data);
            navigator("/login");
            // Handle successful signup
        } catch (error) {
            console.error('Erreur lors', error);
            // Handle signup error
        }
    };

    function handleImage(e) {

        console.log(e.target.files);
        setImage(e.target.files[0]);
        
    }

    return (
        <div className="mt-16">
            <form onSubmit={handleSubmit}>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
                <div className="lg:w-30 grid xl:grid-rows-1 xl:grid-cols-2 grid-cols-1 gap-2 border max-w-6xl  pb-8  bg-opacity-50 bg-gray-70 backdrop-blur-lg mx-auto pt-8">
                    <div className="shadow-2xl max-w-1 mx-6 border rounded-lg bg-white grid grid-rows-3 items-center">
                        <div className="flex justify-center">
                            <p className="font-bold text-xl">Inscription</p>
                        </div>
                        <div className="flex justify-center mx-6  rounded-full">
                            <div className="relative">
                                <img className=" rounded-full w-32 h-32" src="https://firebasestorage.googleapis.com/v0/b/fire-images-65561.appspot.com/o/files%2F%E2%80%94Pngtree%E2%80%94user%20icon_5097430.png?alt=media&token=883574a5-f72b-4453-80c5-fafc4592e4ae" alt="img" />
                                <input className="rounded-full border w-8 absolute top-20 left-20" type="file" name="file" onChange={handleImage} />
                            </div>

                        </div>
                        <div className="flex justify-center ">
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Télécharger une nouvelle photo</button>
                        </div>
                        <div className="flex justify-center mx-6 border rounded-lg bg-blue-100 items-center p-10 text-gray-400">
                            <center>
                                Télécharger un nouvel avatar. Les images plus grandes seront redimensionnées automatiquement. La taille maximale de téléchargement est de 1 Mo.
                            </center>
                        </div>
                        <div className="mt-2 mb-4 flex justify-center">
                            <p>Membre depuis le</p>
                        </div>
                    </div>
                    <div>
                        <div className="shadow-2xl mx-6 border rounded-lg bg-white items-cente r px-8 pt-8 pb-8">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 ">
                                <div className="text-gray-600">
                                    <p className="font-medium text-lg">Détails personnels</p>
                                    <p>Veuillez remplir vos nouvelles informations.</p>
                                </div>
                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-5">
                                            <label htmlFor="full_name">Nom complet</label>
                                            <input type="text" name="full_name" id="full_name"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" onChange={(e) => setfullName(e.target.value)} />
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="email">Adresse e-mail</label>
                                            <input type="text" name="email" id="email"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className="md:col-span-5">
                                            <label htmlFor="password">Mot de passe</label>
                                            <input type="password" name="password" id="password" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" onChange={(e) => setPassword(e.target.value)}
                                                placeholder="" />
                                        </div>

                                        <div className="md:col-span-3">
                                            <label htmlFor="address">Adresse</label>
                                            <input type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" onChange={(e) => setAddress(e.target.value)}
                                                placeholder="" />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="city">Ville</label>
                                            <input type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" onChange={(e) => setCity(e.target.value)}
                                                placeholder="" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label htmlFor="country">Pays / région</label>
                                            <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                                <input name="country" id="country" placeholder="Pays"
                                                    className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" onChange={(e) => setCountry(e.target.value)} />
                                                <button tabIndex="-1"
                                                    className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                </button>
                                                <button tabIndex="-1" htmlFor="show_more"
                                                    className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="18 15 12 9 6 15"></polyline>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="state">État / province</label>
                                            <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                                <input name="state" id="state" placeholder="État"
                                                    className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" onChange={(e) => setState(e.target.value)} />
                                                <button tabIndex="-1"
                                                    className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                </button>
                                                <button tabIndex="-1" htmlFor="show_more"
                                                    className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="18 15 12 9 6 15"></polyline>
                                                    </svg>
                                                </button>

                                            </div>
                                        </div>

                                        <div className="md:col-span-1">
                                            <label htmlFor="zipcode">Code postal</label>
                                            <input type="text" name="zipcode" id="zipcode"
                                                className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" onChange={(e) => setZipcode(e.target.value)}
                                                placeholder="" />
                                        </div>

                                        <div className="md:col-span-5 grid grid-cols-2">
                                            <div className="inline-flex items-center">
                                                <label htmlFor="male">Homme  :&nbsp;&nbsp;</label>
                                                <input type="checkbox" name="male" className="form-checkbox" onChange={(e) => setBilling(e.target.checked ? 'male' : '')} />
                                            </div>
                                            <div className="inline-flex items-center">
                                                <label htmlFor="billing_same" className="ml-2">Femme :&nbsp;&nbsp;</label>
                                                <input type="checkbox" name="billing_same" className="form-checkbox" onChange={(e) => setBilling(e.target.checked ? 'female' : '')} />
                                            </div>
                                        </div>

                                        <div className="md:col-span-5 text-right">
                                            <div className="inline-flex items-end">
                                                <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Soumettre</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Signup;

