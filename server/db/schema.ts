// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  // integer,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `market-saver_${name}`);

export const users = createTable("user", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }),
});
// export const games = createTable("game", {
//   id: serial("id").primaryKey(),
//   gameKey: varchar("game_key", { length: 256 }).notNull(),
//   date: varchar("date", { length: 256 }).notNull(),
//   week: integer("week").notNull(),
//   homeTeam: varchar("home_team", { length: 3 }).notNull(),
//   awayTeam: varchar("away_team", { length: 3 }).notNull(),
//   createdAt: timestamp("created_at", { withTimezone: true })
//     .default(sql`CURRENT_TIMESTAMP`)
//     .notNull(),
//   updatedAt: timestamp("updatedAt", { withTimezone: true }),
// });

// export const picks = createTable("pick", {
//   id: serial("id").primaryKey(),
//   userId: varchar("user_id", { length: 256 }).notNull(),
//   gameKey: varchar("game_key", { length: 256 }).notNull(),
//   pick: varchar("pick", { length: 3 }).notNull(),
//   createdAt: timestamp("created_at", { withTimezone: true })
//     .default(sql`CURRENT_TIMESTAMP`)
//     .notNull(),
//   updatedAt: timestamp("updatedAt", { withTimezone: true }),
// });
