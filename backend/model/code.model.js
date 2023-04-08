const mongoose = require('mongoose');

const codeSchema = mongoose.Schema({
  roomId: {
    type: String,
    required: true,
  },
  htmlCode: {
    type: String,
  },
  cssCode: {
    type: String,
  },
  jsCode: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})
const CodeModel = mongoose.model('code', codeSchema);
module.exports = CodeModel;