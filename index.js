import express from 'express';
import {db} from './db/index.js';
import {users} from './db/schema.js';

const app = express();
const port = 3000;
app.use(express.json());

app.get('/costumer' , async(req,res)=>{
    try {
    const allUsers = await db.select().from(users);
    res.json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error occurred' });
  }
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})