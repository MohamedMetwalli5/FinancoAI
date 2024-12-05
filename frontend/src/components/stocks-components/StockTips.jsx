import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { FaRegSquareCaretDown, FaRegSquareCaretUp } from "react-icons/fa6";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import DOMPurify from 'dompurify';
import { AppContext } from '../../AppContext.jsx';



const StockTips = () => {

  const { sharedUserEmail } = useContext(AppContext);

  const [TopTips, setTopTips] = useState([]);
  const [tip, setTip] = useState('');

  const token = localStorage.getItem('authToken');


  const sendTips = async (event) => {
    event.preventDefault();

    if (tip.length > 500) {
      alert("Tip is too long");
      return;
    }

    const newTips = {
      id: uuidv4(),
      email: sharedUserEmail,
      text: tip,
    };

    if(newTips.text){
      try {
        const response = await axios.post(`http://localhost:5000/tips`, newTips, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        document.getElementById("tips").value = "";
        // console.log("Fetched data:", response.data);
      } catch (error) {
        console.error("Error fetching tips:", error);
      }
    }else {
      alert("You can't add empty tips.");
    }
  }

  const fetchTopTips = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/tips/${sharedUserEmail}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      // console.log("Fetched data:", response.data);
      setTopTips(response.data); 
    } catch (error) {
      console.error("Error fetching tips:", error);
    }
  }

  const handleInputChange = (e) => {
    const sanitizedInput = DOMPurify.sanitize(e.target.value);
    setTip(sanitizedInput);
  };

  useEffect(() => {
    fetchTopTips();
  }, [])
  

  return (
    <div className="flex flex-col bg-slate-100 w-full p-4 rounded-lg h-full">
      <div className="flex-grow h-64 overflow-y-auto">
        {TopTips.map((tips, index)=>(        
          <div key={index} className="mb-4">
            <div className="flex gap-2 items-center p-1">
              <img
                src="/src/assets/images/PersonalPhoto.png"
                alt="Profile Photo"
                className="w-8 h-8 rounded-full object-cover"
              />
              <h3 className="font-bold text-black mr-2">{tips.email}</h3>
            </div>
            <p className="bg-white shadow-md rounded-md p-3 m-1">{tips.text}</p>
            <div className='flex pl-3'>
              {/* <FaRegSquareCaretUp className='text-green-500 cursor-pointer'/>
              <FaRegSquareCaretDown className='text-red-500 cursor-pointer'/> */}
            </div>
          </div>
        ))}
      </div>

      {/* The Input Section */}
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
        <input
          id="tips"
          placeholder="Share Tips"
          className="text-lg p-2 w-full border rounded-md"
          value={tip}
          onChange={handleInputChange}
        />
        <button
          className="bg-green-500 text-white px-6 py-2 mr-1 rounded-md hover:bg-green-600"
          onClick={sendTips}
        >Send
        </button>
      </div>

    </div>
  );
};

export default StockTips;
