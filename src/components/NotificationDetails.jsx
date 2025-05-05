import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PopupCenter from "./PopupCenter";

const NotificationDetails = ({ user }) => {
  const { id } = useParams();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await axios.get(
          `https://nms-backend-5lqv.onrender.com/api/sendAlert/data/${id}`
        );
        setNotification(response.data.data);
      } catch (error) {
        console.error("Error fetching notification:", error);
      }
    };

    fetchNotification();
  }, [id]);

  if (!notification) {
    return (
      <p className="text-center text-gray-500 mt-20">
        Loading notification details...
      </p>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-green-100 to-blue-100 py-8 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Notification Details
        </h1>

        {/* Status */}
        <div className="mb-4 text-center">
          <p
            className={`text-lg font-semibold ${
              notification?.issueStatus ? "text-red-600" : "text-green-600"
            }`}
          >
            {notification?.issueStatus ? "Not Resolved Yet" : "Resolved"}
          </p>
        </div>

        {/* Type */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-700">Type:</h2>
          <p className="text-gray-600 mt-1">{notification.type}</p>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-700">Description:</h2>
          <p className="text-gray-600 mt-1">{notification.description}</p>
        </div>

        {/* Location */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-700">Location:</h2>
          <p className="text-gray-600 mt-1">{notification.location}</p>
        </div>

        {/* Timestamps */}
        <div className="mb-6">
          <p className="text-sm text-gray-500">
            Created At: {new Date(notification.createdAt).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">
            Created By: {notification?.userId?.username}
          </p>
        </div>

        {/* Resolved Section */}
        {!notification?.issueStatus ? (
          <>
            {notification?.resolvedmessage && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-green-600">
                  Solve Message:
                </h2>
                <p className="text-gray-600 mt-1">
                  {notification?.resolvedmessage}
                </p>
              </div>
            )}

            {notification?.resolverperson && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-green-600">
                  Resolver Person:
                </h2>
                <p className="text-gray-600 mt-1">
                  {notification?.resolverperson?.username}
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="mt-6">
            <PopupCenter
              id={id}
              userId={user?._id}
              setNotification={setNotification}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDetails;
