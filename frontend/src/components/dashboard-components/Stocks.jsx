import React, { useEffect } from 'react';
import StocksChart from '../stocks-components/StocksChart';
import StocksWatchList from '../stocks-components/StocksWatchList';
import StockTips from '../stocks-components/StockTips';

const Stocks = () => {
  useEffect(() => {
    // Getting the Watson Assistant configuration from environment variables
    const integrationID = import.meta.env.VITE_WATSON_INTEGRATION_ID;
    const serviceInstanceID = import.meta.env.VITE_WATSON_SERVICE_INSTANCE_ID;

    // Embedded the Watson Assistant script
    const script = document.createElement('script');
    script.innerHTML = `
      window.watsonAssistantChatOptions = {
        integrationID: "${integrationID}", // The ID of this integration.
        region: "eu-de", // The region your integration is hosted in.
        serviceInstanceID: "${serviceInstanceID}", // The ID of your service instance.
        onLoad: async (instance) => { await instance.render(); }
      };
      setTimeout(function(){
        const t = document.createElement('script');
        t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + 
                (window.watsonAssistantChatOptions.clientVersion || 'latest') + 
                "/WatsonAssistantChatEntry.js";
        document.head.appendChild(t);
      });
    `;
    document.head.appendChild(script);
    
    // Cleaning up script on component unmount
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 p-4 mt-5 bg-slate-50 rounded-lg">
      <div className="flex justify-center items-center shadow-lg border rounded-lg p-4 bg-white">
        <StocksChart />
      </div>
      
      <div className="flex justify-center items-center shadow-lg border rounded-lg p-2 bg-white">
        <StocksWatchList />
      </div>
      
      <div className="flex justify-center shadow-lg border rounded-lg">
        <StockTips />
      </div>
    </div>
  );
};

export default Stocks;
