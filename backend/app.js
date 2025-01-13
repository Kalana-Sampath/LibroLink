const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const bcrypt = require("bcryptjs")

const formidable = require('formidable');

const jwt = require("jsonwebtoken");

const mongoUrl = "mongodb+srv://root:root@librolink.sjcn6.mongodb.net/?retryWrites=true&w=majority&appName=LibroLink"

const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe"


mongoose
.connect(mongoUrl)
.then(() => {
    console.log("Database Connected");
})
.catch((e) => {
    console.log(e); 
});

require('./UserDetails')
const User = mongoose.model("UserDetails")

require('./RecommandedBooks')
const RecommandedBook = mongoose.model("RecommandedBooks")


app.get('/', (req,res) => {
    return res.status(200).send("Welcome Libro Link");
})

app.post("/register", async (req, res) => {
    const { userName, contactNo, password, confirmPassword } = req.body;
    console.log(req.body);
    

    // Encrypt the password using bcrypt
    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
        // Check if the user already exists
        const oldUser = await User.findOne({ userName: userName });

        if (oldUser) {
            // If user exists, return an error
            return res.send({ data: "User already exists !!"})
        }

        // If user doesn't exist, create a new user
        await User.create({
            userName: userName,
            contactNo: contactNo,
            password: encryptedPassword,
            confirmPassword: confirmPassword,
        });

        // Send success response
        res.send({ status: "ok", data: "User Created" });
    } catch (error) {
        // Send error response in case of an exception
        res.send({ status: "error", data: error });
    }
});

app.post("/login-user", async (req, res) => {
    const {userName, password} = req.body;
    const oldUser = await User.findOne({userName: userName})

    if (!oldUser) {
        return res.send({data: "user doesn't exists!!"})
    }
    if (await bcrypt.compare(password, oldUser.password)) {
        const token = jwt.sign({userName: oldUser.userName}, JWT_SECRET);

        if (res.status(201)){
            return res.send({status: "ok", data: token})
        } else {
            return res.send({error: "error"});
        }
    }
})

const addRecommandedBook = async () => {
    try {
      // Create a new instance of RecommandedBooks with the data
      const newBook = new RecommandedBook({
        id: "2",
        title: "The  Gatsby",
        author: "F. Scott Fitzgerald",
        price: "$15.99",
        image: "great_gatsby_cover.jpg",
        exchange: "No",
      });
  
      // Save the book to the database
      await newBook.save();
  
      
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  addRecommandedBook();

  app.get('/recommandedBooks', async (req, res) => {
    try {
        const data = await RecommandedBook.find({});
        res.send({ status: "ok", data: data });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


app.post('/upload', async (req, res) => {
    const form = formidable();

    // Parse the incoming form data
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error('Error parsing the files:', err);
            return res.status(500).json({ ok: false, error: 'Error parsing files' });
        }

        // Retrieve files
        const pdfFile = files.pdfFile; 
        const imageFile = files.imageFile;

        if (pdfFile) {
            const myPdf = pdfFile[0]; // Assuming single file upload
            console.log('Uploaded PDF file:', myPdf);
        }

        if (imageFile) {
            const myImage = imageFile[0]; // Assuming single file upload
            console.log('Uploaded image file:', myImage);
        }

        res.json({ ok: true, fields, files });
    });
});

app.post('/addBook', async (req, res) => {
    const { title, author, price, image, exchange } = req.body;

    if (!title || !author || !price || !image || !exchange) {
        return res.status(400).send({ status: "error", message: "All fields are required." });
    }

    const newBook = new MyList({ title, author, price, image, exchange });

    try {
        await newBook.save();
        res.status(201).send({ status: "ok", message: "Book added successfully!" });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});





app.listen(5001, ()=> {
    console.log("Node js server started.");
})

