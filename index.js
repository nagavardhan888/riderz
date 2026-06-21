import express from 'express';
import {db} from './db/index.js';
import {eq} from 'drizzle-orm'; 
import {captainSchema} from './models/captain.schema.js';
import {costumerSchema} from './models/customer.schema.js';

const app = express();
const port = 3000;
app.use(express.json());

// Add this right after express.json()
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error("Intercepted malformed JSON payload:", err.message);
    return res.status(400).json({ 
      error: "Malformed JSON payload. Please ensure you are sending valid JSON without extra wrapping quotes." 
    });
  }
  next();
});

app.get('/',(req,res)=>{
  res.send("tthe main page is here welcome ")
})
app.get('/captains' , async(req,res)=>{
    try {
    const allcaptains = await db.select().from(captainSchema);
    res.json(allcaptains);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error occurred' });
  }
})

app.post('/captains', async(req,res)=>{
try{ 
  const {name,phone,vehicleType,numberPlate,status} = req.body;
  const newcaptain = await db.insert(captainSchema).values({
   name,
   phone,
   vehicleType,
   numberPlate,
   status
  }).returning();
  res.status(201).json({
    message: 'captains created succesfully hav a nice journey',
    data: newcaptain[0]
  })
}catch(error){
  console.log(error);
  res.status(400).json({
    error: ' some error occured please check again',
  })
}
});

app.get("/captains/:id" , async(req,res)=>{
  try{
  const {id} = req.params;
  const findcaptain = await db.select().from(captainSchema).where(eq(captainSchema.id, id));
  res.status(200).json({
    message: ' here are the captain details',
    data: findcaptain[0]
  })
}
catch(error){
     res.status(404).json({
      error: 'captain not found'
     })
}
})
app.get('/customers', async(req,res)=>{
  try{
   const customers = await db.select().from(costumerSchema);
   res.status(200).json(customers)
   console.log(customers)
  }
  catch(error){
    res.status(500).json({
      error: 'route was expired or something went wrong please wait and try again'
    })
  }

 
})

app.post('/customers', async(req,res)=>{
  const {name,phone,captainId} = req.body;
  try{
      const newCustomer = await db.insert(costumerSchema).values({
    name,
    phone,
    captainId
  }).returning();

  res.status(201).json({
    message: ' customer created succesfully thanks for choosing Ridert please enjoy the ride',
    data: newCustomer[0],
    
  }).returning()
  }
  catch(error){
    res.status(401).json({
      error:'please check the details something went wrong'
    })
  }

})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})