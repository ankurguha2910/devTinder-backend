const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        const cookie = req.cookies;
        const { token } = cookie;
        if(!token)
        {
            throw new Error("Token is invalid");
        }

        const decodedData = await jwt.verify(token, "*Kolkata2025");
        const {_id} = decodedData;
        const user = await User.findById({_id});
        if(!user)
        {
            throw new Error("User not found");
        }
        req.user = user;//attach the user found from the database to the request object
        next();//next() is used to move to the request handler
    } catch (error) {
        res.status(401).send("ERROR : " + error.message);
    }
    
}

module.exports = {userAuth};