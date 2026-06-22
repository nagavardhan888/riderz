import express from 'express';
import captainroute from './routes/captains.route.js'
import customerroute from './routes/customer.route.js'
const port = 3000;
const app = express()

app.use(express.json());


app.get('/',(req,res)=>{
  res.send("the main page is here welcome ")
})

app.use('/captains',captainroute)
app.use('/customers',customerroute)



app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})