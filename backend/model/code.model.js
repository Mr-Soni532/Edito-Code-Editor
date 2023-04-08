const mongoose = require('mongoose');
const codeSchema = mongoose.Schema({
    roomId: {
        type: String,
        required: true,
      },
      htmlCode: {
        type: String,
        required: true,
      },
      cssCode: {
        type: String,
        required: true,
      },
      jsCode: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})
const CodeModel = mongoose.model('code', codeSchema);
module.exports = CodeModel;