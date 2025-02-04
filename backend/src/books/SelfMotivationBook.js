const mongoose = require('mongoose');

const SelfMotivationBookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: String,
  image: String,
  rating: String,
});

const SelfMotivationBook = mongoose.model("SelfMotivationBook", SelfMotivationBookSchema);

module.exports = SelfMotivationBook;
