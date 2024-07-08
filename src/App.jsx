import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerForm from './CustomerForm';
import CustomerDetails from './CustomerDetails';
import UpdateProductForm from './UpdateProductForm';
import UpdateCustomerForm from './UpdateCustomerForm';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import PlaceOrderForm from './PlaceOrderForm';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Customer Management App</h1>
        <Routes>
          <Route path="/customer/add" element={<CustomerForm />} />
          <Route path="/customer/:id" element={<CustomerDetails />} />
          <Route path="/products/:id/update" element={<UpdateProductForm />} />
          <Route path="/update-customer/:id" element={<UpdateCustomerForm />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/add" element={<ProductForm />} />
          <Route path="/place-order" element={<PlaceOrderForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
