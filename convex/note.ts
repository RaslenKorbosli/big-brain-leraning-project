import { v } from 'convex/values';
import {
  action,
  internalAction,
  internalMutation,
  mutation,
  query,
} from './_generated/server';
import { checkUser } from './users';
import Groq from 'groq-sdk';
import { api, internal } from './_generated/api';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const createNote = mutation({
  args: { note: v.string() },
  async handler(ctx, args) {
    const user = await checkUser(ctx);
    const noteId = await ctx.db.insert('notes', {
      note: args.note,
      tokenIdentifier: user.tokenIdentifier,
      embedding: [],
    });
    // await ctx.scheduler.runAfter(0, internal.note.generateEmbedding, {
    //   note: args.note,
    //   noteId: noteId,
    // });
  },
});
export const patchEmbedding = internalMutation({
  args: { embedding: v.array(v.number()), noteId: v.id('notes') },
  async handler(ctx, args) {
    ctx.db.patch(args.noteId, { embedding: args.embedding });
  },
});
export async function embed(note: string) {
  const embeddings = await groq.embeddings.create({
    model: 'nomic-ai/nomic-embed-text-v1.5',
    input: note,
  });
  return embeddings.data[0].embedding as number[];
}
export const generateEmbedding = action({
  args: { note: v.string(), noteId: v.id('notes') },
  async handler(ctx, args) {
    const embedding = await embed(args.note);
    console.log(embedding);
    // ctx.runMutation(internal.note.patchEmbedding, {
    //   embedding: embedding,
    //   noteId: args.noteId,
    // });
  },
});

export const getNotes = query({
  async handler(ctx) {
    const user = await checkUser(ctx);
    return await ctx.db
      .query('notes')
      .withIndex('by_tokenIdentifier', (q) =>
        q.eq('tokenIdentifier', user.tokenIdentifier)
      )
      .order('desc')
      .collect();
  },
});
export const getNote = query({
  args: { noteId: v.id('notes') },
  async handler(ctx, args) {
    const user = await checkUser(ctx);
    return await ctx.db.get(args.noteId);
  },
});
export const deleteNote = mutation({
  args: { noteId: v.id('notes') },
  async handler(ctx, args) {
    const user = await checkUser(ctx);
    await ctx.db.delete(args.noteId);
  },
});
