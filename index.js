import express from 'express';
import {db} from './db/index.js';
import {eq} from 'drizzle-orm'; 
import {captionSchema} from './models/caption.schema.js';

const app = express();
const port = 3000;
app.use(express.json());


app.get('/',(req,res)=>{
  res.send("tthe main page is here welcome ")
})
app.get('/captions' , async(req,res)=>{
    try {
    const allcaptions = await db.select().from(captionSchema);
    res.json(allcaptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error occurred' });
  }
})

app.post('/captions', async(req,res)=>{
try{ 
  const {name,phone,vehicleType,numberPlate,status} = req.body;
  const newcaption = await db.insert(captionSchema).values({
   name,
   phone,
   vehicleType,
   numberPlate,
   status
  }).returning();
  res.status(201).json({
    message: 'captions created succesfully hav a nice journey',
    data: newcaption[0]
  })
}catch(error){
  console.log(error);
  res.status(400).json({
    error: ' some error occured please check again',
  })
}
});

app.get("/captions/:id" , async(req,res)=>{
  try{
  const {id} = req.params;
  const findcaption = await db.select().from(captionSchema).where(eq(captionSchema.id, id));
  res.status(200).json({
    message: ' here are the caption details',
    data: findcaption[0]
  })
}
catch(error){
     res.status(404).json({
      error: 'caption not found'
     })
}
})


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})