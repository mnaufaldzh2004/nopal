const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username dan password wajib diisi' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();
    res.redirect('/');
  } catch (error) {
    res.status(400).json({ message: 'Registrasi gagal', error });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Username atau password salah!' });
    }

    req.session.user = user;
    res.redirect('/home');
  } catch (error) {
    res.status(400).json({ message: 'Login gagal', error });
  }
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
