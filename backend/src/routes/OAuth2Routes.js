import dotenv from "dotenv";
dotenv.config();
import express from "express";
import jwt from "jsonwebtoken";
import axios from "axios";
import User from "../models/user.js";
import { v4 as uuidv4 } from "uuid";



const router = express.Router();

router.get("/SpotifySignin", async (req, res) => {
    const { code, state, error } = req.query;

    if (error) {
        return res.status(400).json({ error: "Spotify authentication failed" });
    }

    try {
        // Exchanging authorization code for access & refresh tokens
        const tokenResponse = await axios.post(
            "https://accounts.spotify.com/api/token",
            new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
                client_id: process.env.SPOTIFY_CLIENT_ID,
                client_secret: process.env.SPOTIFY_CLIENT_SECRET,
            }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        const { access_token, refresh_token } = tokenResponse.data;

        // Fetching the user's Spotify profile
        const userResponse = await axios.get("https://api.spotify.com/v1/me", {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        const spotifyUser = userResponse.data;

        let user = await User.findOne({ email: spotifyUser.email }); // Checking if the user exists in DB
        
        if (!user) {
            user = await User.create({
                id: spotifyUser.id,
                name: spotifyUser.display_name,
                email: spotifyUser.email || "",
                passwordHash: "SignedinWithSpotify" + uuidv4(),
                preferences: {
                    timezone: 'UTC',
                    emailNotifications: false,
                }
            });
        }

        // Fetching the top 3 finance podcasts
        const podcastResponse = await axios.get(`https://api.spotify.com/v1/search`, {
            headers: { Authorization: `Bearer ${access_token}` },
            params: {
                q: 'finance',  // the search keyword
                type: 'show',  // looking for shows/podcasts
                limit: 3,
            }
        });

        const topPodcasts = podcastResponse.data.shows.items;

        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Redirecting to frontend with the token, user info, and podcasts
        res.redirect(
            `${process.env.FRONTEND_URL}/dashboard?token=${token}&email=${encodeURIComponent(user.email)}&name=${encodeURIComponent(user.name)}&podcasts=${JSON.stringify(topPodcasts)}`
        );

    } catch (err) {
        console.error("Spotify Authentication Error:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;