const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

router.get ('/dashboard', authMiddleware, (req, res) => {
    req.json({message : 'Selamat Datang, dengan id : ${req.userID}'});
});


module.exports = router;