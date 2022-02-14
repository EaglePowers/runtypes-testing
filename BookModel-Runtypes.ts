import { Number, Record, Static, String } from 'runtypes';

export const Author = Record({
  name: String.withConstraint(
    (name) => name.length > 0 || 'name must be non-empty'
  ),
  age: Number.withConstraint((age) => age < 100 || 'age must be < 100'),
})
  .asReadonly()
  .withConstraint(
    (author) =>
      author.name === `${author.age}` || 'name must match age as a string'
  );

export const BookKeys = Record({
  bookId: String,
}).asReadonly();

export const BookContent = Record({
  author: Author,
  text: String,
  pages: Number,
}).asReadonly();

export const Book = BookKeys.And(BookContent);
type Book = Static<typeof Book>;

function test() {
  const book1 = Book.check({
    bookId: 'abc',
    text: 'xyz',
    pages: 123,
    author: {
      name: '99',
      age: 99,
    },
  });
}

test();
