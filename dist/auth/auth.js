"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.secret = void 0;
const jwt = require("express-jwt");
exports.secret = 'secret';
function getTokenFromHeader(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
        req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}
exports.auth = {
    required: jwt({
        secret: exports.secret,
        userProperty: 'payload',
        getToken: getTokenFromHeader,
        algorithms: ['HS256']
    }),
};
