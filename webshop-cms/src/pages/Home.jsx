import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:7777/api/products/');
        const data = await res.json();
        setProducts(data);
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='product-container'>
      {products.map(product => (
        <div className='products' key={product._id}>
          <img className='product-img' src={product.imageURL} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.price} kr</p>
          <Link className='link-details' to={`/products/${product._id}`}>Details</Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
