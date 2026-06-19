const express = require("express");
const router = express.Router();

const Book = require("../models/Book");

// GET ALL BOOKS
router.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json(err);
    }
});

// SEARCH BOOK
router.get("/search/:title", async (req, res) => {
    try {
        const books = await Book.find({
            title: {
                $regex: req.params.title,
                $options: "i"
            }
        });

        res.json(books);
    } catch (err) {
        res.status(500).json(err);
    }
});

// ADD BOOK
router.post("/", async (req, res) => {
    try {

        console.log(req.body);

        const book = new Book(req.body);

        await book.save();

        console.log("Saved:", book);

        res.json(book);

    } catch (err) {

        console.log(err);

        res.status(500).json(err);
    }
});

// UPDATE BOOK
router.put("/:id", async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.json(updatedBook);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE BOOK
router.delete("/:id", async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);

        res.json({
            message: "Book Deleted"
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;