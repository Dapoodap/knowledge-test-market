const jwt = require('jsonwebtoken')

module.exports = {
    //function untuk mengecek apakah request endpoint dengan token 'Bearer token'
    verifyToken: (req, res, next) => {
        //mengambil dari header auth...
        const authHeader = req.headers['authorization'];
        //dipisah dari kata 'Bearer'
        const token = authHeader && authHeader.split(' ')[1]; 
        
        //kalo gaada tokennya gabisa akses alias Unauthorized
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - No token provided' });
        }
    
        try {
            //kalo ada next ke func selanjutnya
            next();
        } catch (error) {
            //kalo expired bakal ketahuan
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Unauthorized - Token expired' });
            } else {
                //atau kalo diisi sembarangan gak valid
                return res.status(401).json({ message: 'Unauthorized - Invalid token' });
            }
        }
    },    
}