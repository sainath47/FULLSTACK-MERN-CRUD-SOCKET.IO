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
/*     const { id } = req.params;
TypeError: Cannot destructure property 'id' of 'req.params' as it is undefined.

    at BroadcastOperator.updateUser (C:\Users\P.V.SAINATH REDDY\Desktop\pro\backend\controller\user.controller.js:51:13)
    at Timeout._onTimeout (C:\Users\P.V.SAINATH REDDY\Desktop\pro\backend\node_modules\socket.io\dist\broadcast-operator.js:181:17)
    at listOnTimeout (node:internal/timers:559:17)
    at processTimers (node:internal/timers:502:7)
    **/