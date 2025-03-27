import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/BookList.css";

const BookList = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const observer = useRef(null);

  // Fetch books from API
  const fetchBooks = useCallback(async (searchQuery = "", pageUrl = null) => {
    setLoading(true);
    const url = pageUrl || `http://skunkworks.ignitesol.com:8000/books/?topic=${category}&search=${searchQuery}&mime_type=image/jpeg`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setBooks((prevBooks) => (pageUrl ? [...prevBooks, ...data.results] : data.results));
      setNextPage(data.next);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    setBooks([]); // Reset books when category changes
    fetchBooks();
  }, [category, fetchBooks]);

  useEffect(() => {
    if (!searchTerm) return;
    const timeout = setTimeout(() => fetchBooks(searchTerm), 500);
    return () => clearTimeout(timeout);
  }, [searchTerm, fetchBooks]);

  // Infinite Scroll
  const lastBookRef = useCallback(
    (node) => {
      if (loading || !nextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) fetchBooks("", nextPage);
      });
      if (node) observer.current.observe(node);
    },
    [loading, nextPage, fetchBooks]
  );

  // Handle Book Click (Preferred Formats)
  const handleBookClick = (book) => {
    const formats = ["text/html", "application/pdf", "text/plain"];
    for (const format of formats) {
      if (book.formats[format]) return window.open(book.formats[format], "_blank");
    }
    alert("No viewable version available");
  };

  return (
    <div className="booklist-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <h2 className="booklist-title">{category} Books</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search books by title or author..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Book List Grid */}
      <div className="books-grid">
        {books.map((book, index) => (
          <div
            key={book.id}
            className="book-card"
            onClick={() => handleBookClick(book)}
            ref={index === books.length - 1 ? lastBookRef : null}
          >
            <img src={book.formats["image/jpeg"]} alt={book.title} className="book-cover" />
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">By {book.authors.map((author) => author.name).join(", ")}</p>
          </div>
        ))}
      </div>

      {loading && <p className="loading-text">Loading books...</p>}
    </div>
  );
};

export default BookList;
