const express = require('express')
const settingsRoutes = require('./settings.route')
const contactRoutes = require('./contact.route')
const router = express.Router()

/**
 * GET v1/admin
 */

router.use('/settings', settingsRoutes)
router.use('/contacts', contactRoutes)

module.exports = router
