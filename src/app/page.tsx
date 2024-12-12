"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import { fetchBooks } from "../services/bookService";
import useDebounce from "../hooks/useDebounce";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedQuery = useDebounce(searchQuery, 1200);

  useEffect(() => {
    const storedToken = localStorage.getItem("token") || "";
    setToken(storedToken);

    setLoading(true);
    fetchBooks("", storedToken)
      .then((data) => {
        setBooks(data);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (debouncedQuery) {
      setLoading(true);
      fetchBooks(debouncedQuery, token)
        .then((data) => setBooks(data))
        .finally(() => setLoading(false));
    }
  }, [debouncedQuery, token]);

  const handleSearch = (query: string) => {
    if (query === "") {
      fetchBooks(debouncedQuery, token)
        .then((data) => setBooks(data))
        .finally(() => setLoading(false));
    } else {
      setSearchQuery(query);
    }
  };

  return (
    <div className="container">
      <h2>Browse All Books</h2>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="book-list">
          {books.map((book: any) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              description={book.description}
              imageUrl={book.mainImage}
              likeCount={book.likes}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
