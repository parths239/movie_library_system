// import React from "react";
// import BookCard from "@/components/BookCard";

// interface Props {
//   title: string;
//   books: Book[];
//   containerClassName?: string;
// }

// const BookList = ({ title, books, containerClassName }: Props) => {
//   if (books.length < 2) return;

//   return (
//     <section className={containerClassName}>
//       <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>

//       <ul className="book-list">
//         {books.map((book) => (
//           <BookCard key={book.title} {...book} />
//         ))}
//       </ul>
//     </section>
//   );
// };
// export default BookList;

"use client";

import React, { useState } from "react";
import BookCard from "@/components/BookCard";
import Image from "next/image";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PartialBook = Partial<Book>;

interface Props {
  title: string;
  books: PartialBook[];
  containerClassName?: string;
}


const BookList = ({ title, books, containerClassName }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const booksPerPage = 6;
  const totalPages = Math.ceil(books.length / booksPerPage);

  // Pagination logic (Ensuring only 5 pagination bullets appear at a time)
  const pageLimit = 5; // Maximum pages shown at a time
  const startIndex = (currentPage - 1) * booksPerPage;
  const paginatedBooks = books.slice(startIndex, startIndex + booksPerPage);

  // Determine start & end of visible pages
  const startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
  const endPage = Math.min(totalPages, startPage + pageLimit - 1);

  if (books.length === 0) return(
    <div className="max-w-3xl mt-10">
      <div className="flex flex-col items-center">
      <Image width={160} height={182} src="/images/no-books.png" alt="star" />
      <h2 className="book-description">No results found</h2>
      </div>
    </div>
  );

  return (
    <section className={containerClassName}>
      <div className="flex flex-row justify-between items-center mt-10">
        <h2 className="font-bebas-neue text-4xl text-light-100">
          {title}
        </h2>
        {
          title === "Search Results" && (
            <p className="text-light-200 mt-2">
              filter
            </p>
          )
        }
      </div>

      <ul className="book-list">
        {paginatedBooks.map((book, i) => (
          <BookCard key={`${book.title}${i}`} {...book} />
        ))}
      </ul>

      {/* Pagination Component */}
      <Pagination className="mt-10 justify-end">
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }
            />
          </PaginationItem>

          {/* Ellipsis if not on first page */}
          {startPage > 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Page Numbers (Showing only 5 at a time) */}
          {Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
          ).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => setCurrentPage(page)}
                className={
                  page === currentPage
                    ? "font-bold bg-gray-200 rounded text-slate-500"
                    : ""
                }
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Ellipsis if not on last page */}
          {endPage < totalPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className={
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
};

export default BookList;

