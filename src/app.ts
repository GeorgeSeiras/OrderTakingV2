import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import * as cors from 'cors';
import './models/Table';
import './models/Order';

const routes = require("./routes/tables")

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/",require('./routes'));



const connection = 'mongodb+srv://user:user@cluster0.wsqb7.mongodb.net/Caffe?retryWrites=true&w=majority';
mongoose.connect(connection,{useNewUrlParser: true, useUnifiedTopology: true })

app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
});