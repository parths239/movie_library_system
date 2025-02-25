"use client"

import React from "react";
import { fetchBooksFromSearch } from "@/lib/actions/booksearch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const searchSchema = z.object({
  search: z.string(),
});

const Page = () => {

    const [searchedBooks, setSearchedBooks] = useState<Book[]>([])

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });


  const onSubmit = async (values: z.infer<typeof searchSchema>) => {

    console.log("Form submitted with:", values);

    const { dismiss } = toast({
      title: "Searching",
      description: `Searching for books with keyword: ${values.search}`,
    });

    const book = values.search.toLowerCase();

    const allBooks = await fetchBooksFromSearch(book);

    setSearchedBooks(allBooks)

    if (allBooks.length !== 0) {
      dismiss();
    } else {
      toast({
        title: "Error",
        description: "No books found",
        variant: "destructive",
      });
    }

    form.reset();
  };

  return (
    <div className="book-search flex flex-col items-center">
      <h2 className="book-description">DISCOVER YOUR NEXT GREAT READ:</h2>

      <h1 className="max-w-3xl mb-10">
        Explore and Search for{" "}
        <span className="font-semibold text-light-200">Any Book</span> In Our
        Library
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-row gap-1"
        >
          <FormField
            control={form.control}
            name={"search"}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    required
                    placeholder="Search book"
                    {...field}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="search-form-btn text-dark-500" type="submit">
            Search
          </Button>
        </form>
        <Toaster />
      </Form>

      <BookList title="Search Results" books={searchedBooks} containerClassName={"min-w-full"} />

    </div>
  );
};

export default Page;
