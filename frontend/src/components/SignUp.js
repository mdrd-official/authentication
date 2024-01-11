import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await axios.post('http://localhost:3001/users/register', data);
      alert(response.data.message);
      navigate('/login');
    } catch (error) {
      
      console.error('Error submitting form:', error);
    }
  };


  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto" style={{ maxWidth: '40%' }}>
        <h2 className="text-center mb-4">SignUp Form</h2> 
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="test"
            {...register('username', { required: true })}
            className="form-control"
            placeholder="Enter your Username"
            name='username'
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="form-control"
            placeholder="Enter your email"
            name="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            {...register('password', { required: true })}
            className="form-control"
            placeholder="Enter your password"
            name="password"
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Signup
          </button>
        </div>
        <div className="text-center mt-3">
          <small>
            Already have an account? <Link to="/login">Login</Link>
          </small>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
