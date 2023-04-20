const express = require('express');
const router = express.Router();

const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controller/user.controller');

// Create a new user
router.post('/', createUser);

// Get all users
router.get('/', getAllUsers);

// Get a single user by ID
router.get('/:id', getUserById);

// Update an existing user by ID
router.put('/:id', updateUser);

// Delete a user by ID (actually update isDeleted to true)
router.delete('/:id', deleteUser);

module.exports = router;
