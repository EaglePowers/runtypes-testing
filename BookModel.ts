import * as Joi from 'joi';
interface IBookKeys {
  bookId: string;
}

interface IBookContent {
  text: string;
  pages: number;
}

type IBookModel = Readonly<IBookKeys & IBookContent>;

export const BookModelSchema = Joi.object({
  bookId: Joi.string(),
  text: Joi.string(),
  pages: Joi.number(),
});

function isBookModel(bookModel: any): bookModel is IBookModel {
  const validationResult = BookModelSchema.validate(bookModel);

  if (validationResult.error) {
    throw new Error(validationResult.error.message);
  } else {
    return true;
  }
}

function test() {
  const book1 = { bookId: 'abc', text: 'xyz', pages: 123 };
  if (isBookModel(book1)) {
    book1.bookId;
  }
}
