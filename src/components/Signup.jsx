import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', password: '',email:"" });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { username,email, password } = formData;

    try{

      if (!username || !password ||!username) {
        toast.error('Both fields are required');
        return;
      }

      const response = await axios.post("http://localhost:3000/api/user",
        {username,email,password}

      );
      if(response.data.success)
      {
        toast.success(response.data.message)
        localStorage.setItem("UserName",response.data.username)

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
      console.log("sign user data",response.data)

    }
    catch{
      console.log(error)

    }
  };

  return (
    <div className='flex items-center justify-center h-screen bg-red-100'>
      <form onSubmit={handleSubmit} className=' bg-white p-8 rounded shadow-lg mb-9'>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <h2 className='text-xl font-semibold mb-4 text-center'>Signup</h2>
        
        <div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded mb-2"

        />
        <input
          type="email"
          name="email"
          placeholder="email"
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
          className="w-full px-4 py-2 border rounded mb-2"

        />

        </div>
       
        <button type="submit"   className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Signup</button>
        <span className='text-blacl mt-4'>already have an account ? <Link to='/signup' className='text-white font-bold text-blue-500'>signup</Link> </span>

      </form>
      <ToastContainer/>
    </div>
  );
};

export default Signup;
