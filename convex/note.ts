import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { checkUser } from './users';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
async function embed(note: string) {
  const embeddings = await groq.embeddings.create({
    model: 'nomic-embed-text-v1_5',
    input: 'text',
  });
  return embeddings;
}
export const createNote = mutation({
  args: { note: v.string() },
  async handler(ctx, args) {
    const user = await checkUser(ctx);
    const embedding = await embed(args.note);
    console.log(embedding);
    console.log(5);
    // await ctx.db.insert('notes', {
    //   note: args.note,
    //   tokenIdentifier: user.tokenIdentifier,
    //   embedding: [],
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
