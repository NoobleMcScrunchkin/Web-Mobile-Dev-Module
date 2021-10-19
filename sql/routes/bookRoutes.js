const express = require('express');
const debug = require('debug')('bookRoutes');
const chalk = require('chalk');
const sql = require('mssql');

const bookRouter = express.Router();

const nav = [
    { link: '/books', title: 'Books' },
    { link: '/authors', title: 'Authors' }
];

bookRouter.route('/').get((req, res) => {
    (async function query() {
        const request = new sql.Request();
        const result = await request.query('SELECT * FROM books');
        debug(result);
        res.render('bookListView', {
            nav,
            title: 'Book List',
            books: result.recordset
        }, (err, html) => {
            if (err) {
                debug(chalk.red(err));
                return;
            }
            res.send(html);
        });
    })();
});

bookRouter.route('/:id').get((req, res) => {
    (async function query() {
        const id = req.params.id;
        const request = new sql.Request();
        const result = await request.input('id', sql.Int, id).query('SELECT * FROM books WHERE id = @id');
        debug(result);
        res.render('bookView', {
            nav,
            title: 'Book',
            book: result.recordset[0]
        }, (err, html) => {
            if (err) {
                debug(chalk.red(err));
                return;
            }
            res.send(html);
        });
    })();
});

module.exports = bookRouter;