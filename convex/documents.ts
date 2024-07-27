import { ConvexError, v } from 'convex/values';
import { action, mutation, query } from './_generated/server';
import { checkUser } from './users';
import { api } from '../convex/_generated/api';
import { Doc } from './_generated/dataModel';

import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // This is the default and can be omitted
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
export const getDocuments = query({
  async handler(ctx) {
    const userToken = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userToken) return [];
    const data = await ctx.db
      .query('documents')
      .withIndex('by_tokenIdentifier', (q) =>
        q.eq('tokenIdentifier', userToken)
      )
      .collect();

    return data;
  },
});
export const getDocument = query({
  args: {
    documentId: v.id('documents'),
  },
  async handler(ctx, args) {
    const userToken = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userToken) return {};
    const data = await ctx.db
      .query('documents')
      .filter((q) => q.eq(q.field('_id'), args.documentId))
      .first();
    if (!data) return null;
    if (data.tokenIdentifier !== userToken) return null;
    return data;
  },
});
export const createDocument = mutation({
  args: { title: v.string(), fileId: v.id('_storage') },
  async handler(ctx, args) {
    const user = await checkUser(ctx);
    const docUrl = await ctx.storage.getUrl(args.fileId);
    if (!docUrl) throw new Error('error , plz try again later');
    ctx.db.insert('documents', {
      title: args.title,
      tokenIdentifier: user.tokenIdentifier,
      fileId: args.fileId,
      documentUrl: docUrl,
    });
  },
});
export const askQuestion = action({
  args: {
    documentId: v.id('documents'),
    question: v.string(),
  },
  async handler(ctx, args) {
    const userToken = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userToken) throw new ConvexError('u must be logged in');
    const document = (await ctx.runQuery(api.documents.getDocument, {
      documentId: args.documentId,
    })) as Doc<'documents'>;
    if (!document) throw new ConvexError('document not found');
    const file = await ctx.storage.get(document.fileId);
    if (!file) throw new ConvexError('document not found');
    const message = await anthropic.messages.create({
      max_tokens: 1024,
      messages: [{ role: 'user', content: 'Hello, Claude' }],
      model: 'claude-3-opus-20240229',
    });
    return message;
    // console.log(message.content);
  },
});
