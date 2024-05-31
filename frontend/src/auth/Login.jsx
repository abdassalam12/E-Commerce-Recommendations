import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });
     const navigate = useNavigate();
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:8000/api/login', formData);
          console.log(response.data);
          const { token } = response.data;
          // Sauvegarder le jeton dans un cookie
          Cookies.set('token', token, { expires: 15});
          navigate('/product')
          // Gérer la connexion réussie
        } catch (error) {
          console.error('Erreur lors de la connexion :', error);
          // Gérer l'erreur de connexion
        }
      };
    return (
        <div   >
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
            <div className="  mx-auto mt-20 bg-gray-100 flex rounded-2xl  shadow-lg max-w-4xl p-5 items-center ">
                <div className="md:w-1/2 px-8 md:px-16 
                ">
                    <h2 className="font-bold text-2xl text-[#002D74]">Connexion</h2>
                    <p className="text-xs mt-4 text-[#002D74]">Si vous êtes déjà membre, connectez-vous facilement</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input className="p-2 mt-8 rounded-xl border" type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Nom d'utilisateur" />
                        <div className="relative">
                        <input className="p-2 rounded-xl border w-full" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Mot de passe" />
                        </div>
                        <div className="flex justify-center ">
                            <button type="submit" className="px-24 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Connexion</button>
                        </div>
                    </form>

                    <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                        <hr className="border-gray-400" />
                        <p className="text-center text-sm">OU</p>
                        <hr className="border-gray-400" />
                    </div>

                    <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
                        <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                        </svg>
                        Connexion avec Google
                    </button>

                    <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
                        <a href="#">Mot de passe oublié ?</a>
                    </div>

                    <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                        <p>Vous n'avez pas de compte ?</p>
                        <button onClick={() => { navigate("/inscription") }} className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">S'inscrire</button>
                    </div>
                </div>

                <div className="md:block hidden w-1/2 ">
                    <img className="rounded-2xl" src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" alt="Connexion" />
                </div>
            </div>
        </div>
    );
}

export default Login;
