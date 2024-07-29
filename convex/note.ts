import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { checkUser } from './users';

export const createNote = mutation({
  args: { note: v.string() },
  async handler(ctx, args) {
    const user = await checkUser(ctx);
    await ctx.db.insert('notes', {
      note: args.note,
      tokenIdentifier: user.tokenIdentifier,
    });
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
