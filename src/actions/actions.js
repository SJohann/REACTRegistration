'use strict';

import axios from 'axios';

export const GET_DATA = 'GET_DATA';
export const NONE_DATA = 'NONE_DATA';

let endPoint = "http://localhost:3000/api";

export function initData() {
    return dispatch => {
        return dispatch(
            showData({
                app_status  : 0,
                reg_status  : 0,
                code        : "",
                msg         : ""
            })
        );
    };
}

export function refreshData(app_status) {
    return dispatch => {
        return dispatch(
            showData({
                app_status  : app_status,
                reg_status  : 0,
                code        : "",
                msg         : ""
            })
        );
    };
}

export function sendLogin(email, password) {
    return dispatch => {
        axios
            .post(
                endPoint + '/login',
                { email:email, password:password }
            )
            .then(response => {
                let app_status = (response.data['code'] == 1) ? 1 : 0;
                return dispatch(
                    showData({
                        app_status  : app_status,
                        reg_status  : 0,
                        code        : response.data['code'],
                        msg         : response.data['msg']
                    })
                );
            })
            .catch(error => {
                console.log(error);

                return dispatch(
                    showData({
                        app_status  : 0,
                        reg_status  : 0,
                        code        : "500",
                        msg         : "No response...."
                    })
                );
            });
    }
}

export function sendLogout(app_status, email) {
    return dispatch => {
        axios
            .post(
                endPoint + '/logout',
                { email:email }
            )
            .then(response => {
                let app_status = (response.data['code'] == 1) ? 0 : 1;
                return dispatch(
                    showData({
                        app_status  : app_status,
                        reg_status  : 0,
                        code        : response.data['code'],
                        msg         : response.data['msg']
                    })
                );
            })
            .catch(error => {
                console.log(error);
                return dispatch(
                    showData({
                        app_status  : app_status,
                        reg_status  : 0,
                        code        : "500",
                        msg         : "No response...."
                    })
                );
            });
    }
}

export function sendRegister(app_status, email, password, fname, lname, addr, city, stat, zip, phone) {
    return dispatch => {
        axios
            .post(
                endPoint + '/register',
                {
                    email   : email,
                    password: password,
                    fname   : fname,
                    lname   : lname,
                    addr    : addr,
                    city    : city,
                    stat    : stat,
                    zip     : zip,
                    phone   : phone
                }
            )
            .then(response => {
                let reg_status = (response.data['code'] == 1) ? 1 : 0;
                return dispatch(
                    showData({
                        app_status  : app_status,
                        reg_status  : reg_status,
                        code        : response.data['code'],
                        msg         : response.data['msg']
                    })
                );
            })
            .catch(error => {
                console.log(error);

                return dispatch(
                    showData({
                        app_status  : app_status,
                        reg_status  : 0,
                        code        : "500",
                        msg         : "No response...."
                    })
                );
            });
    }
}

export function showData(data) {
    if(data != null) {
        return {
            type : GET_DATA,
            data : data
        }
    }
    else {
        return {
            type : NONE_DATA,
            data : data
        }
    }
}
