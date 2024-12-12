import React from "react";
import Link from "next/link"; // Use Next.js Link
import "../styles/bookCard.css";
import Image from "next/image";

interface BookCardProps {
  title: string;
  description: string;
  imageUrl: string;
  likeCount: number;
  id: string;
}

const BookCard: React.FC<BookCardProps> = ({
  title,
  description,
  imageUrl,
  likeCount,
  id,
}) => {
  return (
    <div className="book-card">
      <Link
        href={`/book/${id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="book-card-inner">
          <Image
            src={imageUrl}
            alt={title}
            width={"100"}
            height={250}
            className="book-image"
          />
          <div className="book-info">
            <h3 className="book-title">{title}</h3>
            <p className="book-description">{description}</p>
          </div>
          <div className="book-footer">
            <span className="like-count">{likeCount}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
