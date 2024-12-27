import React, { useEffect, useState } from "react";

const App = () => {
  const [timestamp, setTimestamp] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    // Fetch test-db data
    const fetchTestDb = async () => {
      const testDbUrl = `${process.env.REACT_APP_BACKEND_URL}/test-db`;
      try {
        const res = await fetch(testDbUrl);
        const data = await res.json();
        console.log("Test DB Data:", data);
        setTimestamp(data.timestamp); // ذخیره داده test-db
      } catch (error) {
        console.error("Error fetching test-db:", error);
      }
    };

    // Fetch products data
    const fetchProducts = async () => {
      const productsUrl = `${process.env.REACT_APP_BACKEND_URL}/products`;
      try {
        const res = await fetch(productsUrl);
        const data = await res.json();
        console.log("Products Data:", data);
        setProducts(data); // ذخیره داده products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // Call both functions
    fetchTestDb();
    fetchProducts();
  }, []);

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
      {products ? (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price} (Stock: {product.stock})
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
};

export default App;