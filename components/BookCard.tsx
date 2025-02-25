// import React from "react";
// import Link from "next/link";
// import BookCover from "@/components/BookCover";
// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";

// const BookCard = ({
//   id,
//   title,
//   genre,
//   coverColor,
//   coverUrl,
//   isLoanedBook = false,
// }: Book) => (
//   <li className={cn(isLoanedBook && "xs:w-52 w-full")}>
//     <Link
//       href={`/books/${id}`}
//       className={cn(isLoanedBook && "w-full flex flex-col items-center")}
//     >
//       <BookCover coverColor={coverColor} coverImage={coverUrl} />

//       <div className={cn("mt-4", !isLoanedBook && "xs:max-w-40 max-w-28")}>
//         <p className="book-title">{title}</p>
//         <p className="book-genre">{genre}</p>
//       </div>

//       {isLoanedBook && (
//         <div className="mt-3 w-full">
//           <div className="book-loaned">
//             <Image
//               src="/icons/calendar.svg"
//               alt="calendar"
//               width={18}
//               height={18}
//               className="object-contain"
//             />
//             <p className="text-light-100">11 days left to return</p>
//           </div>

//           <Button className="book-btn">Download receipt</Button>
//         </div>
//       )}
//     </Link>
//   </li>
// );

// export default BookCard;
import React from "react";
import Link from "next/link";
import BookCover from "@/components/BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

const BookCard = ({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  status,
  dueDate,
  borrowDate,
}: Partial<Book>) => {
  const dateDue = dayjs(dueDate);
  const dateNow = dayjs();
  const borrowedDate = new Date(borrowDate as string);
  const remainTime = dateDue.diff(dateNow, "day");

  const borrowedDay = borrowedDate.getDate();
  const borrowedMonth = borrowedDate.getMonth() + 1;

  const getMonthName = (monthNumber: number) => {
    return dayjs()
      .month(monthNumber - 1)
      .format("MMMM");
  };

  return (
    <li className={cn(status == "BORROWED" && "xs:w-52 w-full")}>
      <Link
        href={`/books/${id}`}
        className={cn(
          status == "BORROWED" && "w-full flex flex-col items-center"
        )}
      >
        <BookCover
          coverColor={coverColor as string}
          coverImage={coverUrl as string}
        />

        <div
          className={cn(
            "mt-4",
            status !== "BORROWED" && "xs:max-w-40 max-w-28"
          )}
        >
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>

        {status == "BORROWED" && (
          <div className="mt-3 w-full">
            <div className="book-loaned">
              <Image
                src="/icons/book-2.svg"
                alt="calendar"
                width={18}
                height={18}
                className="object-contain"
              />
              <p className="text-light-100">
                Borrowed on {getMonthName(borrowedMonth)} {borrowedDay}
              </p>
            </div>
          </div>
        )}
      </Link>
      {status == "BORROWED" && (
        <div className="flex flex-row justify-between">
          {remainTime >= 0 ? (
            <div>
              <div className="book-loaned">
                <Image
                  src="/icons/calendar.svg"
                  alt="calendar"
                  width={18}
                  height={18}
                  className="object-contain"
                />
                <p className="text-light-100">{remainTime} days left to due</p>
              </div>
            </div>
          ) : (
            <div>
              <div className="book-loaned text-red-500">
                <Image
                  src="/icons/warning.svg"
                  alt="calendar"
                  width={18}
                  height={18}
                  className="object-contain"
                />
                <p className="text-light-100">Overdue return</p>
              </div>
            </div>
          )}
          <Button>
            <Image
              src="/icons/receipt.svg"
              alt="calendar"
              width={18}
              height={18}
              className="object-contain"
            />
          </Button>
        </div>
      )}
    </li>
  );
};

export default BookCard;
