const mongoose = require('mongoose');

// Define the book schema
const bookSchema = new mongoose.Schema({
     // "id" is a string
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: String, required: true }, // The price is a string to handle Rs: notation
    image: { type: String, required: true },
    rating: { type: Number, required: true }, // Rating as a number
} ,
{ timestamps: true } 
);

// Create the Book model using the schema
const Book = mongoose.model('Book', bookSchema);
