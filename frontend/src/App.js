import React, { useState, useEffect } from "react";
import Error from "./components/Error";

const App = () => {
  const [timestamp, setTimestamp] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setError(null); // ریست کردن خطا
    setLoading(true);
    try {
      // درخواست به API تست دیتابیس
      const testDbUrl = `${process.env.REACT_APP_BACKEND_URL}/test-db`;
      const testRes = await fetch(testDbUrl);
      if (!testRes.ok) {
        throw new Error(`Test DB Error: ${testRes.statusText} (${testRes.status})`);
      }
      const testData = await testRes.json();
      setTimestamp(testData.timestamp);

      // درخواست به API محصولات
      const productsUrl = `${process.env.REACT_APP_BACKEND_URL}/products`;
      const productsRes = await fetch(productsUrl);
      if (!productsRes.ok) {
        throw new Error(`Products API Error: ${productsRes.statusText} (${productsRes.status})`);
      }
      const productsData = await productsRes.json();
      setProducts(productsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const closeError = () => {
    setError(null); // بستن خطا
  };

  return (
    <div>
      <h1>Hello, React!</h1>

      {loading && <p>Loading...</p>}

      <h2>Database Timestamp</h2>
      {timestamp ? (
        <p>Timestamp: {timestamp}</p>
      ) : (
        !loading && <p>No timestamp available</p>
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
        !loading && <p>No products found</p>
      )}

      {/* نمایش پیام خطا در صورت وجود */}
      {error && <Error message={error} onClose={closeError} />}
    </div>
  );
};

export default App;
