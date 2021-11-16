const express = require('express');
const debug = require('debug')('mainRoutes');
const chalk = require('chalk');

const bookRouter = require('./bookRoutes');

const nav = [
    { link: '/books', title: 'Books' },
    { link: '/authors', title: 'Authors' }
]

main = express.Router();

main.get('/', async (req, res) => {
    res.render('index', {
        nav,
        title: 'Library'
    }, (err, html) => {
        if (err) {
            debug(chalk.red(err));
            return;
        }
        res.send(html);
    });
});

main.use('/books', bookRouter);

module.exports = main;