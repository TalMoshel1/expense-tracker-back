const express = require('express');
const app = express();
const port = 3000;
const connectToDb = require('./db-helper/connectToDb.js');
const usersRouter = require('./routes/users.js');


connectToDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch(error => {
        console.error('Error connecting to DB:', error);
    });


app.use(express.json());
app.use('/users', usersRouter);

module.exports = { app };
