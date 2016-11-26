var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
  chat: [{type: mongoose.Schema.Types.ObjectId, ref: 'Groupchat'}],
  username: String,
  message: String
});

var Message = mongoose.model('Message', messageSchema);
module.exports = Message;
