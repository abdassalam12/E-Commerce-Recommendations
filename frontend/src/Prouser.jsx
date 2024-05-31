import React, { useState, useEffect } from 'react';
import Product from './Product.jsx';
import Product_detail from './Product_detail.jsx'
import { useNavigate } from "react-router-dom";
import Search from './Search.jsx';
import axios from 'axios';
import Bar from './BAR/Bar.jsx';
import Cluster_detail from './Cluster_detail.jsx';
import Cookies from 'js-cookie';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import Manage from './mange/Manage.jsx';
function Prouser() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reaload, setReload] = useState(1);
    const navigator = useNavigate();

    useEffect(() => {
        setLoading(true);
        const token = Cookies.get('token');
        axios.get(`http://127.0.0.1:8000/api/product_user`, {
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
                setPosts(data)
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);




    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div>
            <Navbar />

            <div className='mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-screen'>
                <Bar />

                <div className='ml-10 mt-10 mb-10 flex justifyCenter itemsCenter'>
                    <h2 className="font-bold text-2xl text-[#002D74]">Vos produits !</h2>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    {posts.map(post => (

                        <Manage key={post.id} post={post} type={''} />
                    ))}
                </div>

            </div>
            <Footer />
        </div>

    );
}


export default Prouser;
