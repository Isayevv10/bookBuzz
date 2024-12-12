"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchBookById } from "../../../services/bookService";
import "../../../styles/bookDetailed.css";
import Image from "next/image";

const BookDetailPage = () => {
  const { id } = useParams();

  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      fetchBookById(id as string)
        .then((data) => {
          setBook(data.result);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>Book not found!</div>;
  }

  return (
    <div className="card">
      <div className="cardImage">
        <Image
          src={book.mainImage}
          width={250}
          height={"100"}
          objectFit="cover"
          alt={book.title}
        />
      </div>
      <div className="cardContent">
        <h2 className="cardTitle">{book.title}</h2>
        <p className="cardSubtitle">{book.subtitleShort}</p>
        <div className="cardInfo">
          <p>{book.numOfLikes} Likes</p>
          <p>Price: ${book.price}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
