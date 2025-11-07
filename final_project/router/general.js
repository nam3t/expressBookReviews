// Get book details by title using Promise callback
public_users.get('/promise/title/:title', function (req, res) {
  const title = req.params.title;
  new Promise((resolve, reject) => {
    const bookKeys = Object.keys(books);
    const results = [];
    for (let key of bookKeys) {
      if (books[key].title.toLowerCase() === title.toLowerCase()) {
        results.push({ isbn: key, ...books[key] });
      }
    }
    if (results.length > 0) {
      resolve(results);
    } else {
      reject('No books found with this title');
    }
  })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(404).json({ message: err });
    });
});

// Get book details by title using async-await with Axios
public_users.get('/async/title/:title', async function (req, res) {
  const title = req.params.title;
  try {
    // Simulate fetching from an API endpoint (here, just local)
    // If you had a real API, you could use: await axios.get('http://api-url/title/' + title)
    const response = await axios.get(`http://localhost:5000/title/${title}`);
    res.status(200).json(response.data);
  } catch (err) {
    res.status(404).json({ message: 'No books found with this title with Axios' });
  }
});
// Get book details by author using Promise callback
public_users.get('/promise/author/:author', function (req, res) {
  const author = req.params.author;
  new Promise((resolve, reject) => {
    const bookKeys = Object.keys(books);
    const results = [];
    for (let key of bookKeys) {
      if (books[key].author.toLowerCase() === author.toLowerCase()) {
        results.push({ isbn: key, ...books[key] });
      }
    }
    if (results.length > 0) {
      resolve(results);
    } else {
      reject('No books found for this author');
    }
  })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(404).json({ message: err });
    });
});

// Get book details by author using async-await with Axios
public_users.get('/async/author/:author', async function (req, res) {
  const author = req.params.author;
  try {
    // Simulate fetching from an API endpoint (here, just local)
    // If you had a real API, you could use: await axios.get('http://api-url/author/' + author)
    const response = await axios.get(`http://localhost:5000/author/${author}`);
    res.status(200).json(response.data);
  } catch (err) {
    res.status(404).json({ message: 'No books found for this author with Axios' });
  }
});
const axios = require('axios');
// Get book details by ISBN using Promise callback
public_users.get('/promise/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  new Promise((resolve, reject) => {
    const book = books[isbn];
    if (book) {
      resolve(book);
    } else {
      reject('Book not found');
    }
  })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(404).json({ message: err });
    });
});

// Get book details by ISBN using async-await with Axios
public_users.get('/async/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;
  try {
    // Simulate fetching from an API endpoint (here, just local)
    // If you had a real API, you could use: await axios.get('http://api-url/isbn/' + isbn)
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    res.status(200).json(response.data);
  } catch (err) {
    res.status(404).json({ message: 'Book not found with Axios' });
  }
});
const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  // Register a new user
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  // Check if username already exists
  if (users.some(user => user.username === username)) {
    return res.status(409).json({ message: "Username already exists" });
  }
  // Add new user
  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully" });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  // Return the list of all books, pretty-printed
  return res.status(200).send(JSON.stringify(books, null, 2));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  // Get book details by ISBN
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    return res.status(200).json(book);
  } else {
    return res.status(404).json({message: "Book not found"});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  // Get book details by author
  const author = req.params.author;
  const bookKeys = Object.keys(books);
  const results = [];
  for (let key of bookKeys) {
    if (books[key].author.toLowerCase() === author.toLowerCase()) {
      results.push({ isbn: key, ...books[key] });
    }
  }
  if (results.length > 0) {
    return res.status(200).json(results);
  } else {
    return res.status(404).json({message: "No books found for this author"});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  // Get book details by title
  const title = req.params.title;
  const bookKeys = Object.keys(books);
  const results = [];
  for (let key of bookKeys) {
    if (books[key].title.toLowerCase() === title.toLowerCase()) {
      results.push({ isbn: key, ...books[key] });
    }
  }
  if (results.length > 0) {
    return res.status(200).json(results);
  } else {
    return res.status(404).json({message: "No books found with this title"});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  // Get book reviews by ISBN
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    return res.status(200).json(book.reviews);
  } else {
    return res.status(404).json({message: "Book not found"});
  }
});

module.exports.general = public_users;
