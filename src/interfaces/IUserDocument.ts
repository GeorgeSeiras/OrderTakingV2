import { Document } from 'mongoose';

export interface IUserDocument extends Document {
    name: string;
    type: string;
    hash: string;
    salt: string;
    password: string;
}