import React from 'react';

const Error = ({ message }) => {
  return (
    <div style={{ color: 'red', marginTop: '20px' }}>
      <h3>Error</h3>
      <p>{message}</p>
    </div>
  );
};

export default Error;