const express = require('express')
const authRoutes = require('./auth.route')

const router = express.Router()
const { cpUpload } = require('../../../utils/upload')
/**
 * GET v1/status
 */
router.use('/auth', authRoutes)

module.exports = router
