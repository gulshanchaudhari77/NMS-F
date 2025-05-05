import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useAlerts } from "../components/usecontext/AlertContext";
import { Link } from "react-router-dom";
import { SiTicktick } from "react-icons/si";

const AlertNotification = () => {
  const { alerts } = useAlerts(); // Access alerts from context

  // const [alerts, setAlerts] = useState([]);
  // const [showNotification, setShowNotification] = useState(false);
  // const [notificationMessage, setNotificationMessage] = useState("");
  // const [error, setError] = useState("");

  // useEffect(() => {

  //   const fetchAlerts = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/api/sendAlert/data");
  //       const fetchedAlerts = response?.data?.data || []; // Default to empty array if undefined
  //       setAlerts(fetchedAlerts);

  //       console.log("Length of alerts:", fetchedAlerts.length); // Check the length here

  //     } catch (err) {
  //       console.error("Error fetching alerts:", err.message);
  //       setError("Failed to fetch alerts. Please try again.");

  //     }

  //   };

  //   fetchAlerts();

  //   const socket = io("http://localhost:3000"); // Connect to backend server

  //   socket.on("new-alert", (alertData) => {
  //     console.log("Received new alert:", alertData);
  //     setAlerts((prevAlerts) => [...prevAlerts, alertData]);

  //     // Display a notification
  //     setNotificationMessage(`New alert: ${alertData.type} - ${alertData.description}`);
  //     setShowNotification(true);

  //     console.log("Length of alertssss:", alertData.length); // Check the length here

  //     // Hide the notification after 5 seconds
  //     setTimeout(() => {
  //       setShowNotification(false);
  //     }, 5000);
  //   });

  //   return () => {
  //     socket.disconnect(); // Cleanup when component unmounts
  //   };
  // }, []);

  return (
    <ul className="max-h-64 overflow-auto">
      {alerts && alerts.length > 0 ? (
        alerts.map((alert, index) => (
          <li
            key={index}
            className="px-4 py-2 border-b last:border-none hover:bg-gray-100"
          >
            {/* <strong>{alert.type}:</strong> {alert.description} */}
            <Link to={`/notifications/${alert._id}`}>
              <strong>{alert.type}:</strong> {alert.description}
            </Link>
            {
              !alert.issueStatus && <SiTicktick className=" text-green-600 relative top-[-1rem] left-[10rem]" />
            }

            {/* <br /> */}
            <p className="text-gray-500">
              {new Date(alert.createdAt).toLocaleString()}
            </p>
          </li>
        ))
      ) : (
        <li className="p-4 text-gray-500 text-center">No notifications</li>
      )}
    </ul>
  );
};

export default AlertNotification;
