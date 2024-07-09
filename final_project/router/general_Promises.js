const express = require("express");
const axios = require("axios");
const books = require("./booksdb.js");
const { isValid, users } = require("./auth_users.js");

const public_users = express.Router();

// Register new user
public_users.post("/register", (req, res) => {
  let uName = req.body.username;
  let pass = req.body.password;
  if (uName !== "" && pass !== "") {
    users.push({ username: uName, password: pass });
    return res.status(200).json({ message: "New user added" });
  } else {
    return res.status(400).json({ message: "Invalid User Name or Pass" });
  }
});

// Get the book list available in the shop
public_users.get("/", async function (req, res) {
  try {
    const response = await axios.get("https://api.example.com/books");
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching book list:", error);
    return res.status(500).json({ message: "Failed to fetch book list" });
  }
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", async function (req, res) {
  let isbn = req.params.isbn;
  try {
    const response = await axios.get(`https://api.example.com/books/${isbn}`);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error(`Error fetching book details for ISBN ${isbn}:`, error);
    return res.status(500).json({ message: `Failed to fetch book details for ISBN ${isbn}` });
  }
});

// Get book details based on author
public_users.get("/author/:author", async function (req, res) {
  let author = req.params.author;
  try {
    const response = await axios.get(`https://api.example.com/books?author=${author}`);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error(`Error fetching book details for author ${author}:`, error);
    return res.status(500).json({ message: `Failed to fetch book details for author ${author}` });
  }
});

// Get all books based on title
public_users.get("/title/:title", async function (req, res) {
  let title = req.params.title;
  try {
    const response = await axios.get(`https://api.example.com/books?title=${title}`);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error(`Error fetching book details for title ${title}:`, error);
    return res.status(500).json({ message: `Failed to fetch book details for title ${title}` });
  }
});

// Get book review
public_users.get("/review/:isbn", async function (req, res) {
  let isbn = req.params.isbn;
  try {
    const response = await axios.get(`https://api.example.com/books/${isbn}/review`);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error(`Error fetching reviews for ISBN ${isbn}:`, error);
    return res.status(500).json({ message: `Failed to fetch reviews for ISBN ${isbn}` });
  }
});

module.exports.general = public_users;
