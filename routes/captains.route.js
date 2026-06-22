import express from 'express';
import {captainSchema} from '../models/captain.schema.js'
import {costumerSchema} from '../models/customer.schema.js'
import {db} from '../db/index.js'
import {eq} from "drizzle-orm"
const router = express()

router.get('/' , async(req,res)=>{
    try {
    const allcaptains = await db.select().from(captainSchema);
    res.json(allcaptains);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error occurred' });
  }
})

router.post('/', async(req,res)=>{
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

router.get("/:id" , async(req,res)=>{
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

router.put('/:id',async(req,res)=>{
  const {id} = req.params; 
  const updateddata = req.body;
  try{
    const updatedcaptain  = await
     db.update(captainSchema)
     .set(updateddata)
     .where(eq(captainSchema.id,id))
     .returning();
    return res.status(200).json({
      message:"updated the captain info",
      data:updatedcaptain[0],
     })
  }
  catch(error){
      return res.status(401).json({
        error:"please check the details once and please wait and try again"
      })
  }
})

router.delete('/:id', async(req,res)=>{
  try{ 
  const {id} = req.params;
  const deletecaptain = await db.delete(captainSchema).where(eq(captainSchema.id,id)).returning();
  if(deletecaptain.length == 0){
    res.status(404).json({
      error:"please select the caption"
    })
  }
      res.status(200).json({
    message:"captain successfully deleted",
    data:deletecaptain[0]
  })
}
catch (error) {
    console.error("Delete Error:", error); // Logs the actual error to your terminal for debugging
    return res.status(500).json({
      error: "Something went wrong"
    });
  }
})

router.get('/:id/customers' ,async(req,res)=>{
  const {id} = req.params;
  try{
     const captain = await db.select().from(captainSchema).where(eq(captainSchema.id ,id))
     const allcustomers = await db.select().from(costumerSchema).where(eq(costumerSchema.captainId,id));
     res.status(201).json({
      message:`these are the details of the captain`,
      captain:captain,
      data:allcustomers
     })
  }
  catch(error){
    res.status(404).json({
      error:"the page was getting error please wait and try again"
    })
  }
})


export default router;