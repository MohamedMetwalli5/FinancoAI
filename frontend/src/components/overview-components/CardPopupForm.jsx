import React, { useState } from 'react';
import axios from 'axios';

const CardPopupForm = ({ isOpen, togglePopup, PopupFormTitle, email }) => {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    date: '',
    category: PopupFormTitle,
    recurring: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const transaction = {
      category: formData.category,
      amount: formData.amount,
      description: formData.description,
      date: formData.date,
      recurring: formData.recurring,
    };

    // Sending data
    try {
      const response = await axios.post('http://localhost:5000/transactions', transaction);
      console.log('Submitted Data:', transaction);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  
    togglePopup();
  };
  

  return (
    <div className="relative">
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className={`text-xl font-semibold ${PopupFormTitle === "Balance" ? 'text-blue-600' : (PopupFormTitle === "Income" ? 'text-purple-600' : 'text-green-600')} mb-4`}>
            {PopupFormTitle}
          </h2> 
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Enter amount"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Transaction details"
                  rows="3"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="recurring" className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="recurring"
                    name="recurring"
                    checked={formData.recurring}
                    onChange={handleChange}
                    className="form-checkbox"
                  />
                  Recurring Transaction
                </label>
              </div>

              <div className="flex justify-end gap-2">
                <button type="button" onClick={togglePopup} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 mb-4">
                    Cancel
                </button>
                <button type="submit" className={`text-white py-2 px-4 rounded-lg ${PopupFormTitle === "Balance" ? 'bg-blue-600 hover:bg-blue-700' : (PopupFormTitle === "Income" ? 'bg-purple-600 hover:bg-purple-700' : 'bg-green-600 hover:bg-green-700')} mb-4`}>
                    Submit
                </button>
                </div>


            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardPopupForm;