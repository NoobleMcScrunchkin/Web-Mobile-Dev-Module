const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const debug = require('debug')('bookRoutes');
const chalk = require('chalk');

const bookRouter = express.Router();

const nav = [
    { link: '/books', title: 'Books' },
    { link: '/authors', title: 'Authors' }
]

bookRouter.route('/').get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbname = 'libraryApp';

    (async function mongo() {
        let client;
        try {
            client = await mongoClient.connect(url);
            debug('connected to mongodb server');

            const db = client.db(dbname);
            const col = await db.collection('books');
            const books = await col.find().toArray();

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
        } catch(err) {debug(err);}
    })();
});

bookRouter.route('/:id').get((req, res) => {
    const id = req.params.id;
    const url = 'mongodb://localhost:27017';
    const dbname = 'libraryApp';

    (async function mongo() {
        let client;
        try {
            client = await mongoClient.connect(url);
            client = await mongoClient.connect(url);
            debug('connected to mongodb server');

            const db = client.db(dbname);
            const col = await db.collection('books');
            const book = await col.findOne({ _id: new ObjectID(id)});

            debug(book);

            res.render('bookView', {
                nav,
                title: 'Book',
                book
            }, (err, html) => {
                if (err) {
                    debug(chalk.red(err));
                    return;
                }
                res.send(html);
            });
        } catch(err) {debug(err);}
    })();
});

module.exports = bookRouter;