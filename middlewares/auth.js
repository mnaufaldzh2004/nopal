
const jwt = require('jsonwebtoken');
require('dotenv').config();
 // WAJIB agar bisa menangkap data dari form HTML


module.exports = (req, res, next) => {

    const token = req.headers['authorization'];

    if(!token) return res.status(403).json({message : 'token diperlukan'});

    jwt.verify(token.split('')[1], procces.env.JWT_SECRET, (err, decoded) => {

        if (err) return res.status(401).json({message : 'token tidak valid'});
        req.user = decoded;
        next();
    }

)


    




}