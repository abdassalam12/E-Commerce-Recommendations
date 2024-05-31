import { Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './auth/Login.jsx';
import Signup from './auth/Signup.jsx'; // Assuming Login.js is in the same directory
import TestToken from './TestToken';
import ProductDetail from './Product_detail.jsx';
import Each from './Each.jsx';
import Clustered from './Clustered.jsx'
import Cluster_detail from './Cluster_detail.jsx';
import Addproduct from './Addproduct.jsx';

function User({ username, lastmessage, onUsernameClick }) {
    return (
        <div onClick={() => onUsernameClick(username)} className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
            <div className=" flex flex-col ">
                <div className="flex flex-row items-center p-4 hover:bg-gradient-to-r hover:from-red-100 hover:to-transparent border-l-2 hover:border-red-500">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full  bg-pink-500 text-pink-300 font-bold flex-shrink-0">
                        {username.charAt(0)}
                    </div>
                    <div className="flex flex-col flex-grow ml-3">
                        <div className="flex items-center">
                            <div className="text-sm font-medium">{username}</div>
                            <div className="h-2 w-2 rounded-full bg-green-500 ml-2"></div>
                        </div>
                        <div className="text-xs truncate w-40">{lastmessage}</div>
                    </div>
                    <div className="flex-shrink-0 ml-2 self-end mb-1">
                        <span className="flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full">5</span>
                    </div>
                </div>
                <br />
            </div>
        </div>
    );
}

export default User;





