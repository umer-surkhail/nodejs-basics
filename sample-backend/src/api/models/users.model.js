const mongoose = require('mongoose');

/**
 * User Schema
 * @private
 */
const UserSchema = new mongoose.Schema({
  firstName: { type: String }
}, { timestamps: true }
);
/**
 * @typedef User
 */

module.exports = mongoose.model('User', UserSchema);