const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require('./models/User');
const passport = require('passport');

const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log((err)));

app.get("/", (req, res) => {
    const user = new User({
        handle: "nick",
        email: "nick@example.com",
        password: "password"
    })
    user.save();
    res.send("Wake up Neo!!!");

app.use(passport.initialize());
require('./config/passport')(passport);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/tweets", tweets);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));