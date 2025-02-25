// import React from "react";
// import { Button } from "@/components/ui/button";
// import { signOut } from "@/auth";
// import BookList from "@/components/BookList";
// import { sampleBooks } from "@/constants";

// const Page = () => {
//   return (
//     <>
//       <form
//         action={async () => {
//           "use server";

//           await signOut();
//         }}
//         className="mb-10"
//       >
//         <Button>Logout</Button>
//       </form>

//       <BookList title="Borrowed Books" books={sampleBooks} />
//     </>
//   );
// };
// export default Page;
import React from "react";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import BookList from "@/components/BookList";
import IDCard from "@/components/DigitalId";
import { users } from "@/database/schema";

const Page = async () => {
  const session = await auth();

  const userId = session?.user?.id as string;
  const borrowedBooks = await db
  .select({
    id: books.id,
    title: books.title,
    author: books.author,
    genre: books.genre,
    rating: books.rating,
    totalCopies: books.totalCopies,
    availableCopies: books.availableCopies,
    description: books.description,
    coverColor: books.coverColor,
    coverUrl: books.coverUrl,
    videoUrl: books.videoUrl,
    summary: books.summary,
    createdAt: books.createdAt,
    
    // Borrow-related data (null if not borrowed)
    borrowDate: borrowRecords.borrowDate,
    dueDate: borrowRecords.dueDate,
    returnDate: borrowRecords.returnDate,
    status: borrowRecords.status,
  })
  .from(books)
  .leftJoin(borrowRecords, eq(borrowRecords.bookId, books.id))
  .where(eq(borrowRecords.userId, userId)) // Optional: Include only borrowed books, remove if not needed.


  // Fetch the user with the matching userId
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1); // Limit to one user


console.log(user)

  return (
    <div className="lg:grid lg:grid-cols-2 gap-4">
      <IDCard {...user}/>
      <BookList title="Borrowed books" books={borrowedBooks} />
    </div>
  );
};

export default Page;
