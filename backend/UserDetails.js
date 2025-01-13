const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
    {
        userName: String,
        contactNo: String,
        password: String,
        confirmPassword: String,
    },
    {
        collection: "UserDetails",
    }
)

mongoose.model("UserDetails", UserDetailsSchema);