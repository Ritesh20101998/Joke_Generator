import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [keyword, setKeyword] = useState('');
  const [joke, setJoke] = useState('');

  const getJoke = async () => {
    try {
      const response = await axios.post('http://localhost:3001/get-joke', { keyword });
      setJoke(response.data.joke);
    } catch (error) {
      console.error('Error fetching joke:', error.message);
      setJoke('Failed to fetch joke. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Joke App</h1>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter a keyword"
      />
      <button onClick={getJoke}>Get Joke</button>
      <p className='joke-container'>{joke}</p>
    </div>
  );
}

export default App;
