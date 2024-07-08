import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateProductForm = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({ product_name: '', price: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`http://127.0.0.1:5000/products/${id}`);
      setProduct(response.data);
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://127.0.0.1:5000/products/${id}`, product);
    setMessage('Product updated successfully!');
  };

  if (!id) {
    return <div>No product ID provided.</div>;
  }

  return (
    <div>
      <h2>Update Product</h2>
      {message && <div>{message}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Product Name:
            <input
              type="text"
              name="product_name"
              value={product.product_name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProductForm;
