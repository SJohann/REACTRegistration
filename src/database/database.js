
import mysql from 'mysql';
import path from 'path';

import dbConfig from './db.json';

import Sequelize from 'sequelize';

function connectToDB() {
    let sequelize = new Sequelize(
        dbConfig.database,
        dbConfig.username,
        dbConfig.password,
        {
            host: dbConfig.host,
            port: dbConfig.port,
            dialect: dbConfig.dialect
        }
    );

    sequelize.authenticate().then(function (err) {
        if (err) {
            console.log('There is connection in ERROR');

            return null;
        } else {
            console.log('Connection has been established successfully');

            return sequelize;
        }
    });

    return sequelize;
}

let db = connectToDB();

function addUser(params, callback) {
    let User = db.import(path.join(__dirname) + '/models/User');

    User
        .find({
            where: {email: params.email},
            attributes: ['email','password']
        })
        .then( function(user) {
            if(user == null) {
                User
                    .create({
                        email   : params.email,
                        fname   : params.fname,
                        lname   : params.lname,
                        addr    : params.addr,
                        city    : params.city,
                        stat    : params.stat,
                        zip     : params.zip,
                        phone   : params.phone,
                        password: params.password
                    })
                    .then(function() {
                        callback({ code:1, msg:"" });
                    })
                    .catch(function(err) {
                        callback({ code:-100, msg:"Invalid User data..." });
                    });
            }
            else {
                callback({ code:-1, msg:"The email is already registered..." });
            }
        });
}

function validateLogin(email, password, callback) {

    if(db == null) {
        callback({ code:-100, msg:"No Database Connection..." });
        return;
    }

    let User = db.import(path.join(__dirname) + "/models/User");

    User
        .find({
            where: {email: email},
            attributes: ['email','password']
        })
        .then( function(user) {
            let code = 1;
            let msg  = "";

            if(user == null) {
                code = -1;
                msg  = 'Invalid email';
            }
            else if(user.password == password) {
                code = 1;
                msg  = '';
            }
            else {
                code = -2;
                msg  = 'Invalid password';
            }

            callback({ code:code, msg:msg });
        })
        .catch(function(err) {
            callback({ code:-100, msg:"DB Error" });
        });
}

export function login(email, password, callback) {
    validateLogin(email, password, function(result) {
        callback(result);
    });
}


export function logout(email, callback) {
    callback({ code:1, msg:"" });
}


export function register(userInfo, callback) {
    addUser(userInfo, function(result) {
        callback(result);
    });
}