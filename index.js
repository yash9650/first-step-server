import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import methodoverride from 'method-override';
import session from 'express-session';
import diseaseRoute from './routes/disease.js';
import dataRoute from './routes/data.js';
import loginRoute from './routes/route.js';


dotenv.config();
const app = express();

app.set('view engine', 'ejs');
app.set('views');


function main() {
    return mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING,{
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
}

main().then(()=>{
    console.log('Database Connected');
}).catch((err)=>{
    console.log('Unable to Connect Database');
});


app.listen(process.env.PORT,()=>{
    console.log('Server Connected at port 6060')
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(methodoverride('_method'));
app.use(session({secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
        expires: 24 * 60 * 60 * 1000
    }
}));

app.use('/disease',diseaseRoute);
app.use('/data',dataRoute);
app.use('/',loginRoute);