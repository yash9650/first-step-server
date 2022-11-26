import route from './routes/route.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.listen(process.env.PORT,()=>{
    console.log('Server Connected at port 6060')
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


app.use('/',route);
app.set('view engine', 'ejs');
app.set('views');


async function main() {
    return await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING,{
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
}

main().then(()=>{
    console.log('Database Connected');
}).catch(()=>{
    console.log('Unable to Connect Database');
})



app.get('/home',(req,res)=>{
    console.log(req.query)
    // res.json({message: 'Done'});
    res.send('hello');
})