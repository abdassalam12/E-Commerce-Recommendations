import React, { useState, useEffect } from 'react';
import './Each.css';
import Product_detail from './Product_detail.jsx'
// Import Tailwind CSS file
import Search from './Search.jsx';
import Product from './Product.jsx';
import axios from 'axios';
import Bar from './BAR/Bar.jsx';
import Cookies from 'js-cookie';
import Menu from './Menu.jsx';
import Move from './move/Move.jsx';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';

function Each() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState();
  const [list, setList] = useState(false);
  const [Recommended_prosucts, setProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    const token = Cookies.get('token');
    axios.get('http://127.0.0.1:8000/api/Recommended_for_you', {
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

        console.log('hello')
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);
  console.log(Recommended_prosucts);
  useEffect(() => {
    setLoading(true);
    const token = Cookies.get('token');
    axios.get(`http://127.0.0.1:8000/api/posts/?page=${currentPage}`, {
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
        setPosts(data.results);
        setTotalPages(data.results.length);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [currentPage]);
  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const a = 'm-20 transform transition-all hover:translate-x-10 '
  const b = 'hidden ';

  const handleClck = () => {
    setList(true);
  }
  const handleDataFromChild = (data) => {
    setList(data);
  };


  // console.log(response.data);
  // const { token } = response.data;
  // Save token in a cookie
  // Cookies.set('token', token, { expires: 15});
  // navigate('/product')
  // Handle successful login
  const allbuttons = [];
  for (let i = 1; i <= totalPages; i++) [
    allbuttons.push(
      <li key={i} >
        <a onClick={(e) => { e.preventDefault(); setCurrentPage(i); }} href="#pablo" className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500">
          {i}
        </a>
      </li>)
  ]

  return (
    <div className='grid '  >
    <div className='min-h-screen'>
      <div >
        <Navbar list={list} sendDataToParent={handleDataFromChild} />
      </div>
      <div onClick={handleClck} className=' mt-64 sm:mt-40 lg:mt-0 md:mt-0'>
        <div className='row-span-3 '>
          <div>

          </div>
          <div>
            <Bar />
          </div>
          <div>

          </div>

        </div>
        <div className='move row-span-2'>
          <Move />
        </div>

      </div>
      <div className='   w-12/12 '>
        <h2 className="pt-10 pb-10 pl-10 font-bold text-2xl text-[#002D74]">Produits les plus populaires !</h2>
      </div>
      <div className='bg-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-4 pl-4 pr-4'>
        {posts.map(post => (
          <Product key={post.id} post={post} type={'product'} />
        ))}
      </div>
      <div className='   w-12/12 '>
        <h2 className="pt-10 pb-10 pl-10 font-bold text-2xl text-[#002D74]">Recommandé pour vous !</h2>
      </div>
      <div className='bg-gray-100 mt-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-6 pl-4 pr-4'>
        {Recommended_prosucts.map(post => (
          <Product key={post.product_id} post={post} type={'rec'} />
        ))}
      </div>
      <div>
        <div className="grid grid-cols-3 py-2">
          <div>

          </div>
          <div className='flex justify-center'>
            <nav className="block">
              <ul className="flex pl-0 rounded list-none flex-wrap">
                <li>
                  <a href="#pablo" className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500">
                    <i className="fas fa-chevron-left -ml-px"></i>
                  </a>
                </li>
                {allbuttons}
                <li>
                  <a href="#pablo" className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500">
                    <i className="fas fa-chevron-right -mr-px"></i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div>

          </div>

        </div>
        <div className='grid grid-cols-3'>
          <div>

          </div>
          <div className='flex justify-center'>
            <button className='bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium mr-5' disabled={currentPage === 1} onClick={handlePrevPage}>Précédent</button>
            <button className='bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium l-5' onClick={handleNextPage}>Suivant</button>
          </div>
          <div>

          </div>

        </div>

      </div>
      </div>

      <div>
        <div>
          <Footer />
        </div>
      </div>

    </div>
  );
}


export default Each;
