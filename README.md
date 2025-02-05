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
- **OAuth2 Authentication**: Allow users to optionally sign in effortlessly with their Spotify account.
- **Personalized Financial Insights**: AI-powered predictions about your financial future based on personal data.
- **Real-Time Updates**: Fetch and display real-time stock data.
- **Investment Recommendations**: Discover tailored investment opportunities to suit your financial situation.
- **Budgeting Assistance**: Optimize your finances with AI-powered budgeting tips and insights.
- **Interactive Chat Interface**: Engage with FinancoAI through an intuitive, IBM WatsonX-powered user-friendly chat interface for personalized interactions.
- **Community Tip Sharing**: Share and receive valuable financial tips. Collaborate on investment, budgeting, and financial strategies with other users.
- **Security Measures**: Restrict signin and signup requests per IP to prevent abuse, ensure fair usage, protect against DDoS attacks, and use JWT authentication for secure user verification.
- **Hosting & Database**: The frontend is hosted on Netlify, the backend runs on Railway, and the database is powered by MongoDB Cloud. Feel free to explore the platform by visiting the website [here](https://financoai.netlify.app/).


---

# Setup Instructions
If you want to replicate the project on your local environment, follow these steps:
## Backend Setup
1. Navigate to the Backend Directory
```cd backend```
2. Install Dependencies
``` npm install ```
3. After installing MongoDB and setting up the connection, configure the database URI by creating a ```.env``` file in the backend directory with the following content:  
Note: Some values can be obtained from the Spotify Developer Portal based on your application’s configuration and API keys.
```
PORT=5000
FRONTEND_URL=http://localhost:5173
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=your_spotify_redirect_uri (e.g. http://localhost:5000/OAuth2/SpotifySignin)
```
4. Run the Backend
``` npm run dev ```
5. The backend will start on http://localhost:5000
6. Run the Backend Jest Unit Tests (optional, in a new terminal)
``` npm test ```


## Frontend Setup
1. Navigate to the Frontend Directory
``` cd frontend ```
2. Install Dependencies
``` npm install ```
3. Configure Environment Variables, 
Create a ```.env``` file in the frontend directory with the following content:  
Note: Some values can be obtained from the Spotify Developer Portal based on your application’s configuration and API keys.
```
VITE_BACKEND_API_URL=http://localhost:5000
VITE_TWELVE_DATA_API_KEY=your_twelve_data__api_key
VITE_WATSON_INTEGRATION_ID=the_watson_integration_id
VITE_WATSON_SERVICE_INSTANCE_ID=the_watson_service_instance_id
PORT=5173
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
```
4. Start the Frontend
``` npm run dev ```
5. The frontend will start on http://localhost:5173


---

# The ER Diagram
![image](https://github.com/user-attachments/assets/0f6f3d13-e494-40b1-809d-4e764f1aad7b)


---

# Logo Idea

The logo for FinancoAI creatively incorporates the phi (Φ) mathematical symbol, representing "Fi" in the name. Each component of the logo symbolizes a letter from the word "FinancoAI," blending mathematical elegance with the brand's focus on finance and AI. This design reflects the harmony between innovation, intelligence, and finance that defines FinancoAI.

![FinancoAi - Website Logo](https://github.com/user-attachments/assets/e1888836-685d-45bd-9a15-60251366bc52)
