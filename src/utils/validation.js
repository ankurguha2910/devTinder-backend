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

module.exports = {validateData};