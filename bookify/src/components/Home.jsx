import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "./BookCard";
import CardGroup from "react-bootstrap/CardGroup";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function Home() {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (!firebase.isLoggedIn) navigate("/login");
  }, []);

  useEffect(() => {
    firebase.getAllBooks().then((book) => setBooks(book.docs));
  }, []);

  return (
    <div className="container">
      <h3>List of All Books</h3>
      <CardGroup>
        {books.map((book) => (
          <BookCard key={book.id} id={book.id} {...book.data()} />
        ))}
      </CardGroup>
    </div>
  );
}
