const express = require('express');
const authRouter = require('./auth');
const dashboardRouter = require('./dashboard');

const router = express.Router();

router.use(authRouter);
router.use(dashboardRouter);

module.exports = router;
