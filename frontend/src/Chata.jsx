import React from "react";
import User from "./User";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRef } from 'react';
import Menu from './Menu.jsx'

function Chata({ socket, username, room, users, onData  }) {
    const [currentmessage, setCurrentMessage] = useState("")
    const [messagelist, setMessageList] = useState([])
    const [destination, setDestination] = useState("")
    const [res, setRes] = useState('')
    const scrollRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messagelist]);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView();
            setCurrentMessage("");
        }
    };


    useEffect(() => {
        const getMessage = async () => {
            const response = await axios.post('http://localhost:8000/api/get_message', {
                destination,
                username,
            })
            setRes(response.data[0]);
        };
        getMessage();
    }, [destination, username]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (currentmessage !== "") {
            const messageData = {
                room: room,
                author: username,
                destination: destination,
                message: currentmessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            console.log(messageData)// Potential error here
        }

        if (currentmessage != '') {
            const message = currentmessage
            const response = await axios.post('http://127.0.0.1:8000/api/messageAPIView', {
                destination,
                username,
                message
            },
                {
                    headers: { 'Content-Type': 'application/json' }
                });

           
        }

    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
            setMessageList((list) => [...list, data]);
        });


    }, [socket]);


    useEffect(() => {
        if (destination !== null) {
            sendDataToParent();
        }
    }, [destination]);

    const handleUsernameClick = (username) => {
        console.log('Selected username:', username);
        setDestination(username);
    };

    const sendDataToParent = () => {
        const data = destination;
        onData(data);
    };
    const userElements = [];
    for (let i = 0; i < users.length; i++) {
        userElements.push(
            <div key={i} >
                <User username={users[i].username} lastmessage={'hello'} onUsernameClick={handleUsernameClick} />
                <div></div>
            </div>
        );
    }
    const all = res;
    const messageElements = [];
    for (let i = 0; i < all.length; i++) {

        const message = all[i];
        if (message.username == username) {
            messageElements.push(
                <div key={message.id} className="col-start-1 col-end-8 p-3 rounded-lg">
                    <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            {message.username.charAt(0)} {/* Display the first character of the username */}
                        </div>
                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                            <div>
                                {message.message}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        if (message.username == destination) {
            messageElements.push(
                <div key={i} className="col-start-6 col-end-13 p-3 rounded-lg">
                    <div className="flex items-center justify-start flex-row-reverse">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            {message.username.charAt(0)}
                        </div>
                        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                            <div>
                                {message.message}
                            </div>
                            <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
                                Seen
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
    const [dark,setdark] = useState(false);
    const [backgraound,setBackgraound] = useState('bg-white')
    const handleDataFromChild = (data) => {
        setdark(data);
        if(data==false){
            setBackgraound('bg-black')
        }else {
            setBackgraound('bg-white')
        }
        
        console.log(data)      };

    return (
        <form onSubmit={sendMessage}>
            <div className="flex flex-row h-screen antialiased text-gray-800 dark:bg-slate-800">
                <div className="flex flex-row w-96 flex-shrink-0 bg-gray-100 p-4">
                    {/* 1s bar */}
                         <Menu sendDataToParent={handleDataFromChild} />
                    {/* 1s bar */}
                    {/* 2nd bar */}
                    <div className="flex flex-col w-full h-full pl-4 pr-4 py-4 -mr-4">
                        <div className="flex flex-row items-center">
                            <div className="flex flex-row items-center">
                                <div className="text-xl font-semibold">Messages</div>
                                <div className="flex items-center justify-center ml-2 text-xs h-5 w-5 text-white bg-red-500 rounded-full font-medium">5</div>
                            </div>
                            {/* search */}
                            <div className="ml-auto">
                                <button className="flex items-center justify-center h-7 w-7 bg-gray-200 text-gray-500 rounded-full"><svg className="w-4 h-4 stroke-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
                            </div>
                            {/* search */}                   </div>

                        <div className="mt-5">
                            <div className="text-xs text-gray-400 font-semibold uppercase"></div>
                        </div>
                        <div className="mt-4">
                            {userElements}
                        </div>
                        <div className="h-full overflow-hidden relative pt-2">
                            {/* plus sign */}
                            <div className="absolute bottom-0 right-0 mr-2">
                                <button className="flex items-center justify-center shadow-sm h-10 w-10 bg-red-500 text-white rounded-full"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg></button>
                            </div>
                            {/* plus sign */}
                        </div>
                    </div>
                    {/* 2nd bar */}
                </div>
                <div className={`flex flex-col h-full w-full ${backgraound} px-4 py-6`}>
                    {/* top profile photo */}
                    <div className="flex flex-row items-center py-4 px-6 rounded-2xl shadow">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-100">
                            {username.charAt(0)}
                        </div>
                        <div className="flex flex-col ml-3">
                            <div className="font-semibold text-sm">{username}</div>
                            <div className="text-xs text-gray-500">Active</div>
                        </div>
                        <div className="ml-auto">
                            <ul className="flex flex-row items-center space-x-2">
                                <li>
                                    <a href="#" className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-400 h-10 w-10 rounded-full"><span><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg></span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* top profile photo */}
                    <div className="h-full overflow-hidden py-4">
                        <div className="h-full overflow-y-auto">
                            <div className="grid grid-cols-12 gap-y-2">
                                {messageElements}

                                {messagelist.map((message) => {
                                    if (message.author === username) {
                                        return (
                                            <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                                <div className="flex flex-row items-center">
                                                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                        {message.author.charAt(0)} {/* Add null check */}
                                                    </div>
                                                    <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                        <div>{message.message}</div>
                                                        <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
                                                            {message.time}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        );
                                    } else if (message.author === destination) {
                                        return (
                                            <div className="col-start-6 col-end-13 p-3 rounded-lg">
                                                <div className="flex items-center justify-start flex-row-reverse">
                                                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                        {message.author.charAt(0)} {/* Add null check */}
                                                    </div>
                                                    <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                                        <div>{message.message}</div>
                                                        <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
                                                            {message.time}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        return null; // Render nothing if the conditions don't match
                                    }
                                })}

                            </div>
                            <div ref={scrollRef} ></div>
                        </div>
                    </div>
                    {/* textarea messages */}
                    <div className="flex flex-row items-center">
                        <div className="flex flex-row items-center w-full border rounded-3xl h-12 px-2">
                            <button className="flex items-center justify-center h-10 w-10 text-gray-400 ml-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg></button>
                            <div className="w-full">
                                <input value={currentmessage} onChange={(e) => setCurrentMessage(e.target.value)} type="text" className="border border-transparent w-full focus:outline-none text-sm h-10 flex items-center" placeholder="Écrire ton message...." />
                            </div>
                            <div className="flex flex-row">
                                <button className="flex items-center justify-center h-10 w-8 text-gray-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg></button>
                                <button className="flex items-center justify-center h-10 w-8 text-gray-400 ml-1 mr-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></button>
                            </div>
                        </div>
                        <div className="ml-6">
                            <button onClick={sendMessage} className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300  text-white"  ><svg className="w-5 h-5 transform rotate-90 -mr-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg></button>
                        </div>
                    </div>
                    {/* textarea messages */}
                </div>
            </div>
        </form>
    )
}
export default Chata;


