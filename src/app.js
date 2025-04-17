const express = require("express");
const { connectDB } = require("./config/database");
const { User } = require("./models/user");
const app = express();

app.use(express.json());

//Signup API - POST /signup - registers a new user into the database
app.post("/signup", async (req, res, next) => {
    try{
        const data = req.body;
        if(data.skills?.length > 10)
        {
            throw new Error("Skill cannot be greater than 10");
        }
        if((data.age) && data.age > 100)
        {
            throw new Error("Age cannot be greater than 100");
        }
        //Creating a new instance of the User model
        const user = new User(data);
        await user.save();
        res.status(200).send("User added successfully");
    }catch(err) {
        res.status(400).send(err.message)
    }  
})

//Feed API GET - /feed - get all the registered users from the database
app.get("/feed", async (req, res) => {
    try { 
        const users = await User.find({});
        if(users.length !== 0)
        {
            res.status(200).send(users);
        }
        else
        {
            throw new Error("User not found");
        }
    } catch (error) 
    {
        res.status(401).send(error.message);
    }
});

//Fetch specific user with emailID
app.get("/profile", async (req, res) => {
    try {
        let userEmailID = req.body.emailID;
        // If there are multiple records with same emailID, the oldest document is returned
        const user = await User.findOne({emailID: userEmailID});
        if(user === null)
        {
            throw new Error("User not found");
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(401).send(error.message);
    }
})

//Delete a specific user with userID
app.delete("/profile", async (req, res) => {
    try {
        const userID = req.body.userID;
        await User.findByIdAndDelete(userID);
        res.status(200).send("User deleted successfully");
    } catch (error) {
        res.status(401).send(error.message);
    }
})

//Update a specific user with emailID
app.patch("/profile/:emailID", async (req, res) => {
    try {
        const allowedUpdates = ["firstName", "lastName", "age", "skills", "about", "photoURL"];
        const useremailID = req.params.emailID;
        const data = req.body;
        const keys = Object.keys(data);
        const isValidKeys = keys.every((k) => allowedUpdates.includes(k));
        if(!isValidKeys)
        {
            throw new Error("User cannot be updated.");
        }
        if(data.skills?.length > 10)
        {
            throw new Error("Skill cannot be greater than 10");
        }
        if((data.age) && data?.age > 100)
        {
            throw new Error("Age cannot be greater than 100");
        }
        const updatedUser = await User.findOneAndUpdate({emailID: useremailID}, data, {returnDocument: 'after', runValidators: true});
        if( updatedUser === null){
            throw new Error("User not found");
        }
        res.status(200).send("User updated successfully.")
    } catch (error) {
        res.status(401).send(error.message);
    }
})

connectDB()
.then(() => {
    console.log("Databse connection established successfully.");
    app.listen(8888, () => {
        console.log("Server is listening on port 8888...");
    });
})
.catch((err) => {
    console.log(err.message);
})