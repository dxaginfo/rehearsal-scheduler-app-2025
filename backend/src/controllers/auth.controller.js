const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/user.model');

// Register a new user
exports.register = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, firstName, lastName, instruments } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new User({
      email,
      password,
      firstName,
      lastName,
      instruments: instruments || []
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    // Create and return JWT token
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'default_jwt_secret',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          token,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
          }
        });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Login user
exports.login = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create and return JWT token
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'default_jwt_secret',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
          }
        });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Verify email address
exports.verifyEmail = async (req, res) => {
  // Placeholder for email verification functionality
  // This would typically involve validating a token and updating the user's verified status
  res.status(200).json({ msg: 'Email verification endpoint' });
};

// Forgot password request
exports.forgotPassword = async (req, res) => {
  // Placeholder for forgot password functionality
  // This would typically involve generating a reset token and sending an email
  res.status(200).json({ msg: 'Forgot password endpoint' });
};

// Reset password with token
exports.resetPassword = async (req, res) => {
  // Placeholder for password reset functionality
  // This would typically involve validating a token and updating the user's password
  res.status(200).json({ msg: 'Reset password endpoint' });
};