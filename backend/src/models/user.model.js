const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address (unique)
 *         password:
 *           type: string
 *           description: Hashed password
 *         firstName:
 *           type: string
 *           description: User's first name
 *         lastName:
 *           type: string
 *           description: User's last name
 *         profileImage:
 *           type: string
 *           description: URL to profile image
 *         instruments:
 *           type: array
 *           items:
 *             type: string
 *           description: List of instruments the user plays
 *         preferences:
 *           type: object
 *           properties:
 *             emailNotifications:
 *               type: boolean
 *             pushNotifications:
 *               type: boolean
 *             reminderTiming:
 *               type: number
 *               description: Hours before event for reminders
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  profileImage: {
    type: String,
    default: ''
  },
  instruments: [{
    type: String,
    trim: true
  }],
  preferences: {
    emailNotifications: {
      type: Boolean,
      default: true
    },
    pushNotifications: {
      type: Boolean,
      default: true
    },
    reminderTiming: {
      type: Number,
      default: 24 // hours before event
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);