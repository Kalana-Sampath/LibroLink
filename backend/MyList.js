const mongoose = require('mongoose');

const MyListSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    exchange: { type: String, required: true },
}, { timestamps: true });

const MyList = mongoose.model("MyList", MyListSchema);

module.exports = MyList;