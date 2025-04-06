const express = require("express");

const app = new express();

// The callback functions defined inside each of the app.use() corresponding to the paths are known as request handler
// The following endpoint will handle the GET call to the path beginning with any string but ending with fly
app.get(/.*fly$/, (req, res) => {
    res.send({
        firstName: "Ankur",
        lastName: "Guha"
    });
});

//The following endpoint will only handle the GET call to the /user
app.get("/user", (req, res) => {
    //To get the query parameter from the request URL we use object req.query
    console.log(req.query);
    res.send({
        firstName: "Ankur",
        lastName: "Guha"
    });
});

//The following dynamic endpoint will only handle the GET call to the /user/{userid}
app.get("/user/:userid/:name/:password", (req, res) => {
    //Fetch any parameter from the request URL we use object req.params
    console.log(req.params);
    res.send({
        firstName: "Ankur",
        lastName: "Guha"
    });
});

//The following endpoint will only handle the POST call to the /user
app.post("/user", (req, res) => {
    res.send("Data successfully saved to the database!");
})

//The following endpoint will only handle the DELETE call to the /user
app.delete("/user", (req, res) => {
    res.send("Data deleted successfully!");
})

//The following endpoint will only handle the PUT call to the /user
app.put("/user", (req, res) => {
    res.send("User updated successfully!");
})

app.patch("/user", (req, res) => {
    res.send("Partially updated");
})

//The following endpoint will match all the HTTP method API calls to /test
app.use("/test", (req,res) => {
    res.send("Test request");
});

//The following endpoint will match all the HTTP method API calls to /xyz
app.use("/xyz", (req,res) => {
    res.send("Random request");
});

//The following endpoint will match all the HTTP method API calls to /hello
app.use("/hello", (req,res) => {
    res.send("Hello from server");
});

//The following endpoint will match all the HTTP method API calls to /
//The following endpoint has been kept at the last because order matters in terms of execution in Express.js.
app.use("/", (req,res) => {
    res.send("Welcome to Node.js");
});

app.listen(7001, () => {
    console.log("Server is up and running...")
});