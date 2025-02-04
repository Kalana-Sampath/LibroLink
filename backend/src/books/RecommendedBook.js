const mongoose = require('mongoose');

const RecommendedBookSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: String,
    image: String,
    exchange: String,
});

mongoose.model("RecommendedBooks", RecommendedBookSchema);

const RecommendedBooks = mongoose.model("RecommendedBooks", RecommendedBookSchema);

module.exports = RecommendedBooks;
