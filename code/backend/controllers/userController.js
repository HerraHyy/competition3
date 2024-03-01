const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const requireAuth = require('../middleware/authMiddleware');

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const {username, email, password, date_of_birth, phone_number} = req.body

  try {
    const user = await User.signup(username, email, password, date_of_birth, phone_number)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({ _id: user._id, username: user.username, email: user.email, token })
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const {username, password} = req.body

  try {
    const user = await User.login(username, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({ _id: user._id, username: user.username, email: user.email, token })
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('_id username email');
    
    // Check if the request has a valid JWT token
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const token = req.headers.authorization.split(' ')[1];
    
    // Verify the JWT token
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      
      // Access the decoded user ID
      const userId = decoded._id;
      
      // Check if the decoded user ID matches the requested user ID
      if (userId !== req.user._id.toString()) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      // Return the user data
      res.status(200).json({ _id, username, email });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server Error debug' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
