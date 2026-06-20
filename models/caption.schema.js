import {uuid, pgTable, serial, boolean, text, timestamp } from 'drizzle-orm/pg-core';
 const captionSchema = pgTable('captions',{
   id: uuid('id').primaryKey().defaultRandom(),
   name:text('name').notNull(),
   phone:text('phone').notNull().unique(),
   vehicleType:text('vehicle_type').notNull(),
   numberPlate:text('number_plate').notNull().unique(),
   status:text('status').notNull(),
    createdAt: timestamp('created_at').defaultNow(),

})
export {captionSchema};
