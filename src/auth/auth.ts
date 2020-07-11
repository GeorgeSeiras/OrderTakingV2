import * as express from 'express';
import * as jwt from 'express-jwt';

export const secret: string = 'secret';

function getTokenFromHeader(req: express.Request): string {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
        req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}

export let auth = {
    required: jwt({
        secret: secret,
        userProperty: 'payload',
        getToken: getTokenFromHeader,
        algorithms: ['HS256']
    }),
}