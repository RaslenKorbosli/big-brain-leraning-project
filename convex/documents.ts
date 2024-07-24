import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { checkUser } from './users';

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
export const createDocument = mutation({
  args: { title: v.string() },
  async handler(ctx, args) {
    const user = await checkUser(ctx);
    ctx.db.insert('documents', {
      title: args.title,
      tokenIdentifier: user.tokenIdentifier,
    });
  },
});
