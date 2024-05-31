import React from 'react'; 
import { useState, useEffect } from 'react'
import { useSearchParams,useParams,useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import Appa from './Appa';
function Product_detail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const currentUrl = window.location.href;
    console.log(currentUrl);
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
      
        try {
          const token = Cookies.get('token'); // Retrieve token from cookie
          const response = await axios.post('http://127.0.0.1:8000/api/add_panier', {
            id: id,
          }, {
            headers: {
              Authorization: `Token ${token}`, // Include token in Authorization header
            },
          });
          console.log(response.data);
          window.location.reload(); // Reload the page after adding the product to the panier
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
    useEffect(() => {
        setLoading(true);
        fetch(`http://127.0.0.1:8000/api/products/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>No product found</div>;
    }
    const {title, img_link, price, rating, reviews, availability,description,user} = product;
    let rate = rating;
    const integerPart = Math.floor(rate); 
    const fractionalPart = rate - integerPart; 
    console.log("Integer part:", integerPart); 

    console.log("Fractional part:", fractionalPart);
   function redirectToMessage(){
    
    navigate("/appa"); 
}


    return (
        <div className=" bg-gray-100 dark:bg-gray-800 py-8 grid-rows-3">
            
            <div>
            <Navbar />
            </div>
            
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
            <div className="mt-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className=" rounded-lg bg-gray-300 dark:bg-gray-700 mb-4 ">
                            <img src={img_link} className="w-full"  alt="Product Image" />
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
                                <button onClick={redirectToMessage} className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Cantacter le vendeur</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                    <Footer />
            </div>

            
        </div>
    );
}

export default Product_detail;
