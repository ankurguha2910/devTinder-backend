const express = require("express");
const { connectDB } = require("./config/database");
const { User } = require("./models/user");
const app = express();

app.use(express.json());

//Signup API - POST /signup - registers a new user into the database
app.post("/signup", async (req, res, next) => {
    try{
        //Creating a new instance of the User model
        const user = new User(req.body);
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
            res.status(404).send("No user found");
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
        console.log(user);
        if(user !== null)
        {
            res.status(200).send(user);
        }else
        {
            res.status(404).send("User not found");
        }
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
app.patch("/profile", async (req, res) => {
    try {
        const useremailID = req.body.emailID;
        const data = req.body;
        const updatedUser = await User.findOneAndUpdate({emailID: useremailID}, data, {returnDocument: 'after'});
        console.log(updatedUser);
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