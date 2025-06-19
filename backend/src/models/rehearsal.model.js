const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Rehearsal:
 *       type: object
 *       required:
 *         - bandId
 *         - title
 *         - startTime
 *         - endTime
 *         - createdBy
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         bandId:
 *           type: string
 *           description: ID of the band this rehearsal belongs to
 *         title:
 *           type: string
 *           description: Title of the rehearsal
 *         description:
 *           type: string
 *           description: Additional details about the rehearsal
 *         location:
 *           type: object
 *           properties:
 *             address:
 *               type: string
 *             coordinates:
 *               type: object
 *               properties:
 *                 lat:
 *                   type: number
 *                 lng:
 *                   type: number
 *         startTime:
 *           type: string
 *           format: date-time
 *         endTime:
 *           type: string
 *           format: date-time
 *         isRecurring:
 *           type: boolean
 *         recurringPattern:
 *           type: object
 *           properties:
 *             frequency:
 *               type: string
 *               enum: [daily, weekly, monthly]
 *             interval:
 *               type: number
 *             endDate:
 *               type: string
 *               format: date-time
 *         setlist:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               songTitle:
 *                 type: string
 *               duration:
 *                 type: number
 *               notes:
 *                 type: string
 *         attendanceTracking:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [attending, maybe, declined, no_response]
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *         createdBy:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
const rehearsalSchema = new mongoose.Schema({
  bandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Band',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  location: {
    address: {
      type: String,
      trim: true
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurringPattern: {
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly']
    },
    interval: Number,
    endDate: Date
  },
  setlist: [
    {
      songTitle: {
        type: String,
        required: true
      },
      duration: Number, // in minutes
      notes: String
    }
  ],
  attendanceTracking: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      status: {
        type: String,
        enum: ['attending', 'maybe', 'declined', 'no_response'],
        default: 'no_response'
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Rehearsal', rehearsalSchema);