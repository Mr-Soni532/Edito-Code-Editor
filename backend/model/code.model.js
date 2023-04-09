const mongoose = require('mongoose');

const codeSchema = mongoose.Schema({
  roomId: {
    type: String,
    required: true,
  },
  htmlCode: {
    type: String,
    require: true,
    index: {unique: true}
  },
  cssCode: {
    type: String,
    require: true
  },
  jsCode: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 604800 // expiry to 7 days in seconds (7 days x 24 hours x 60 minutes x 60 seconds = 604800 seconds)
  },
})
const CodeModel = mongoose.model('code', codeSchema);
module.exports = CodeModel;