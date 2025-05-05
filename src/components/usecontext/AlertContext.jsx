import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

// Create the context
const AlertContext = createContext();

// AlertProvider Component: This will wrap your app and provide context to all children
export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);
  const [alertCount, setAlertCount] = useState(0); // This will track the number of alerts

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/sendAlert/data");
        const fetchedAlerts = response?.data?.data || [];
        setAlerts(fetchedAlerts);
        setAlertCount(fetchedAlerts.length); // Update the alert count
      } catch (err) {
        console.error("Error fetching alerts:", err.message);
      }
    };

    fetchAlerts();

    // Socket listener for new alerts
    const socket = io("http://localhost:3000");
    socket.on("new-alert", (alertData) => {
      setAlerts((prevAlerts) => {
        const updatedAlerts = [...prevAlerts, alertData];
        setAlertCount(updatedAlerts.length); // Update alert count
        return updatedAlerts;
      });
    });

    return () => {
      socket.disconnect(); // Cleanup the socket connection when the component unmounts
    };
  }, []);

  return (
    <AlertContext.Provider value={{ alerts, alertCount }}>
      {children}
    </AlertContext.Provider>
  );
};

// Custom hook to access alert context values
export const useAlerts = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("useAlerts must be used within an AlertProvider");
  }

  return context; // Return alerts and alertCount
};
