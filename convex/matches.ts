import { MatchFixture } from "./../helpers";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getMonth } from "./../helpers";

export const create = mutation({
  args: {
    opponent: v.string(),
    day: v.number(),
    month: v.number(),
    year: v.number(),
    hour: v.number(),
    minute: v.number(),
    place: v.number(),
    matchType: v.number(),
  },
  handler: async (ctx, args) => {
    try {
      await ctx.db.insert("matches", {
        opponent: args.opponent,
        day: args.day,
        month: args.month,
        year: args.year,
        hour: args.hour,
        minute: args.minute,
        place: args.place,
        matchType: args.matchType,
      });
      return true;
    } catch (error) {
      return false;
    }
  },
});

export const getNextMatch = query({
  handler: async (ctx) => {
    const mt = await ctx.db.query("matches").order("desc").collect();
    if (mt.length === 0) {
      return undefined;
    } else {
      return mt[0];
    }
  },
});

