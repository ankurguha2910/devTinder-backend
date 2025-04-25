const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
            if(!['Male','Female','Others'].includes(value)){
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

userSchema.index({firstName: 1, lastName: 1});
//schema method to genrate JWT
userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({_id: user.id}, "*Kolkata2025", {expiresIn : "7d"});
    return token;
}

//schema method to compare password
userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const hashPassword = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, hashPassword);
    return isPasswordValid;
}

const User = new mongoose.model("User", userSchema);

module.exports = { User }