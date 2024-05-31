import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import Navbar from './Navbar';
function Panier() {
    const [prosucts, setProducts] = useState([]);
    const [loading, setLoading] = useState('')
    const [error, setError] = useState('');
    const [conteur, setConteur] = useState(0);
    const [Freight, setFreight] = useState(3.91);
    const [productfocusedIdPlus, setProductfocusedIdPlus] = useState('');
    const [productfocusedIdMoins, setProductfocusedIdMoins] = useState('');
    useEffect(() => {
        setLoading(true);
        const token = Cookies.get('token');
        axios.get('http://127.0.0.1:8000/api/panier', {
            headers: {
                Authorization: `token ${token}`, // Include token in Authorization header
            },
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Failed to fetch data');
                }
                if (response.status == 403) {
                    throw new Error('You are not logged in !!!');
                }
                return response.data;
            })
            .then(data => {
                setProducts(data);
                console.log(prosucts);
                console.log('hello')
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);


        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get('http://127.0.0.1:8000/api/update_panierplus', {
                        params: {
                            productfocusedIdPlus: productfocusedIdPlus, 
                        },
                    });
                    console.log(response.data);
                } catch (error) {
                    console.error('Error updating panier:', error); 
                }
            };

            fetchData(); 
        }, [productfocusedIdPlus]); 
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get('http://127.0.0.1:8000/api/update_paniermoins', {
                        params: {
                            productfocusedIdMoins: productfocusedIdMoins, 
                        },
                    });
                    console.log(response.data);
                } catch (error) {
                    console.error('Error updating panier:', error); 
                }
            };

            fetchData(); 
        }, [productfocusedIdMoins]); 

    console.log(productfocusedIdPlus);
    const calculateFinalPrice = () => {
        let totalPrice = 0;
        prosucts.forEach(product => {
            totalPrice += parseFloat(product.price) * (parseInt(product.quantity) + conteur);
        });
        return totalPrice; 
    };
    const a = calculateFinalPrice()
    const total = a + Freight
    return (
        <div className='mt-12'>
            <Navbar />
            <div className="flex flex-col md:flex-row w-screen h-full  py-7">
                <div className="w-full flex flex-col h-fit gap-4 p-4 ">
                    <p className="text-blue-900 text-xl font-extrabold">My cart</p>
                    <div className="flex flex-col p-4 text-lg font-semibold shadow-md border rounded-sm">

                        <div className="rounded-lg ">
                            {prosucts.map(product => (
                                <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md  sm:flex sm:justify-start">
                                    <img src={product.img_link} alt="product-image" className="w-40  rounded-lg sm:w-20 " />
                                    <div className="lg:ml-4 lg:flex  lg:justify-between sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                        <div className="mt-5 sm:mt-0">
                                            <h2 className="text-lg font-bold text-gray-900">{product.title.substring(0, 20)} ...</h2>
                                            <p className="mt-1 text-xs text-gray-700">{product.availability}</p>
                                        </div>
                                        <div className="mt-0 flex justify-between lg:space-y-6 lg:mt-0 lg:block lg:space-x-6 sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                            <div className="flex items-center border-gray-100">
                                                <span onClick={()=>{setProductfocusedIdMoins(product.id);  setConteur(conteur-1); window.location.reload(); }}  className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                                                    <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={conteur+product.quantity} min="1" />
                                                <span onClick={()=>{setProductfocusedIdPlus(product.id);  setConteur(conteur+1); window.location.reload(); }} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <p className="text-sm">{product.price}00 $</p>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
                <div className="flex flex-col w-full md:w-2/3 h-fit gap-4 p-4">
                    <p className="text-blue-900 text-xl font-extrabold">Purchase Resume</p>
                    <div className="grid grid-rows-5 p-4 gap-4 text-lg font-semibold shadow-md border rounded-lg">

                        <div className="row-span-1 justify-between">
                            <p className="text-gray-600">Subtotal (2 Items)</p>
                            <p className="text-end font-bold">${calculateFinalPrice()}</p>
                        </div>
                        <div className=" bg-gray-200 h-0.5">
                            <div className=" justify-between">
                                <p className="text-gray-600">Freight</p>
                                <div>
                                    <p className="text-end font-bold">{Freight}</p>
                                    <p className="text-gray-600 text-sm font-normal">Arrives on Jul 16</p>
                                </div>
                            </div>
                            <div className=" bg-gray-200 h-0.5">
                                <div className=" justify-between">
                                    <p className="text-gray-600">Discount Coupon</p>
                                    <a className="text-gray-500 text-base underline" href="#">Add</a>
                                </div>
                                <div className="bg-gray-200 h-0.5">
                                    <div className=" justify-between">
                                        <p className="text-gray-600">Total</p>
                                        <div>
                                            <p className="text-end font-bold">{total}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="transition-colors text-sm bg-blue-600 hover:bg-blue-700 p-2 rounded-sm w-full text-white text-hover shadow-md">
                                            FINISH
                                        </button>
                                        <button className="transition-colors text-sm bg-white border border-gray-600 p-2 rounded-sm w-full text-gray-700 text-hover shadow-md">
                                            ADD MORE PRODUCTS
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Panier;
