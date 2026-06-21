import {uuid, pgTable, serial, boolean, text, timestamp } from 'drizzle-orm/pg-core';
import {captainSchema} from './captain.schema.js';


const costumerSchema = pgTable('costumers',{
    id: uuid('id').primaryKey().defaultRandom(),
    name:text('name').notNull(),
    phone:text('phone').notNull().unique(),
    captainId: uuid('captain_id').references(()=> captainSchema.id).notNull(),
    createdAt: timestamp('created_at').defaultNow()
})

export {costumerSchema};