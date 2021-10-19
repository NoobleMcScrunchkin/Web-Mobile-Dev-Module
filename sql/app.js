const express = require("express");
const morgan = require('morgan');
const sql = require('mssql');
const debug = require('debug')('app');
const path = require('path');
const chalk = require('chalk');

const port = process.env.PORT || 3000; 

const sqlconfig = {
    user: 'kieran',
    password: '2EMnNpKgDAT2lFQ0',
    server: 'uksouthsql.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'Library',
    options: {
        encrypt: true
    }
}

sql.connect(sqlconfig).catch(err => debug(err));

Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

const app = express();
app.use(morgan('tiny'));

app.set('views', './views');
app.set('view engine', 'pug');

app.use('/static', express.static('./static'));

const mainRouter = require('./routes/mainRoutes');
app.use('/', mainRouter);

const apiRouter = require('./routes/apiRoutes');
app.use('/api', apiRouter);

app.use((req, res) => {
    res.statusCode = 404;
    res.send("<html><body><h1>404 Not Found</h1></body></html>");
});

app.listen(port, () => {
    console.log(`listening on port ${chalk.green(port.toString())}`);
});
