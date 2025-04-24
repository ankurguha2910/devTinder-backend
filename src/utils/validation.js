const validator = require("validator");

const validateData = (req) => {
    const { firstName, lastName, emailID, password } = req.body;
    
    if(!firstName || !lastName)
    {
        throw new Error("Name is not valid");
    }else if(!validator.isEmail(emailID))
    {
        throw new Error("Email ID is not valid");
    }else if(!validator.isStrongPassword(password))
    {
        throw new Error("Password is not strong");
    }
}

const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "gender", "age", "skills", "photoURL", "about"];
    const isEditAllowed = Object.keys(req.body).every((field) => 
        allowedEditFields.includes(field)
    );
    const { firstName, lastName, gender, age, skills, photoURL, about } = req.body;
    if(age && age > 100)
    {
        throw new Error("Age cannot be greater than 100.");
    }else if(skills && skills.length > 10)
    {
        throw new Error("More than 10 skills cannot be added.");
    }else if(photoURL && !validator.isURL(photoURL))
    {
        throw new Error("The image link provided is not a valid URL")
    }else if(about && about.length > 80)
    {
        throw new Error("About can have a maximum of 80 characters.")
    }
    return isEditAllowed;
}

module.exports = {validateData, validateEditProfileData};