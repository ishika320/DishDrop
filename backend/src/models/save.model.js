const mongoose = require('mongoose');


const saveSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  food: {
     type: mongoose.Schema.Types.ObjectId,
      ref: 'Food'
  }
}, { timestamps: true })

const SaveModel = mongoose.model('Save', saveSchema);

module.exports = SaveModel;