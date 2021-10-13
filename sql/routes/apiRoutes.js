const express = require('express');
const api = express.Router();

api.get('/', async (req, res) => {
    res.statusCode = 403;
    res.send("<html><body><h1>403 Forbidden</h1></body></html>");
});

module.exports = api;