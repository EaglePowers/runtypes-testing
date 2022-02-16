import { Number, Record, Static, String } from 'runtypes';

/**
 * Scratchwork trying out runtypes - Book/Author schema
 * with some contrived runtime constraints in addition to types
 * Using asReadOnly pervasively to make types immutables
 */
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
  text: String.optional(),
  pages: Number,
}).asReadonly();

// Composing/mutating two schemas into one
export const Book = BookKeys.And(BookContent);

// inferred type is intersection of Book and BookContent inferred types
// equivalent to typescript & operator
type Book = Static<typeof Book>;

function test() {
  // Throws error if not valid
  const book1 = Book.check({
    bookId: 'abc',
    text: 'xyz',
    pages: 123,
    author: {
      name: '99',
      age: 99,
    },
  });

  // Type of book1 now known, valid fields accessible
  book1.bookId;
  book1.pages;
  book1.author.name;
  book1.author.age;

  // Text field is optional
  book1.text;

  // Compiler error: invalid field
  book1.junk;

  // Compiler error: all field are readonly (immutable)
  book1.bookId = 'abc';
}

test();
