import React from "react";
import Link from "next/link"; // Use Next.js Link
import "../styles/bookCard.css";

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
          <img src={imageUrl} alt={title} className="book-image" />
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