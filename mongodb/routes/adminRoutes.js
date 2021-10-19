const express = require('express');
const debug = require('debug')('adminRoutes');
const mongoClient = require('mongodb').MongoClient;

const adminRouter = express.Router();

const books = [
    {
        title: 'Sense and Sensibility',
        genre: 'Fiction',
        author: 'Jane Austen',
        read: false
    },
    {
        title: 'The Secret Garden',
        genre: 'Children\'s Novel',
        author: 'Frances Hodgson Burnett',
        read: false
    },
    {
        title: 'The Sign of the Four',
        genre: 'Mystery',
        author: 'Sir Arthur Conan Doyle',
        read: false
    },
    {
        title: 'Les Miserables',
        genre: 'Historical Fiction',
        author: 'Victor Hugo',
        read: false
    },
    {
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Tolstoy',
        read: false
    },
];

adminRouter.route('/').get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbname = 'libraryApp';

    (async function mongo() {
        let client;
        try {
            client = await mongoClient.connect(url);
            debug('Connected to the mongodb server');
            
            const db = client.db(dbname);

            const response = await db.collection('books').insertMany(books);
            res.json(response);
        } catch(err) {debug(err);}
        client.close();
    })();
});

module.exports = adminRouter;