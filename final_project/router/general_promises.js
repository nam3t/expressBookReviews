const axios = require('axios');
const express = require('express');
let books = require('./booksdb.js');
const public_users = express.Router();

// Get the book list available in the shop using Promise callback
public_users.get('/promise-books', function (req, res) {
  new Promise((resolve, reject) => {
    resolve(books);
  })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving books' });
    });
});

// Get the book list available in the shop using async-await with Axios
public_users.get('/async-books', async function (req, res) {
  try {
    // Simulate fetching from an API endpoint (here, just local)
    // If you had a real API, you could use: await axios.get('http://api-url/books')
    const response = await axios.get('http://localhost:5000/');
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving books with Axios' });
  }
});

module.exports.general = public_users;
