import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateCustomerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState({
    customer_name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      const response = await axios.get(`http://127.0.0.1:5000/customers/${id}`);
      setCustomerData(response.data);
    };

    fetchCustomerDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://127.0.0.1:5000/customers/${id}`, customerData);
    alert('Customer updated successfully!');
    navigate(`/customer/${id}`);
  };

  return (
    <div>
      <h2>Update Customer</h2>
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
        <button type="submit">Update Customer</button>
      </form>
    </div>
  );
};

export default UpdateCustomerForm;
