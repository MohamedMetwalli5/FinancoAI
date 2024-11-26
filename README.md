![Frontend](https://img.shields.io/badge/Frontend-React.js-blue.svg)
![Backend](https://img.shields.io/badge/Backend-Express.js%20-brightgreen.svg)
![Database](https://img.shields.io/badge/Database-MongoDB%20-green.svg)
![License](https://img.shields.io/badge/license-Apache_2.0-red.svg)

<div align="center">
  <img src="https://github.com/user-attachments/assets/e818d50b-37e8-40e1-a980-5a21d87c3d6f" alt="The Website Logo" width="200" />
</div>



# FinancoAI

FinancoAI is a smart financial assistant that combines real-time stock tracking with personalized dashboards. It offers budgeting tips, investment insights, and AI-powered recommendations to help users make informed financial decisions effortlessly.


---

# Features

- **Stock Subscriptions**: Subscribe to preferred stocks and track them on a personalized dashboard.
- **Personalized Financial Insights**: AI-powered predictions about your financial future based on personal data.
- **Real-Time Updates**: Fetch and display real-time stock data.
- **Investment Recommendations**: Discover tailored investment opportunities to suit your financial situation.
- **Budgeting Assistance**: Optimize your finances with AI-powered budgeting tips and insights.
- **Interactive Chat Interface**: Engage with FinancoAI through an intuitive, user-friendly chat interface.
- **Community Tip Sharing**: Share and receive valuable financial tips. Collaborate on investment, budgeting, and financial strategies with other users.


---

# Setup Instructions

## Backend Setup
1. Navigate to the Backend Directory
```cd backend```
2. Install Dependencies
``` npm install ```
3. After installing MongoDB, configure the database URI by creating a ```.env``` file in the backend directory with the following content:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
4. Run the Backend
``` npm run dev ```
5. The backend will start on http://localhost:5000


## Frontend Setup
1. Navigate to the Frontend Directory
``` cd frontend ```
2. Install Dependencies
``` npm install ```
3. Configure Environment Variables
Create a ```.env``` file in the frontend directory with the following content:
```
VITE_TWELVE_DATA_API_KEY=your_twelve_data__api_key
VITE_CHATGPT_API_KEY=your_chatgpt_api_key
```
4. Start the Frontend
``` npm run dev ```
5. The frontend will start on http://localhost:5173


---

# Logo Idea

The logo for FinancoAI creatively incorporates the phi (Φ) mathematical symbol, representing "Fi" in the name. Each component of the logo symbolizes a letter from the word "FinancoAI," blending mathematical elegance with the brand's focus on finance and AI. This design reflects the harmony between innovation, intelligence, and finance that defines FinancoAI.

![FinancoAi - Website Logo](https://github.com/user-attachments/assets/e1888836-685d-45bd-9a15-60251366bc52)
