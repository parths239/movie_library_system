"use client";

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
import { fetchBooksFromSearch } from "@/lib/actions/booksearch";
import { toast } from '@/hooks/use-toast'
import { Toaster } from "@/components/ui/toaster"
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";



const searchSchema = z.object({
    search: z.string(),
  });

const BookSearchForm = () => {

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  const router = useRouter(); // Initialize the router


  const onSubmit = async (values: z.infer<typeof searchSchema>) => {

    console.log("Form submitted with:", values);

    const {dismiss} = toast({
        title: "Searching",
        description: `Searching for books with keyword: ${values.search}`, 
      })

    const book = values.search.toLowerCase();

    const allBooks = await fetchBooksFromSearch(book);

    if(allBooks.length !== 0){

          dismiss()
          router.push(`/${book}`);
    }
    else{
        toast({
            title: "Error",
            description: "No books found",
            variant: 'destructive'
          })
    }

    console.log(allBooks)

    form.reset()

  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row gap-1">
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
        <Button className='search-form-btn text-dark-500' type="submit">
          Search
        </Button>
      </form>
      <Toaster />
    </Form>
  );
};
export default BookSearchForm;