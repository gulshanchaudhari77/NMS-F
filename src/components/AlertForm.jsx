import React, { useState } from "react";
import axios from "axios";

const AlertForm = ({ user }) => {
  const [alertData, setAlertData] = useState({
    type: "All",
    description: "",
    location: "",
  });

  const handleChange = (e) => {
    setAlertData({ ...alertData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setAlertData({
      type: "All",
      description: "",
      location: "",
    });

    try {
      const response = await axios.post(
        // "http://localhost:3000/api/sendAlert",
                "https://nms-backend-5lqv.onrender.com/api/sendAlert",

        
        {
          ...alertData,
          userId: user._id, // User ID who is sending the alert
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        alert("Alert sent to all users!");
      }
    } catch (error) {
      console.error("Error sending alert:", error);
      alert("Failed to send alert.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-200 max-w-md mx-auto mt-5 p-6 rounded-lg shadow-lg space-y-4"
    >
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
        Alert Form
      </h1>

      {/* Type Dropdown */}
      <div>
        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Type
        </label>
        <select
          name="type"
          id="type"
          onChange={handleChange}
          value={alertData.type}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All</option>
          <option value="Fire">Fire</option>
          <option value="Traffic">Traffic</option>
          <option value="Roadblock">Roadblock</option>
          <option value="Water">Water</option>
          <option value="Medical Emergency">Medical Emergency</option>
          <option value="Electricity Outage">Electricity Outage</option>
          <option value="Gas Leak">Gas Leak</option>
          <option value="Lost & Found">Lost & Found</option>
          <option value="Suspicious Activity">Suspicious Activity</option>
          <option value="Garbage or Sanitation Issue">
            Garbage or Sanitation Issue
          </option>
          <option value="Animal Disturbance">Animal Disturbance</option>
          <option value="Noise Complaint">Noise Complaint</option>
          <option value="Water Supply Issue">Water Supply Issue</option>
          <option value="Construction Notification">
            Construction Notification
          </option>
          <option value="Traffic Jam">Traffic Jam</option>
          <option value="Security Alert">Security Alert</option>
        </select>
      </div>

      {/* Description Field */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter your alert message"
          value={alertData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        ></textarea>
      </div>

      {/* Location Field */}
      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Location
        </label>
        <input
          id="location"
          type="text"
          name="location"
          value={alertData.location}
          onChange={handleChange}
          placeholder="Enter location"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition duration-200"
      >
        Send Alert
      </button>
    </form>
  );
};

export default AlertForm;
