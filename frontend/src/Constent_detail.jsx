import React from 'react';
import { useState, useEffect } from 'react'
import { useSearchParams, useParams } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'js-cookie';
import Navbar from './Navbar';
import Footer from './Footer';
function Constent_detail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submit, setSubmit] = useState(true)
    const currentUrl = window.location.href;

    const success =[]

    const handleSubmit = async (e) => {

        e.preventDefault(); // Prevent the default form submission behavior

        try {
            success.push(
                <div class="flex w-96 shadow-lg rounded-lg">
                    <div class="bg-green-600 py-4 px-6 rounded-l-lg flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="text-white fill-current" viewBox="0 0 16 16" width="20" height="20"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>
                    </div>
                    <div class="px-4 py-6 bg-white rounded-r-lg flex justify-between items-center w-full border border-l-transparent border-gray-200">
                        <div>Success alert</div>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-gray-700" viewBox="0 0 16 16" width="20" height="20"><path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path></svg>
                        </button>
                    </div>
                </div>
                    ) 
            const token = Cookies.get('token'); // Retrieve token from cookie
            const response = await axios.post('http://127.0.0.1:8000/api/add_panier', {
                title: product.title,
                id: 'hala',
            }, {
                headers: {
                    Authorization: `Token ${token}`, // Include token in Authorization header
                },
            });
            console.log(response.data);
 
        
        } catch (error) {
                        console.error('Error:', error);
        }

      };
    useEffect(() => {
                        setLoading(true);
                    axios.get(`http://127.0.0.1:8000/api/constpro/${id}`)
            .then(response => {
                        setProduct(response.data);
                    setLoading(false);
            })
            .catch(error => {
                        setError(error.message);
                    setLoading(false);
            });
    }, [id]);

    useEffect(() => {
            if (!product) return; // Ensure product is loaded before making the request
                    const token = Cookies.get('token');

                    // First request
                    axios.get(`http://127.0.0.1:8000/api/history`, {
                        params: {
                        name: product.title,
                },
                    headers: {
                        Authorization: `token ${token}`,
                },
            })
            .then(response => {
                        console.log(response.data);

                    // Chain the second request inside the first request's .then() block
                    return axios.get(`http://127.0.0.1:8000/api/content_based`, {
                        params: {
                        name: product.title,
                    },
                    headers: {
                        Authorization: `token ${token}`,
                    },
                });
            })
            .then(response => {
                        console.log(response.data); // Handle the response of the second request
            })
            .catch(error => {
                        setError(error.message);
            });


    }, [product]);

                    if (loading) {
        return <div>Loading...</div>;
    }

                    if (error) {
        return <div>Error: {error}</div>;
    }

                    if (!product) {
        return <div>No product found</div>;
    }

                    // Extracting properties from the product
                    const {title, img_link, price, rating, reviews, availability, description} = product;



                    let rate = rating;
                    const integerPart = Math.floor(rate);
                    const fractionalPart = rate - integerPart;
                    console.log("Integer part:", integerPart);

                    console.log("Fractional part:", fractionalPart);



                    return (
                    <div className=" bg-gray-100 dark:bg-gray-800 py-8 mt-14">
                        <Navbar />
                        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
                        <div className="min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" >
                            <div className="flex flex-col md:flex-row -mx-4">
                                <div className="md:flex-1 px-4">
                                    <div className="h-460px rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                        <img src={img_link} className="w-full h-full object-cover" alt="Product Image" />
                                    </div>
                                </div>
                                <div className="md:flex-1 px-4">
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{title}</h2>
                                    <br />
                                    <div className="mr-4">
                                        <span className="font-bold text-gray-700 dark:text-gray-300 mr-3">Reviews&nbsp;:</span>
                                        <span className="text-gray-600 dark:text-gray-300 mr-4">{reviews}</span>
                                    </div>

                                    <div className=" mb-2">
                                        <div className="mr-4">
                                            <span className="font-bold text-gray-700 dark:text-gray-300 mr-3">Price:</span>
                                            <span className="text-gray-600 dark:text-gray-300 mr-4 text-xl ">{price}&nbsp;$</span>
                                        </div>
                                        <br />
                                        <div>
                                            <span className="font-bold text-gray-700 dark:text-gray-300">Availability : </span>
                                            <span className="text-gray-600 dark:text-gray-300">{availability}</span>
                                        </div>
                                    </div>
                                    <div className="star-ratings-css-bottom">
                                        {[...Array(5)].map((_, index) => (
                                            <span key={index} style={{ color: index < integerPart ? "rgb(255, 247, 0)" : "" }}>★</span>
                                        ))}
                                    </div>
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                        {description}
                                    </p>
                                    <div className="flex -mx-2 mb-4 mt-10">
                                        <div className="w-1/2 px-2">
                                            <button onClick={handleSubmit} className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Add to Cart</button>
                                        </div>
                                        <div className="w-1/2 px-2">
                                            <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Add to Wishlist</button>
                                        </div>
                                    </div>
                                    {success}
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                    );
}

export default Constent_detail;
