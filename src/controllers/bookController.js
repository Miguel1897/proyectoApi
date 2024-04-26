import { readData, writeData } from '../utils/fileUtils.js';

export const bookController = {
  async getBooks(req, res) {
    try {
      const data = await readData();
      console.log(data); // Imprimir los datos leídos en la consola
      res.json(data.books);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getBookById(req, res) {
    try {
      const data = await readData();
      const id = parseInt(req.params.id);
      const book = data.books.find((book) => book.id === id);
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async createBook(req, res) {
    try {
      const data = await readData();
      const body = req.body;
      const newBook = {
        id: data.books.length + 1,
        ...body,
      };
      data.books.push(newBook);
      await writeData(data);
      res.status(201).json(newBook);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async updateBook(req, res) {
    try {
      const data = await readData();
      const id = parseInt(req.params.id);
      const body = req.body;
      const bookIndex = data.books.findIndex((book) => book.id === id);
      if (bookIndex !== -1) {
        data.books[bookIndex] = {
          ...data.books[bookIndex],
          ...body,
        };
        await writeData(data);
        res.json({ message: "Book updated successfully" });
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async deleteBook(req, res) {
    try {
      const data = await readData();
      const id = parseInt(req.params.id);
      const bookIndex = data.books.findIndex((book) => book.id === id);
      if (bookIndex !== -1) {
        data.books.splice(bookIndex, 1);
        await writeData(data);
        res.json({ message: "Book deleted successfully" });
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default bookController;
