import * as z from 'zod';

export const BookKeys = z.object({
  bookId: z.string(),
});
export type BookKeys = z.infer<typeof BookKeys>;

export const BookContent = z.object({
  text: z.string(),
  pages: z.number(),
});
export type BookContent = z.infer<typeof BookContent>;

export const Book = BookKeys.merge(BookContent);
export type Book = z.infer<typeof Book>;

function test() {
  const book1 = Book.parse({ bookId: 'abc', text: 'xyz', pages: 123 });

  // const book2: Book = {
  //   bookId: null,
  //   text: null,
  //   pages: null,
  // };
}
