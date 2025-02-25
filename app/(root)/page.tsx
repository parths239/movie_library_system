import React from "react";
import BookOverview from "@/components/BookOverview";
import BookList from "@/components/BookList";
import { auth } from "@/auth";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";
import { db } from "@/database/drizzle";

const Home = async () => {

  const session = await auth();

  const allBooks = (await db
    .select()
    .from(books)
    .orderBy(desc(books.createdAt))) as Book[];
  
    const latestBooks = allBooks.slice(1, 10);

  return (
    <div>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string}/>
      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
      <BookList
        title="Remaining Books"
        books={allBooks.slice(10)}
        containerClassName="mt-28"
      />
    </div>
  );
};

export default Home;
