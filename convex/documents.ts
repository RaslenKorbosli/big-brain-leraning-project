import { ConvexError, v } from 'convex/values';
import {
  action,
  internalAction,
  internalMutation,
  mutation,
  query,
} from './_generated/server';
import { checkUser } from './users';
import { api, internal } from '../convex/_generated/api';
import { Doc } from './_generated/dataModel';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
export const getDocuments = query({
  async handler(ctx) {
    const userToken = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userToken) return undefined;
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
    const documentId = await ctx.db.insert('documents', {
      title: args.title,
      tokenIdentifier: user.tokenIdentifier,
      fileId: args.fileId,
      documentUrl: docUrl,
      description: '',
    });
    ctx.scheduler.runAfter(0, internal.documents.generateDescription, {
      documentId,
      fileId: args.fileId,
    });
  },
});
export const deleteDocument = mutation({
  args: { documentId: v.id('documents'), fileId: v.id('_storage') },
  async handler(ctx, args) {
    const user = await checkUser(ctx);
    await ctx.storage.delete(args.fileId);
    await ctx.db.delete(args.documentId);
  },
});
export const generateDescription = internalAction({
  args: {
    documentId: v.id('documents'),
    fileId: v.id('_storage'),
  },
  async handler(ctx, args) {
    const file = await ctx.storage.get(args.fileId);
    if (!file) throw new ConvexError('document not found');
    const fileText = await file.text();
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `giving the following text file ${fileText}`,
        },
        {
          role: 'user',
          content: `please generate one sentence description for the document without saying" Here is a one-sentence description for the document"or anything like that, just a simple description`,
        },
      ],
      model: 'llama3-8b-8192',
    });
    const description =
      chatCompletion.choices[0]?.message?.content ||
      'could not generate the response';
    console.log(description);
    await ctx.runMutation(internal.documents.createDescription, {
      documentId: args.documentId,
      description: description,
    });
  },
});
export const createDescription = internalMutation({
  args: { documentId: v.id('documents'), description: v.string() },
  async handler(ctx, args) {
    ctx.db.patch(args.documentId, { description: args.description });
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
    const fileText = await file.text();
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `giving the following text file ${fileText}`,
        },
        {
          role: 'user',
          content: `please help to answer the question ${args.question}`,
        },
      ],
      model: 'llama3-8b-8192',
    });
    //store the chat of user
    await ctx.runMutation(internal.chats.createChatRecord, {
      documentId: args.documentId,
      text: args.question,
      tokenIdentifier: userToken,
      isHuman: true,
    });
    //store the chat of chat ai
    const text =
      chatCompletion.choices[0]?.message?.content ||
      'could not generate the response';
    await ctx.runMutation(internal.chats.createChatRecord, {
      documentId: args.documentId,
      text: text,
      tokenIdentifier: userToken,
      isHuman: false,
    });
    return text;
  },
});
