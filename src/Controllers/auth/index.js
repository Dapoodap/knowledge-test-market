const jwt = require('jsonwebtoken');

module.exports = {
    verifyToken: (req, res, next) => {
        // Mengambil token dari header Authorization
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
        // Jika tidak ada token, kirim respon Unauthorized
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - No token provided' });
        }

        // Verifikasi token
        jwt.verify(token, 'this is secret key', (err) => { // Gantilah 'SECRET_KEY' dengan kunci rahasia Anda
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: 'Unauthorized - Token expired' });
                } else {
                    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
                }
            }
            // Simpan user dalam request untuk penggunaan selanjutnya jika diperlukan
            next();
        });
    }
};
