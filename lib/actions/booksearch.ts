"use server";

import { books } from "@/database/schema";
import { or, desc, sql } from "drizzle-orm";
import { db } from "@/database/drizzle";

export async function fetchBooksFromSearch(search: string) {
    
  const lowerSearch = search.toLowerCase(); // Convert search term to lowercase

  return db
    .select()
    .from(books)
    .where(
      or(
        sql`LOWER(${books.title}) LIKE ${`%${lowerSearch}%`}`,
        sql`LOWER(${books.genre}) LIKE ${`%${lowerSearch}%`}`,
      )
    )
    .orderBy(desc(books.createdAt));
}