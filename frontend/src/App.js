import React, { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // اطمینان از اینکه URL به درستی مقداردهی شده است
    const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/test-db`;

    console.log('REACT_APP_BACKEND_URL:', process.env.REACT_APP_BACKEND_URL);
    console.log('Fetching data from:', `${process.env.REACT_APP_BACKEND_URL}/test-db`);

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setData(data))
      .catch((error) => {
        console.error('Error fetching data:', error);
        setData({ error: error.message });
      });
  }, []);

  return (
    <div>
      <h1>Hello, React!</h1>

      {data?.error ? (
        <p style={{ color: 'red' }}>Error: {data.error}</p>
      ) : data ? (
        <p>Database Timestamp: {data.timestamp}</p>
      ) : (
        <p>Loading...</p>
      )}

    </div>
  );
};

export default App;
