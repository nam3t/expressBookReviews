  // Delete a book review by the logged-in user
  const isbn = req.params.isbn;
  // Get username from JWT
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }
  const token = authHeader.split(" ")[1];
  let username;
  try {
    const decoded = jwt.verify(token, "secret_key");
    username = decoded.username;
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }
  if (!books[isbn].reviews[username]) {
    return res.status(404).json({ message: "Review by this user not found" });
  }
  delete books[isbn].reviews[username];
  return res.status(200).json({ message: "Review deleted successfully", reviews: books[isbn].reviews });
const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  // Login as a registered user
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  // Find user
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  // Generate JWT
  const token = jwt.sign({ username }, "secret_key", { expiresIn: "1h" });
  return res.status(200).json({ message: "Login successful", token });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  // Add or modify a book review
  const isbn = req.params.isbn;
  const review = req.query.review;
  // Get username from JWT
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }
  const token = authHeader.split(" ")[1];
  let username;
  try {
    const decoded = jwt.verify(token, "secret_key");
    username = decoded.username;
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
  if (!review) {
    return res.status(400).json({ message: "Review is required" });
  }
  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }
  // Add or update review
  books[isbn].reviews[username] = review;
  return res.status(200).json({ message: "Review added/updated successfully", reviews: books[isbn].reviews });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
