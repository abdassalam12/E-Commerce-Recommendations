// Importing the socket.io-client library
import { useState,useEffect } from 'react';
import io from 'socket.io-client';
import Chata from './Chata';
import './App.css';
import axios from "axios";
import Cookies from "js-cookie";
// Connecting to the server
const socket = io.connect("http://localhost:3001");

// React component
const Appa = () => {
    const [username,setUsername] = useState("")
    const [room,setRoom] = useState("")
    const [users, setUsers] = useState([]); 
    
    const  handleDataFromChild  = async (data) => {
        const sortedUsernames = [data, username].sort();
        const roomID = sortedUsernames.join('_');
        setRoom(roomID);
        
        console.log("this the data from child : ",roomID) };
        
        useEffect(()=>{
            joinRoom();
        },[room])
        

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("hi");
                const response = await axios.post('http://127.0.0.1:8000/api/get_users');
                setUsers(response.data[0]);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
    
        fetchData();
        const fet = async () => {
            const token = Cookies.get('token'); // Retrieve token from cookie
            
            const responses = await axios.get('http://127.0.0.1:8000/api/test_token', {
                headers: {
                    Authorization: `token ${token}`, // Include token in Authorization header
                },
            });
            setUsername(responses.data)
        }
        fet();
    }, []);

    const joinRoom = () =>{
        if (username !== "" && room !== "") {
            socket.emit("join_room", room);
          }
    }
    return (
        <div>
            <Chata socket={socket} username={username} room={room} users={users}  onData={handleDataFromChild} />     
        </div>
    );
};

export default Appa;
