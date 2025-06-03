// const express = require('express');
import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 4000;

import { insert_data,get_data } from "./config/database.js";

// app.get('/signup', (req, res) => {
//     res.send('You are on the signup page')
// });

// app.get("/login", (req, res) => {
//   res.send("You are on the login page");
// });

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // <-- make sure this exists


app.get("/todo_add", (req, res) => {
    res.render("todo.ejs");
})

app.post("/added", (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    insert_data(title, description);
    res.redirect("/todo_list");
});

app.get("/todo_list", async (req, res) => {
    const rows = await get_data();
    res.render("todo_list.ejs" , {rows});
})

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } 
    else {
        console.log(`I am listening at ${PORT}`);
    }
})