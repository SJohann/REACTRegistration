'use strict';

import path from 'path';
import Express from 'express';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import routes from './routes';

import bodyParser from 'body-parser';
import {login, logout, register} from './database/database';

// initialize the server and configure support for ejs templates
const app = new Express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));

// start the server
const port = process.env.PORT || 3000;
const env = process.env.BABEL_ENV || 'production';
//if (process.env.BABEL_ENV == 'production') {
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const config = require('../webpack.config.js')
    const compiler = webpack(config)

    app.use(webpackHotMiddleware(compiler))
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }))
//}

app.get('/', (req, res) => {
    match(
        {routes, location: req.url },
        (err, redirectLocation, renderProps) => {

            // in case of error display the error message
            if (err) {
                return res.status(500).send(err.message);
            }

            // in case of redirect propagate the redirect to the browser
            if (redirectLocation) {
                return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            }

            const indexPath = path.join(path.join(__dirname, 'static'), 'index-static.html');
            res.sendFile(indexPath);
        }
    );
});


/*---------------------------------------------------------
*
*   Definitions of APIs for Login, Registration
*
*----------------------------------------------------------*/
app.post("/api/login", (req, res) => {
    login(req.body.email, req.body.password, function(result) {
        res.json( result );
    });
});

app.post("/api/logout", (req, res) => {
    logout(req.body.email, function(result) {
        res.json( result );
    });
});

app.post("/api/register", (req, res) => {
    register(req.body, function(result) {
        res.json( result );
    });
});
/*------------------------ END ----------------------------*/

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
