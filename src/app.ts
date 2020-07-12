import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as session from 'express-session';
import { router } from './routes/index';
import './models/Table';
import './models/Order';
import './models/User';

const routes = require("./routes/tables")

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", router);
app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

app.use(function (err: express.ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...');
    }
});
app.use(function (req, res, next) {
    let err: any = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
        'errors': {
            message: err.message,
            error: err
        }
    });
});
const connection = 'mongodb+srv://user:user@cluster0.wsqb7.mongodb.net/Caffe?retryWrites=true&w=majority';
mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});