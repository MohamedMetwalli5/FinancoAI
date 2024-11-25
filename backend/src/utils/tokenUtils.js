import jwt from "jsonwebtoken";

const generateToken = (user) => {
    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not loaded");
    }

    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};

export default generateToken;
