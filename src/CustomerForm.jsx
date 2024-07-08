import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CustomerForm = () => {
  const [customerData, setCustomerData] = React.useState({
    customer_name: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post('http://localhost:5000/customers', customerData);
    alert('Customer added successfully!');
    setCustomerData({
      customer_name: '',
      email: '',
      phone: ''
    });
  };

  return (
    <div>
      <h2>Add New Customer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="customer_name">Name:</label>
          <input
            type="text"
            id="customer_name"
            name="customer_name"
            value={customerData.customer_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={customerData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={customerData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Customer</button>
      </form>
      <div>
        <Link to="/customer/add">Add New Customer</Link>
      </div>
    </div>
  );
};

export default CustomerForm;
