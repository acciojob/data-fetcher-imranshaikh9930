
import React,{useState,useEffect} from "react";
import './../styles/App.css';

const App = () => {

  const [product, setProduct] = useState([]);
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
            // console.log(data.products);
            setProduct(data.products);
          }
          setLoading(false);
        })
        .catch((err) => {
          setError(`An error occurred: ${err.message}`);
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  return (
    <div id="root">
      <h1>Data Fetched from API</h1>
      {loading && <p>Loading...</p>}
      {error && <p>No data found</p>}
      {product && (
        <div>
          <pre>{JSON.stringify(product, null, 2)}</pre>
        </div>
      )}

    </div>
  );
}

export default App
