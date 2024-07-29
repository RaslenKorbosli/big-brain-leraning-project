import { ConvexError } from 'convex/values';
import { MutationCtx, QueryCtx } from './_generated/server';
import { UserIdentity } from 'convex/server';
import { Id } from './_generated/dataModel';

export const checkUser = async (
  ctx: QueryCtx | MutationCtx
): Promise<UserIdentity> => {
  const user = await ctx.auth.getUserIdentity();
  if (!user) return {} as UserIdentity;
  return user;
};
export const hasAccessToDocumentAndIsAuthUser = async (
  ctx: QueryCtx | MutationCtx,
  documentId: Id<'documents'>
) => {
  const user = await ctx.auth.getUserIdentity();
  if (!user) return null;
  const document = await ctx.db.get(documentId);
  if (!document) return null;
  if (document.tokenIdentifier !== user.tokenIdentifier) return null;
  return { user, document };
};
