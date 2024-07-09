const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
  {
    userName: "test1@test.com",
    password: "pass123",
  },
];

const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
  let user = users.filter((user) => {
    return user.userName === username && user.password === password;
  });
  if (user.length > 0) return true;
  else return false;
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  let username = req.body.userName;
  let pass = req.body.password;
  
  if (authenticatedUser(username, pass)) {
    let token = jwt.sign({ username }, "the_secret", { expiresIn: 60 * 60 });
    req.session.authorization = {
      token,
      username,
    };
    res.status(200).json({ message: "Logged in successfully" });
  } else {
    return res.status(300).json({ message: "Invalid Login creds" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  let isbn = req.params.isbn;
  let review = req.query.review;
  let username = req.session.authorization.username;
  console.log("IN ADD REVIEW" + username);
  books[isbn]["reviews"][username] = review;
  return res.status(200).json({ message: "Added new review to for the Book" });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  //Write your code here
  let isbn = req.params.isbn;
  let username = req.session.authorization.username;
  delete books[isbn]["reviews"][username];
  return res
    .status(200)
    .json({ message: "Deleted the review by the" + username });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
