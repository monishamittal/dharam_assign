const express = require('express');
const bodyParser = require('body-parser');
const route = require('./route/route');
const mongoose = require('mongoose');
const session = require("express-session")
const app = express();
app.use(bodyParser.json());

//----------session------
app.use(session({
    secret: "dharam",
    resave: false,
    saveUninitialized: false
}))

//----------mongoose connection--------------
mongoose.connect("mongodb+srv://functionup-radon:radon123@cluster0.q0p7q73.mongodb.net/dharamAssign-DB?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route);

//--------------server on port 5002---------------
const server = app.listen(process.env.PORT || 5002, function () {
    console.log('Server on port ' + (process.env.PORT || 5002))
});

//-----------graceful shutdown-----------
process.on('SIGINT', () => {
    console.log('SIGINT received')
    server.close(() => {
        console.log("server closed")
        mongoose.connection.close(false, () => {
            process.exit(0)
        })
    })
})
