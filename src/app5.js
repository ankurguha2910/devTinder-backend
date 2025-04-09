const express = require("express");

const app = express();

app.use("/", (err, req, res, next) => {
    if(err)
    {
        res.status(500).send("Some error occoured");
    }
})

app.use("/getUserData", (req, res) => {
    throw new Error("hgfhjghj");
    res.send("User details sent successfully");
})

//wild card ("/") error handling - should always be written at the end
app.use("/", (err, req, res, next) => {
    if(err)
    {
        res.status(500).send("Something went wrong");
    }
})

app.listen(6000, () => {
    console.log("Server listening on 6000...");
})