import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    description: v.string(),
    tokenIdentifier: v.string(),
    fileId: v.id('_storage'),
    documentUrl: v.optional(v.string()),
  }).index('by_tokenIdentifier', ['tokenIdentifier']),
  chats: defineTable({
    documentId: v.id('documents'),
    tokenIdentifier: v.string(),
    isHuman: v.boolean(),
    text: v.string(),
  }).index('by_documentId_tokenIdentifier', ['tokenIdentifier', 'documentId']),
  notes: defineTable({
    tokenIdentifier: v.string(),
    note: v.string(),
    embedding: v.array(v.float64()),
  })
    .vectorIndex('by_embedding', {
      vectorField: 'embedding',
      dimensions: 1536,
      filterFields: ['tokenIdentifier'],
    })
    .index('by_tokenIdentifier', ['tokenIdentifier']),
});
