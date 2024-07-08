import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrderForm = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomersAndProducts = async () => {
      const customersResponse = await axios.get('http://127.0.0.1:5000/customers');
      const productsResponse = await axios.get('http://127.0.0.1:5000/products');
      setCustomers(customersResponse.data);
      setProducts(productsResponse.data);
    };

    fetchCustomersAndProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      customer_id: selectedCustomer,
      items: selectedProducts,
    };
    await axios.post('http://127.0.0.1:5000/orders', orderData);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div>
      <h2>Place New Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="customer">Select Customer:</label>
          <select
            id="customer"
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            required
          >
            <option value="">--Select Customer--</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.customer_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="products">Select Products:</label>
          <select
            id="products"
            multiple
            value={selectedProducts}
            onChange={(e) =>
              setSelectedProducts([...e.target.selectedOptions].map((o) => o.value))
            }
            required
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.product_name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">place order</button>
      </form>
    </div>
  );
};

export default PlaceOrderForm;
