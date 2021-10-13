const express = require('express');
const debug = require('debug')('bookRoutes');
const chalk = require('chalk');

const bookRouter = express.Router();

const nav = [
    { link: '/books', title: 'Books' },
    { link: '/authors', title: 'Authors' }
]

const books = [
    {
        title: 'Sense and Sensibility',
        genre: 'Fiction',
        author: 'Jane Austen',
        read: false
    },
    {
        title: 'The secret Garden',
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

bookRouter.route('/').get((req, res) => {
    res.render('bookListView', {
        nav,
        title: 'Book List',
        books
    }, (err, html) => {
        if (err) {
            debug(chalk.red(err));
            return;
        }
        res.send(html);
    });
});

bookRouter.route('/:id').get((req, res) => {
    const id = req.params.id;
    res.render('bookView', {
        nav,
        title: 'Book',
        book: books[id]
    }, (err, html) => {
        if (err) {
            debug(chalk.red(err));
            return;
        }
        res.send(html);
    });
});

module.exports = bookRouter;