import {uuid, pgTable, serial, boolean, text, timestamp } from 'drizzle-orm/pg-core';
import {captionSchema} from './caption.schema.js';


const costumerSchema = pgTable('costumers',{
    id: uuid('id').primaryKey().defaultRandom(),
    name:text('name').notNull(),
    phone:text('phone').notNull().unique(),
    captionId: uuid('caption_id').references(()=> captionSchema.id).notNull(),
    createdAt: timestamp('created_at').defaultNow()
})

export {costumerSchema};