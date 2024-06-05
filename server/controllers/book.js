import Book from '../models/Book.js';

export async function createBook(req, res, next) {
  const newBook = new Book(req.body);

  try {
    const savedBook = await newBook.save();
    console.log(savedBook);
    res.status(200).json(savedBook);
  } catch (err) {
    next(err);
  }
}

export async function getBook(req, res, next) {
  try {
    const book = await Book.findById(req.params.id);
    console.log(book);
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
}

export async function getAllBook(req, res, next) {
  const { limit, ...elements } = req.query;
  try {
    const books = await Book.find({
      ...elements,
    }).limit(limit);
    console.log(books);
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
}

export async function updateBook(req, res, next) {
  try {
    const updateBook = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    console.log(updateBook);
    res.status(200).json(updateBook);
  } catch (err) {
    next(err);
  }
}

export async function deleteBook(req, res, next) {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json('Book has been deleted.');
  } catch (err) {
    next(err);
  }
}

export async function countByAuthor(req, res, next) {
  const authors = req.query.authors.split(',');
  try {
    const list = await Promise.all(
      authors.map((author) => {
        return Book.countDocuments({ author: author });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
}

export async function countByGenre(req, res, next) {
  try {
    const novelCount = await Book.countDocuments({ type: '소설' });
    const romanceCount = await Book.countDocuments({ type: '로맨스' });
    const thrillerCount = await Book.countDocuments({ type: '스릴러' });
    const professionalCount = await Book.countDocuments({ type: '자기계발' });
    const economicsCount = await Book.countDocuments({ type: '경제' });
    const fantasyCount = await Book.countDocuments({ type: '판타지' });

    res.staus(200).json([
      { type: '소설', count: novelCount },
      { type: '로맨스', count: romanceCount },
      { type: '스릴러', count: thrillerCount },
      { type: '자기계발', count: professionalCount },
      { type: '경제', count: economicsCount },
      { type: '판타지', count: fantasyCount },
    ]);
  } catch (err) {
    next(err);
  }
}
