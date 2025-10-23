const express = require('express');
const router = express.Router();
const shareController = require('../controllers/shareController');

router.post('/', shareController.createShareLink);
router.get('/:shareId', shareController.getSharedList);

module.exports = router;