import express from 'express'
import {costumerSchema} from '../models/customer.schema.js'
import {db} from '../db/index.js'
import {eq} from "drizzle-orm"
const router = express()

router.get('/', async(req,res)=>{
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

router.post('/', async(req,res)=>{
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

router.get('/:id', async(req,res)=>{
    try{ 
  const {id} = req.params;
  const constumer = await db.select().from(costumerSchema).where(eq(costumerSchema.id,id))
 if (constumer.length === 0) {
      return res.status(404).json({ // Tip: 404 is the standard status code for "Not Found"
        error: "the customer is not found please try again"
      });
    }
    return res.status(200).json({
      message:"fetched the costumer successfully",
      data:constumer[0],
    })
  
}catch(error){
 return res.status(500).json({
    error:"server was busy please wait and try agian"
  })
}
})

router.put('/:id', async(req,res)=>{
  const {id} = req.params;
  const updatedbody = req.body;
  try{
     const updatedcustomer = await db
     .update(costumerSchema)
     .set(updatedbody)
     .where(eq(costumerSchema.id,id))
     .returning()

     res.status(200).json({
      message:"the customer details were updated succesfully",
      data: updatedcustomer[0]
     })
  }
  catch(error){
   res.status(401).json({
    error:"please check the details once and please try again"
   })
  }
})

export default router;