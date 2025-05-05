import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("finally prinitting the data");
        console.log(formData)

        //server side validTION KR LIYE BHAI

        

    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        formData,
        
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
        
      );

      console.log("Response login user:", response.data); // Check response from backend
      if (response.data.success) {
        console.log("Navigating to dashboard...");
       // Show success toast
       alert(response.data.message)


      // Save user and token in state and localStorage
      setUser(response.data.user);
      localStorage.setItem("loggedInUser", response.data.user.username);
      localStorage.setItem("token", response.data.jwtToken);
      // localStorage.setItem('userId',response.data.user._id); // Save user ID


      // Navigate to the dashboard after a short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);

      }else {
        toast.error(response.data.message || "Failed to log in!");
      }
    } catch (err) {
      console.error("Error:", err.response?.data?.message || err.message);
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
    
  };

  return (
    <div className="flex items-center justify-center h-screen bg-red-100">
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-lg">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
      <div className="mb-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded mb-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Login
      </button>

      <span className='text-black mt-4'>already have an account ? <Link to='/signup' className='text-white font-bold text-blue-500'>signup</Link> </span>

    </form>
    <ToastContainer position="top-right" autoClose={3000}/>
  </div>
  
  );
};

export default Login;
