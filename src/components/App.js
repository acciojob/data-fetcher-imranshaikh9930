
import React,{useState,useEffect} from "react";
import './../styles/App.css';

const App = () => {

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Fetch data when the component mounts for the first time
  useEffect(() => {
    const fetchData = () => {
      fetch('https://dummyjson.com/products')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          return response.json();
        })
        .then((data) => {
          if (data && data.products) {
            console.log(data.products);
            setProduct(data.products);
          }
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {product && (
        <div>
          <pre>{JSON.stringify(product, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App
