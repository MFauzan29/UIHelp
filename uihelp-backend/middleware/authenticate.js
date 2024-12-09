const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(' ')[1]; 

    try {
        const secret = process.env.JWT_SECRET || 'defaultSecretKey';
        const decoded = jwt.verify(token, secret); 
        req.user = decoded; 
        console.log("Token payload:", decoded);

        next();
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

module.exports = authenticate;
