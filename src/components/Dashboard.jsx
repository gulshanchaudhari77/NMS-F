import React, { useState, useEffect } from "react";
import axios from "axios";
import AlertForm from "./AlertForm";
import MapComponent from "./MapComponent";
import AlertNotification from "./AlertNotification";
import NotificationDetails from "./NotificationDetails";
import PopupCenter from "./PopupCenter";

const Dashboard = ({ user }) => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/alert");
        console.log("response ", response);
        setAlerts(response.data.alerts);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };
    fetchAlerts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      {/* Header Section */}
        <h1 className="text-center text-2xl font-bold">Dashboard</h1>

      {/* Alert Form Section */}
      <section className="w-full max-w-4xl p-4">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Create an Alert</h2>
          <AlertForm user={user} />
        </div>
      </section>

      {/* Map and Content Section */}
      <section className="w-full max-w-6xl p-4 flex flex-col lg:flex-row gap-6">
        {/* Map Component */}
        <div className="flex-1 bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Nandanvan Vyakti Nagar Map</h2>
          <MapComponent />
        </div>

        
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-blue-600 text-white py-4 mt-6">
        <p className="text-center">&copy; {new Date().getFullYear()} Neighborhood Safety Alert System</p>
      </footer>
    </div>
  );
};

export default Dashboard;
