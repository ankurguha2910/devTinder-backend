const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true
    },
    emailID: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error("Invalid email address: "+value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        validate(value)
        {
            if(!validator.isStrongPassword(value))
            {
                throw new Error("Provide a strong password");
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value)
        {
            if(!['male','female','others'].includes(value)){
                throw new Error("Gender is not valid.");
            }
        }
    },
    photoURL :{
        type: String,
        default: "https://geographyandyou.com/images/user-profile.png",
        validate(value)
        {
            if(!validator.isURL(value))
            {
                throw new Error("Invalid Photo URL : "+ value);
            }
        }
    },
    about: {
        type: String,
        default: "This is a default about of the user."
    },
    skills: {
        type: [String]
    }
},{timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = { User }