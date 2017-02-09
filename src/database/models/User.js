"use strict";

module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define(
        "tbl_user",
        {
            email   : { type: DataTypes.STRING, allowNull:false, validate:{isEmail: true, notEmpty: false} },
            fname   : { type: DataTypes.STRING, allowNull:false, validate:{notEmpty: false} },
            lname   : { type: DataTypes.STRING, allowNull:false, validate:{notEmpty: false} },
            addr    : { type: DataTypes.STRING, allowNull:false, validate:{notEmpty: false} },
            city    : { type: DataTypes.STRING, allowNull:false, validate:{notEmpty: false} },
            stat    : { type: DataTypes.STRING, allowNull:false, validate:{notEmpty: false} },
            zip     : { type: DataTypes.STRING, allowNull:false, validate:{notEmpty: false} },
            phone   : { type: DataTypes.STRING, allowNull:false, validate:{notEmpty: false} },
            password: { type: DataTypes.STRING, allowNull:false, validate:{notEmpty: false} }
        }
    );

    return User;
};