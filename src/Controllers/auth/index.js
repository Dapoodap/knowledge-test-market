const jwt = require('jsonwebtoken')

module.exports = {
    verifyToken: (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Memisahkan "Bearer" dari token
    
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - No token provided' });
        }
    
        try {
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Unauthorized - Token expired' });
            } else {
                return res.status(401).json({ message: 'Unauthorized - Invalid token' });
            }
        }
    },    
}