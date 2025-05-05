import axios from "axios";
import React, { useState } from "react";

const PopupCenter = ({ id, userId, setNotification }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(""); // State for the input value
  const [isInputVisible, setIsInputVisible] = useState(true); // To control input visibility

  // Open the pop-up
  const openPopup = () => {
    setIsOpen(true);
  };

  // Close the pop-up
  const closePopup = () => {
    setIsOpen(false);
    setIsInputVisible(true); // Reset input visibility on close
    setInputValue(""); // Clear input field
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      `https://nms-backend-5lqv.onrender.com/api/submitmsg/${id}`,
      { message: inputValue, userId: userId }
    );
    console.log("response /api/submitmsg", response);
    setNotification(response?.data?.savedNoti);
    // console.log("Submitted:", inputValue); // Perform desired action here
    setIsInputVisible(false); // Hide the input field after submission
  };

  return (
    <div className="relative">
      {/* Button to open the pop-up */}
      <button
        onClick={openPopup}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Open Pop-up
      </button>

      {/* Pop-up UI */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className="bg-white p-6 rounded shadow-md transform scale-95 transition-transform duration-200"
            style={{ animation: "zoomIn 0.3s ease-in-out forwards" }}
          >
            <h2 className="text-lg font-bold mb-4">Input Your Data</h2>
            {isInputVisible ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Input field */}
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="Enter something..."
                  required
                />
                {/* Submit button */}
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p className="text-green-500">Input submitted successfully!</p>
            )}

            {/* Close button */}
            <button
              onClick={closePopup}
              className="mt-4 text-sm text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupCenter;
