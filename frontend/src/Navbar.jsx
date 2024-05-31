import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import Bar from "./BAR/Bar";
import './Navbar.css'
function Navbar({ list , sendDataToParent }) {
    const [liste,setList] = useState();
    const navigate = useNavigate()
    const [cssforimg,setCssforimg] = useState('choix absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none');
    function handlephotoClck(){
       setCssforimg('choixactive absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none');
    }
    function handlephotoSkip(){
        setCssforimg('choix absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none');
     }

     useEffect(()=>{
        if(list==true){
            setCssforimg('choix absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none');
            setList(false)
            sendDataToParent(liste);
         }
         
     },)

     const handleSubmit = async (e) => {
        e.preventDefault();
        const token = Cookies.get('token');
          const response = await axios.get('http://localhost:8000/api/logout', {
            headers: {
              Authorization: `token ${token}`, // Include token in Authorization header
            },
          })
          navigate('/login')
        }
    return (

<nav className="bg-gray-800 mb-4 fixed top-0 left-0 w-full z-10">

  <div  className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div className="relative flex h-16 items-center justify-between">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span className="absolute -inset-0.5"></span>
          <span className="sr-only">Ouvrir le menu principal</span>
          <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div onClick={handlephotoSkip}  className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

        <div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-4">
            <a  onClick={() => { navigate("/product") }} href="#" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Accueil</a>
            <a  onClick={() => { navigate("/appa") }} href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Message</a>
            <a  onClick={() => { navigate("/add") }}  href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Ajouter un produit</a>
            <a  onClick={() => { navigate("/prouser") }}  href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Gérer les produits</a>
            <a  onClick={() => { navigate("/panier") }}  href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Panier</a>
          </div>
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">View notifications</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
        </button>
        
        <div className="relative ml-3">
            
          <div>
            <button onClick={handlephotoClck} type="button" className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800' id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">Open user menu</span>
              <img className="h-10 w-10 rounded-full" src="https://firebasestorage.googleapis.com/v0/b/fire-images-65561.appspot.com/o/files%2F300964491_478162217655657_5384945088360242617_n.png?alt=media&token=3d4db193-3ec8-4c2f-af42-b1323a13964b" alt="" />
            </button>
          </div>
          
          <div className={cssforimg} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1" >
            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Votre profil</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Paramètres</a>
            <a onClick={handleSubmit} href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Se déconnecter</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div  onClick={handlephotoSkip}  className="sm:hidden" id="mobile-menu">
    
    <div onClick={handlephotoSkip}  className="space-y-1 px-2 pb-3 pt-2">

      <a onClick={() => { navigate("/product") }} href="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Accueil</a>
      <a onClick={() => { navigate("/appa") }}  href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Message</a>
      <a onClick={() => { navigate("/add") }}  href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Ajouter un produit</a>
      <a  onClick={() => { navigate("/prouser") }}  href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Gérer les produits</a>
      <a onClick={() => { navigate("/panier") }} href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Panier</a>
    </div>
   
  </div>

</nav>
    );
}

export default Navbar;





