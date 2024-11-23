import React from 'react';
import { useState, useEffect } from 'react';
import { FaRegSquareCaretDown, FaRegSquareCaretUp } from "react-icons/fa6";
import axios from 'axios';

const StockTips = ({email}) => {

  const [TopTips, setTopTips] = useState([])

  const fetchTopTips = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users-tips");
      // console.log("Fetched data:", response.data);
      setTopTips(response.data); 
    } catch (error) {
      console.error("Error fetching tips:", error);
    }

  }

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
              <h3 className="font-bold text-black mr-2">{tips.name}</h3>
            </div>
            <p className="bg-white shadow-md rounded-md p-3 m-1">{tips.text}</p>
            <div className='flex pl-3'>
              <FaRegSquareCaretUp className='text-green-500 cursor-pointer'/>
              <FaRegSquareCaretDown className='text-red-500 cursor-pointer'/>
            </div>
          </div>
        ))}
      </div>

      {/* The Input Section */}
      <div className="mt-auto">
        <input
          placeholder="Share Tips"
          className="text-lg p-2 w-full border rounded-md"
        />
      </div>
    </div>
  );
};

export default StockTips;
