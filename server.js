const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid'); //For generating ID's
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(methodOverride('_method'))

// Our fake database:
let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]

app.listen(3000, () => {
    console.log("Server Running");
})

app.get("/comments", (req, res) => {
    res.render("comments/index.ejs", { comments })

});

app.post("/comments", (req, res) => {
    const newItem = {
        id: uuid(),
        username: req.body.username,
        comment: req.body.comment
    }
    comments.push(newItem);
    res.redirect("/comments");

});

app.get("/comments/new", (req, res) => {
    res.render("comments/new.ejs", { comments })

});

app.get("/comments/:id", (req, res) => {
    const currId = req.params.id;
    const element = comments.find(element => element.id === currId);
    res.render("comments/show.ejs", element)
})
app.get("/comments/edit/:id", (req, res) => {
    const currId = req.params.id;
    const element = comments.find(element => element.id === currId);
    res.render("comments/edit.ejs", element)
})

app.patch("/comments/:id", (req, res) => {
    const currId = req.params.id;
    const element = comments.find(element => element.id === currId);
    element.comment = req.body.comment;
    console.log(req.body.comment);
    res.redirect("/comments");
})

app.delete("/comments/:id", (req, res) => {
    const currId = req.params.id;
    const element = comments.find(element => element.id === currId);
    comments = comments.filter(item => item.id !== element.id);
    res.redirect("/comments")
})

app.get("/tacos", (req, res) => {
    res.send("You have sent a get request");
})

app.post("/tacos", (req, res) => {
    const { type, quantity } = req.body;
    res.send(`You have ordered ${quantity} of ${type}`);
})