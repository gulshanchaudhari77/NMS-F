import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import MapComponent from "./components/MapComponent";
import Home from "./components/Home";
import ProtecteRoute from "./components/ProtecteRoute";
import Navbar from "./components/Navbar";
import OpenRoute from "./components/OpenRoute";
import { io } from "socket.io-client";
import axios from "axios";
import AlertNotification from "./components/AlertNotification";
import { AlertProvider } from "./components/usecontext/AlertContext";
import NotificationDetails from "./components/NotificationDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const baseUrl = "http://localhost:3000/api/login/user";
  const [user, setUser] = useState(null);
  const token = window.localStorage.getItem("token");
  console.log("User data in app ", user);
  console.log("Token in app ", token);
  const navigate = useNavigate();

  const isLoggenIn = window.localStorage.getItem("loggedInUser");

  const getUserData = async () => {
    try { 
      const response = await axios.post(baseUrl, {token});
  
      console.log("response in app bvcvsdvsd ", response?.data?.userData);
      setUser(response?.data?.userData);
    }catch(error) {
      console.log("error" , error);
    }
    
  };

  useEffect(() => {
    if (token) {
      getUserData();
    }
    else 
        navigate("/login")
  }, [token]);

  return (
    <>
      <AlertProvider>
        <ToastContainer />

        <Header user={user} setUser={setUser} />

        <Routes>
          <Route element={<ProtecteRoute />}>
            {/* <Route path="/" element={user ? <Dashboard user={user} /> : <login setUser={setUser} />} />  */}
            <Route path="/dashboard" element={<Dashboard user={user} />} />
          </Route>
          <Route element={<ProtecteRoute />}>
            <Route
              path="/notifications/:id"
              element={<NotificationDetails user={user} />}
            />
          </Route>

          {/* <Route element={<OpenRoute/>}> */}
          <Route
            path="/signup"
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
          />
          <Route
            path="/login"
            element={
              <OpenRoute>
                <Login setUser={setUser} user={user} />
              </OpenRoute>
            }
          />
          {/* </Route> */}
        </Routes>
      </AlertProvider>
    </>
  );
};

export default App;
