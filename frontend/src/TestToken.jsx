import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function TestToken() {
  const [response, setResponse] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('token'); // Retrieve token from cookie
        const config = {
          headers: {
            Authorization: `token ${token}`, // Include token in Authorization header
          },
        };
        const res = await axios.get('http://localhost:8000/api/test_token', config);
        setResponse(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setResponse('Error');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Test Token Response:</h2>
      <p>{response}</p>
    </div>
  );
}

export default TestToken;
