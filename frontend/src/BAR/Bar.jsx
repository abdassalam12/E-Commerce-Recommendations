import Rightbar from './Rightbar';
import Leftbar from './Leftbar';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Menu from '../Menu';
function Bar() {
    const [inputData, setInputData] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        navigate("/Clustered");
        try {
          const token = Cookies.get('token'); // Retrieve token from cookie
          const response = await axios.get('http://127.0.0.1:8000/api/input', {
            params: {
              name: inputData,
            },
            headers: {
              Authorization: `token ${token}`, // Include token in Authorization header
            },
          });
          console.log(response.data);
          window.location.reload();
    
        } catch (error) {
          console.error('Error:', error);
        }
      };
      const a = 'hidden'
    return (
        <form className="w-container mt-20 mb-6">

            <div className="w-container grid grid-cols-1 lg:grid-cols-4 font-sans">
                <div className="hidden lg:block"></div>

                <div className="w-container  flex lg:col-span-2">
                    <div className=" hidden sm:block">
                        <Leftbar />
                    </div>
                    <div className="w-container grid grid-cols-11 h-12">

                        <div className="col-span-10  border border-black rounded-md">
                            <input onChange={(e) => setInputData(e.target.value)} name="input" className="w-full h-full border-none outline-none px-4" type="text" placeholder="Entrer un Titre" />
                        </div>
                        <div>
                            <button onClick={handleSubmit} type="submit" className="w-full h-full px-4 py-2 bg-black text-white border border-black rounded-none hover:bg-gray-800 flex items-center justify-center">
                                <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </div>
                    <div className="ml-7 hidden lg:block">
                        <Rightbar />
                    </div>
                </div>
                <div className="hidden lg:block">

                </div>
            </div>

        </form>
    );
}

export default Bar;
