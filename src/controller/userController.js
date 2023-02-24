const userModel = require("../model/userModel.js");

const createUser = async function (req, res) {
    try {
        const user = req.body;

        //------------checking email in db---------------------
        const verifyEmail = await userModel.findOne({ email: email })
        if (verifyEmail) return res.status(400).send({ status: false, message: "Email id is already used" })

        const userCreated = await userModel.create(user);
        res.status(201).send({ status: true, data: userCreated });
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};


const loginUser = async function (req, res) {
    try {
        let username = req.body.username;
        let password = req.body.password;

        const user = await userModel.findOne({ username: username, password: password });
        if (!user) return res.status(401).send({ status: false, message: "Provided EmailId or Password are invalid." });

        //----------using session after logged in------------
        req.session.loggedIn = 1
        res.redirect("/api/admin")
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};


const logoutUser = async function (req, res) {
    req.session.destroy()
    return res.status(200).send({ status: true, message: "user logged out" });
};


const adminUser = async function (req, res) {
    try {
        res.status(201).send({ message: "you are redirected to admin page" });
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};


module.exports = { createUser, loginUser, logoutUser, adminUser };