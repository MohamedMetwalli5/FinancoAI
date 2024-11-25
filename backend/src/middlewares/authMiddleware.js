import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const authenticateToken = (req, res, next) =>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).send({error: "Access Denied. No Token Is Provided"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send({ error: "Token has expired" });
        }
        return res.status(403).send({ error: "Invalid token" });
    }
};

export default authenticateToken;