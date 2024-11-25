import React, { useState, useEffect } from 'react';

const News = () => {
  const [financialNews, setFinancialNews] = useState([]);

  const fetchNews = async () => {
    try {
      const response = await fetch('http://localhost:5000/news');
      const data = await response.json();
      setFinancialNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 justify-center">
      {financialNews.length > 0 ? (
        financialNews.map((news, index) => (
          <div
            key={index}
            onClick={() => {
              window.location.href = news.link;
            }}
            className="flex-col shadow-md rounded-lg items-center justify-center p-6 m-1 bg-purple-100 cursor-pointer min-h-[160px] flex hover:bg-purple-200 transition-all"
          >
            <img
              src="/src/assets/images/NewsArticleBackground.png"
              alt="Profile Photo"
              className="w-16 h-16 rounded-full object-cover mb-4"
            />

            <div className="text-center p-2">
              <h2 className="font-bold text-lg">{news.title}</h2>
              <p className="text-sm">{news.description}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">Loading news...</p>
      )}
    </div>
  );
};

export default News;
