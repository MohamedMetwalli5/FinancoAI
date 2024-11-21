import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';

const AIModelsPage = () => {
  const location = useLocation();
  const { email } = location.state || {};

  const name = email;
  const [userMessage, setUserMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_CHATGPT_API_KEY;

  const handleSendMessage = async (userMessage) => {
    if (!userMessage.trim()) {
      setChatResponse('Please enter a valid message.');
      return;
    }

    if (!apiKey) {
      console.error('API key is missing. Check your environment variables.');
      setChatResponse('Error: API key not found. Please contact support.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                'You are FinancoAI, an intelligent and friendly assistant specializing in financial insights, budgeting, and investment advice. Your primary goal is to provide users with clear, actionable recommendations and guidance for smarter financial decisions. You prioritize accuracy, ethical considerations, and user understanding while maintaining a friendly and professional tone.',
            },
            { role: 'user', content: userMessage },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const answer = response.data.choices[0]?.message?.content || 'No response';
      setChatResponse(answer);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 429) {
          setChatResponse('Too many requests. Please wait and try again.');
        } else if (error.response.status === 401) {
          setChatResponse('Unauthorized: Invalid API key.');
        } else {
          setChatResponse(`Error: ${error.response.statusText}`);
        }
      } else {
        setChatResponse('Error: Unable to contact the API. Check your network.');
      }
      console.error('Error contacting ChatGPT:', error);
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  return (
    <>
      <div className="flex h-screen">
        <Sidebar email={email} />
        <div className="flex-1 pl-4 ml-64">
          <div>
            <Header email={email} />
          </div>
          <div
            id="Chatting"
            className="flex flex-col items-center justify-center h-full bg-gradient-to-br rounded-lg from-purple-100 to-white text-gray-800"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">Hi, {name}</h1>
              <p className="text-xl mt-2">Can I help you with anything?</p>
              <p className="text-gray-600 mt-2">
                Welcome to FinancoAI, your partner for smarter financial decisions and insights!
              </p>
            </div>

            {/* Options Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-11/12 max-w-4xl">
              <button
                onClick={() =>
                  handleSendMessage(
                    'Give me predictions for my financial future according to what you know about me till now'
                  )
                }
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transform hover:scale-105 transition"
              >
                <div className="text-4xl mb-2">📊</div>
                <h2 className="text-lg font-bold">Financial Forecast</h2>
                <p className="text-gray-600 mt-1">
                  Get predictions for your financial future
                </p>
              </button>

              <button
                onClick={() =>
                  handleSendMessage(
                    'Give me the best investment opportunities for today according to what you know about me till now'
                  )
                }
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transform hover:scale-105 transition"
              >
                <div className="text-4xl mb-2">💡</div>
                <h2 className="text-lg font-bold">Investment Ideas</h2>
                <p className="text-gray-600 mt-1">
                  Discover the best investment opportunities
                </p>
              </button>

              <button
                onClick={() =>
                  handleSendMessage(
                    'Give me personalized AI-powered budgeting insights for today according to what you know about me till now'
                  )
                }
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transform hover:scale-105 transition"
              >
                <div className="text-4xl mb-2">🛍️</div>
                <h2 className="text-lg font-bold">Budget Planning</h2>
                <p className="text-gray-600 mt-1">
                  Get personalized AI-powered budgeting insights
                </p>
              </button>
            </div>

            {/* Chat Input Section */}
            <div className="mt-8 w-full px-4 md:w-3/4 lg:w-1/2">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
                <input
                  type="text"
                  placeholder="Message FinancoAI"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  className="flex-grow p-4 focus:outline-none"
                />
                <button
                  className="bg-purple-500 text-white px-6 py-2 hover:bg-purple-600"
                  onClick={() => handleSendMessage(userMessage)}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send"}
                  <span className="ml-2">➜</span>
                </button>
              </div>
            </div>

            {/* Displaying the response */}
            <div className="mt-6 w-full px-4 md:w-3/4 lg:w-1/2">
              {chatResponse && (
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold">ChatGPT's Response:</h3>
                  <p>{chatResponse}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIModelsPage;
