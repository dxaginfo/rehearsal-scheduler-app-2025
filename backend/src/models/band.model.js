const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Band:
 *       type: object
 *       required:
 *         - name
 *         - createdBy
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         name:
 *           type: string
 *           description: Name of the band/ensemble
 *         description:
 *           type: string
 *           description: Description of the band/ensemble
 *         logo:
 *           type: string
 *           description: URL to band logo image
 *         createdBy:
 *           type: string
 *           description: User ID of the band creator
 *         members:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [leader, admin, member]
 *               joinedAt:
 *                 type: string
 *                 format: date-time
 *         invitations:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               token:
 *                 type: string
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
const bandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  logo: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      role: {
        type: String,
        enum: ['leader', 'admin', 'member'],
        default: 'member'
      },
      joinedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  invitations: [
    {
      email: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      },
      expiresAt: {
        type: Date,
        required: true
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Band', bandSchema);