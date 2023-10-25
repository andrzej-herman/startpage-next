import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  matches: defineTable({
    opponent: v.string(),
    day: v.number(),
    month: v.number(),
    year: v.number(),
    hour: v.number(),
    minute: v.number(),
    place: v.number(),
    matchType: v.number(),
  }),
});
