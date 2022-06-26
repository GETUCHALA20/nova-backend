import express from 'express';
import route from './src/routes'
require('dotenv').config()

const app = express();

route(app);

const port = process.env.PORT || 5002;

app.listen(port, () => {
    console.log('App is now running at port ', port)
})

module.exports = app;