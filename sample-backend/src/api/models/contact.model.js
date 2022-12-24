const mongoose = require('mongoose');

/**
 * Contact Schema
 * @private
 */
const ContactSchema = new mongoose.Schema({
  name: { type: String }
}, { timestamps: true }
);

/**
 * @typedef Contact
 */


module.exports = mongoose.model('Contact', ContactSchema);