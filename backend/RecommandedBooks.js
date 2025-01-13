const mongoose = require("mongoose");

const RecommandedBooksSchema = new mongoose.Schema(
    {
            id: String,
            title: String,
            author: String,
            price: String ,
            image: String,
            exchange: String,
    },
    {
        collection: "RecommandedBooks",
    }
)

mongoose.model("RecommandedBooks", RecommandedBooksSchema);