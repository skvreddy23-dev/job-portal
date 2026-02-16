import prisma from '../../config/prisma.js';

export const createProfile = async (req, res) => {
  try {
    // 1. Get logged-in user ID from JWT (auth middleware)
    const loggedInUserId = req.user?.id;
    if (!loggedInUserId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    // 2. Extract data from body
    const {
      userId,           // ← must be sent in payload
      firstName,
      lastName,
      age,
      dob,
      maritalStatus,
      phone,
      address
    } = req.body;

    // 3. Mandatory: userId in body must match logged-in user
    if (!userId || Number(userId) !== loggedInUserId) {
      return res.status(403).json({
        success: false,
        message: 'userId in payload must match the authenticated user'
      });
    }

    // 4. Optional: check if profile already exists for this user
    const existing = await prisma.profile.findUnique({
      where: { userId: loggedInUserId }
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'Profile already exists for this user'
      });
    }
    
    let parsedDob = null;
    if (dob) {
      // Accept "YYYY-MM-DD" or full ISO
      if (/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
        parsedDob = new Date(dob + 'T00:00:00.000Z'); // convert to full ISO
      } else {
        parsedDob = new Date(dob); // try parsing as-is
      }
    
      if (isNaN(parsedDob.getTime())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid date format for dob (use YYYY-MM-DD or ISO 8601)'
        });
      }
    }

    // 5. Create profile
    const profile = await prisma.profile.create({
      data: {
        userId: loggedInUserId,   // ← use logged-in ID (safe)
        firstName,
        lastName,
        age: age ? Number(age) : null,
        dob: parsedDob,
        maritalStatus: maritalStatus || 'single',
        phone: phone || null,
        address: address || null
      }
    });

    res.status(201).json({
      success: true,
      message: 'Profile created successfully',
      profile
    });
  } catch (err) {
    console.error('Create profile error:', err);
    res.status(500).json({
      success: false,
      message: 'Error creating profile',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// GET PROFILE BY ID
export const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profileId = Number(id);

    if (isNaN(profileId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid profile ID'
      });
    }

    const profile = await prisma.profile.findUnique({
      where: { id: profileId },
      include: {
        user: { select: { email: true, role: true } }
      }
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    res.json({
      success: true,
      profile
    });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching profile'
    });
  }
};

// UPDATE PROFILE BY ID
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profileId = Number(id);
    const loggedInUserId = req.user?.id;

    if (isNaN(profileId)) {
      return res.status(400).json({ success: false, message: 'Invalid profile ID' });
    }

    if (!loggedInUserId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    // Check ownership
    const profile = await prisma.profile.findUnique({
      where: { id: profileId },
      select: { userId: true }
    });

    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    if (profile.userId !== loggedInUserId) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this profile'
      });
    }

    // Update
    const updated = await prisma.profile.update({
      where: { id: profileId },
      data: req.body
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      profile: updated
    });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({
      success: false,
      message: 'Error updating profile'
    });
  }
};

// DELETE PROFILE BY ID
export const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profileId = Number(id);
    const loggedInUserId = req.user?.id;

    if (isNaN(profileId)) {
      return res.status(400).json({ success: false, message: 'Invalid profile ID' });
    }

    if (!loggedInUserId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    // Check ownership
    const profile = await prisma.profile.findUnique({
      where: { id: profileId },
      select: { userId: true }
    });

    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    if (profile.userId !== loggedInUserId) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this profile'
      });
    }

    await prisma.profile.delete({
      where: { id: profileId }
    });

    res.json({
      success: true,
      message: 'Profile deleted successfully'
    });
  } catch (err) {
    console.error('Delete profile error:', err);
    res.status(500).json({
      success: false,
      message: 'Error deleting profile'
    });
  }
};