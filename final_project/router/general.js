const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  let uName = req.body.username;
  let pass = req.body.password;
  if (uName!="" && pass!="") {
    users.push({ username: uName, password: pass });
    return res.status(200).json({ message: "New user added" });
  } else {
    return res.status(400).send({ message: "Invalid User Name or Pass" });
  }
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here
  return res.status(200).send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  let isbn = req.params.isbn;
  let book = books[isbn];
  return res.status(300).json(book);
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  let author = req.params.author;
  let keys = Object.keys(books);
  let book;
  keys.forEach((ind) => {
    if (books[ind].author === author) book = books[ind];
  });

  return res.status(200).json(book);
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  let title = req.params.title;
  let keys = Object.keys(books);
  let book;
  keys.forEach((ind) => {
    if (books[ind].title === title) book = books[ind];
  });

  return res.status(200).json(book);
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  let book = books[isbn].reviews;
  return res.status(200).json(book);
});

module.exports.general = public_users;
