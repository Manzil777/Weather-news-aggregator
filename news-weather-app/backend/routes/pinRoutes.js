const express = require('express');
const router = express.Router();
const { getPins, addPin, deletePin } = require('../controllers/pinController');

router.get('/', getPins);
router.post('/', addPin);
router.delete('/:id', deletePin);

module.exports = router;
