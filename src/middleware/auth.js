const adminAuth = (req, res, next) => {
    let token = "xyz"
    let isAuthorized = token === "xyz";
    if(!isAuthorized)
    {
        res.status(401).send("Admin unauthorized");
    }else{
        next();
    }
}

const userAuth = (req, res, next) => {
    let token = "xyz"
    let isAuthorized = token === "xyz";
    if(!isAuthorized)
    {
        res.status(401).send("User unauthorized");
    }else{
        next();
    }
}

module.exports = {adminAuth, userAuth};