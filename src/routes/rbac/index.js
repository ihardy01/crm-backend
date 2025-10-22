const express = require('express');
const router = express.Router();
const { newRole, newResource } = require('../../controllers/rbac.controller');

// Create new role
router.post('/role', newRole);

// Create new resource
router.post('/resource', newResource);

module.exports = router;