import React, { useState, useEffect } from "react";
import Error from "./components/Error";

const App = () => {
  const [timestamp, setTimestamp] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestDb = async () => {
      const testDbUrl = `${process.env.REACT_APP_BACKEND_URL}/test-db`;
      try {
        const res = await fetch(testDbUrl);
        if (!res.ok) {
          throw new Error(`Test DB Error: ${res.statusText} (${res.status})`);
        }
        const data = await res.json();
        setTimestamp(data.timestamp);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchProducts = async () => {
      const productsUrl = `${process.env.REACT_APP_BACKEND_URL}/products`;
      try {
        const res = await fetch(productsUrl);
        if (!res.ok) {
          throw new Error(`Products API Error: ${res.statusText} (${res.status})`);
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTestDb();
    fetchProducts();
  }, []);

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div>
      <h1>Hello, React!</h1>

      <h2>Database Timestamp</h2>
      {timestamp ? (
        <p>Timestamp: {timestamp}</p>
      ) : (
        <p>Loading timestamp...</p>
      )}

      <h2>Products</h2>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price} (Stock: {product.stock})
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default App;