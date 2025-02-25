import { pgTable, unique, uuid, varchar, text, integer, date, timestamp, foreignKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const borrowStatus = pgEnum("borrow_status", ['BORROWED', 'RETURNED'])
export const role = pgEnum("role", ['USER', 'ADMIN'])
export const status = pgEnum("status", ['PENDING', 'APPROVED', 'REJECTED'])


export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	fullName: varchar("full_name", { length: 255 }).notNull(),
	email: text().notNull(),
	universityId: integer("university_id").notNull(),
	password: text().notNull(),
	universityCard: text("university_card").notNull(),
	status: status().default('PENDING'),
	role: role().default('USER'),
	lastActivityDate: date("last_activity_date").defaultNow(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	unique("users_email_unique").on(table.email),
	unique("users_university_id_unique").on(table.universityId),
]);

export const borrowRecords = pgTable("borrow_records", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	bookId: uuid("book_id").notNull(),
	borrowDate: timestamp("borrow_date", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	dueDate: date("due_date").notNull(),
	returnDate: date("return_date"),
	status: borrowStatus().default('BORROWED').notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "borrow_records_user_id_users_id_fk"
		}),
	foreignKey({
			columns: [table.bookId],
			foreignColumns: [books.id],
			name: "borrow_records_book_id_books_id_fk"
		}),
]);

export const books = pgTable("books", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	title: varchar({ length: 255 }).notNull(),
	author: varchar({ length: 255 }).notNull(),
	genre: text().notNull(),
	rating: integer().notNull(),
	coverUrl: text("cover_url").notNull(),
	coverColor: varchar("cover_color", { length: 7 }).notNull(),
	description: text().notNull(),
	totalCopies: integer("total_copies").default(1).notNull(),
	availableCopies: integer("available_copies").default(0).notNull(),
	videoUrl: text("video_url").notNull(),
	summary: varchar().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});
