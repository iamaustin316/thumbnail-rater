import { internalMutation } from "./_generated/server";
import { v } from "convex/values"

export const createUser = internalMutation({
    args: {
        email: v.string(),
        userId: v.string()
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("users", {
            email: args.email,
            userId: args.userId
        })
    }
})