const express = require('express')
const Book = require('./book.model');
const{postABook, getAllBooks, getSingleBook, updateBook, deleteBook, getAllRecommendedBooks, getAllSelfMotivationBooks} = require('./book.controller');
const router = express.Router();


const RecommendedBook = require('./RecommendedBooks');  // Import model for Recommended Books
const SelfMotivationbook = require('./SelfMotivationbook');        // Import model for Self-Help Books

// Create a new book (works for both categories)
exports.postABook = async (req, res) => {
  const { title, author, price, image, category, rating } = req.body;
  
  try {
    let newBook;
    // If category is "recommended", save it to the RecommendedBooks model
    if (category === 'recommended') {
      newBook = new RecommendedBook({ title, author, price, image, rating });
    }
    // If category is "self-help", save it to the SelfHelpBooks model
    else if (category === 'selfmotivation') {
      newBook = new SelfMotivationbook({ title, author, price, image, rating });
    }

    // Save the new book to the appropriate model
    await newBook.save();
    res.status(201).send({ message: "Book added successfully!", data: newBook });
  } catch (error) {
    res.status(500).send({ message: "Error adding book", error: error.message });
  }
};

// Get all books (filter by category)
exports.getAllBooks = async (req, res) => {
  const { category } = req.query; // Filter based on query parameter

  try {
    let books;
    // If category is "recommended", fetch from the RecommendedBooks model
    if (category === 'recommended') {
      books = await RecommendedBook.find({});
    } 
    // If category is "self-help", fetch from the SelfHelpBooks model
    else if (category === 'selfmotivation') {
      books = await SelfMotivationbook.find({});
    } 
    else {
      // If no category is specified, fetch books from both models
      books = await RecommendedBook.find({}).concat(await SelfMotivationbook.find({}));
    }

    res.status(200).send({ data: books });
  } catch (error) {
    res.status(500).send({ message: "Error fetching books", error: error.message });
  }
};

//post a book
 router.post("/create-book", postABook)

//get all books


router.get("/recommendedBooks", getAllRecommendedBooks); // Get all recommended books
router.get("/selfMotivationBooks", getAllSelfMotivationBooks); // Get all self-motivation books

router.get("/:id", getSingleBook)

//update a book endpoint
router.put("/edit/:id",updateBook)

router.delete("/:id",deleteBook)




module.exports = router; 
