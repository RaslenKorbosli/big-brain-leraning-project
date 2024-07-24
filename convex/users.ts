import { ConvexError } from 'convex/values';
import { MutationCtx, QueryCtx } from './_generated/server';
import { UserIdentity } from 'convex/server';

export const checkUser = async (
  ctx: QueryCtx | MutationCtx
): Promise<UserIdentity> => {
  const user = await ctx.auth.getUserIdentity();
  if (!user) throw new ConvexError('you must be logged in');
  return user;
};
