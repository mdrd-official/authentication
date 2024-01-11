import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/users/login",
        data
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error submitting login form:", error);
    }
  };

  return (
    <div className="container mt-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto"
        style={{ maxWidth: "40%" }}
      >
        <h2 className="text-center mb-4">Login Form</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="form-control"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="form-control"
            placeholder="Enter your password"
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
        <div className="text-center mt-3">
          <small>
            Don't have an account? <Link to="/signup">Signup</Link>
          </small>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
