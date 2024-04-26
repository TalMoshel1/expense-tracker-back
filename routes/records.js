const express = require('express');
const router = express.Router();
const { createRecordsForUser } = require('../controllers/records');

router.post('/records', createRecordsForUser);

module.exports = router;
