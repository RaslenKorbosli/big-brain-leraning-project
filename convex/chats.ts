import { v } from 'convex/values';
import { internalMutation, query } from './_generated/server';
import { checkUser } from './users';
export const getChatRecord = query({
  args: {
    documentId: v.id('documents'),
  },
  async handler(ctx, args) {
    const user = await checkUser(ctx);
    if (!user) return [];
    return ctx.db
      .query('chats')
      .withIndex('by_documentId_tokenIdentifier', (q) => {
        return q
          .eq('tokenIdentifier', user.tokenIdentifier)
          .eq('documentId', args.documentId);
      })
      .collect();
  },
});
export const createChatRecord = internalMutation({
  args: {
    text: v.string(),
    tokenIdentifier: v.string(),
    documentId: v.id('documents'),
    isHuman: v.boolean(),
  },
  async handler(ctx, args) {
    ctx.db.insert('chats', {
      documentId: args.documentId,
      tokenIdentifier: args.tokenIdentifier,
      text: args.text,
      isHuman: args.isHuman,
    });
  },
});
