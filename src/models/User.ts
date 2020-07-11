import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import {secret} from '../auth/auth'
import {IUserDocument} from '../interfaces/IUserDocument';

const UserSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: [true, "can't be blank"], match: [/^[a-zA-Z]/, 'is invalid'] },
    hash: String,
    salt: String,
    type: { type: String, enum: ['admin', 'employee'] }
}, { timestamps: true });

export interface IUser extends IUserDocument{
    setPassword(passwd:string):void;
    validatePassword(passwd:string):boolean;
    generateJWT():string;
}
export interface IUserModel extends mongoose.Model<IUser>{

}
UserSchema.methods.setPassword = function (passwd: string): void {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(passwd, this.salt, 10000, 521, 'sha512').toString('hex');
}
UserSchema.methods.validatePassword = function (passwd: string): boolean {
    let hash = crypto.pbkdf2Sync(passwd, this.salt, 10000, 521, 'sha512').toString('hex');
    return this.hash === hash;
}
UserSchema.methods.generateJWT = function ():string {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: exp.getTime() / 1000
        }, secret);
}  

export const User:IUserModel= mongoose.model<IUser,IUserModel>('User',UserSchema);
