import React from 'react';

const News = () => {
  
  const FinancialNews = [{ title: "The Title", link: "https://www.facebook.com", description: "The Description" }, { title: "The Title", link: "https://www.facebook.com", description: "The Description" }, { title: "The Title", link: "https://www.facebook.com", description: "The Description" }];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 justify-center'>
      {FinancialNews.map((news, index) => (
        <div 
          key={index}
          onClick={() => { window.location.href = news.link; }}
          className='flex-col shadow-md rounded-lg items-center justify-center p-6 m-1 bg-slate-100 cursor-pointer min-h-[160px] flex hover:bg-slate-200 transition-all'
        >
          <img
              src="/src/assets/images/PersonalPhoto.png"
              alt="Profile Photo"
              className="w-16 h-16 rounded-full object-cover mb-4"
          />
          
          <div className="text-center p-2">
            <h2 className='font-bold text-lg'>{news.title}</h2>
            <p className='text-sm'>{news.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default News;
