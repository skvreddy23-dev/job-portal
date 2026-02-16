import express from 'express';
import {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile
} from './profile.controller.js';

import authMiddleware from '../../middlewares/auth.middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Profile management APIs
 */

/**
 * @swagger
 * /api/profile:
 *   post:
 *     summary: Create profile for current logged-in user
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: Must match the authenticated user's ID
 *                 example: 1
 *               firstName:
 *                 type: string
 *                 example: Sai
 *               lastName:
 *                 type: string
 *                 example: Krishna
 *               age:
 *                 type: integer
 *                 example: 25
 *               dob:
 *                 type: string
 *                 format: date
 *                 example: "2000-01-01"
 *               maritalStatus:
 *                 type: string
 *                 example: "single"
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               address:
 *                 type: string
 *                 example: "Hyderabad, Telangana"
 *     responses:
 *       201:
 *         description: Profile created successfully
 *       401:
 *         description: Unauthorized (no token)
 *       403:
 *         description: Forbidden (userId in body does not match authenticated user)
 *       409:
 *         description: Profile already exists for this user
 *       500:
 *         description: Server error
 */
router.post('/', authMiddleware, createProfile);

/**
 * @swagger
 * /api/profile/{id}:
 *   get:
 *     summary: Get profile by ID
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Profile ID
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getProfile);

/**
 * @swagger
 * /api/profile/{id}:
 *   put:
 *     summary: Update profile by ID (only owner)
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Profile ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName: { type: string }
 *               lastName: { type: string }
 *               age: { type: integer }
 *               dob: { type: string, format: date }
 *               maritalStatus: { type: string }
 *               phone: { type: string }
 *               address: { type: string }
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized (no token)
 *       403:
 *         description: Not authorized (not owner)
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Server error
 */
router.put('/:id', authMiddleware, updateProfile);

/**
 * @swagger
 * /api/profile/{id}:
 *   delete:
 *     summary: Delete profile by ID (only owner)
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Profile ID
 *     responses:
 *       200:
 *         description: Profile deleted successfully
 *       401:
 *         description: Unauthorized (no token)
 *       403:
 *         description: Not authorized (not owner)
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authMiddleware, deleteProfile);

export default router;