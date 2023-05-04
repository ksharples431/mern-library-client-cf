import { useState, useEffect } from 'react';

import { BookCard } from '../book-card/book-card';
import { BookView } from '../book-view/book-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export const MainView = () => {
  const [selectedBook, setSelectedBook] = useState(null);
   const storedUser = JSON.parse(localStorage.getItem('user'));
   const storedToken = localStorage.getItem('token');
   const [user, setUser] = useState(storedUser ? storedUser : null);
   const [token, setToken] = useState(storedToken ? storedToken : null);
   const [books, setBooks] = useState([]);

  useEffect(() => {
    if (!token) return;

    async function fetchBooks() {
      const response = await fetch('http://localhost:5000/api/books', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      const booksFromAPI = data.map((book) => {
        return {
          id: book._id,
          title: book.title,
          author: book.author,
          image: book.image,
          description: book.description,
          genre: book.genre,
          series: book.series,
          seriesNumber: book.seriesNumber,
        };
      });
      setBooks(booksFromAPI);
    }
    fetchBooks();
  }, [token]);

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          <LoginView onLoggedIn={(user) => setUser(user)} />
          or
          <SignupView />
        </Col>
      ) : selectedBook ? (
        <Col md={8}>
          <BookView
            book={selectedBook}
            onBackClick={() => setSelectedBook(null)}
          />
        </Col>
      ) : books.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {books.map((book) => (
            <Col className="mb-5" key={book.id} md={3}>
              <BookCard
                book={book}
                onBookClick={(newSelectedBook) => {
                  setSelectedBook(newSelectedBook);
                }}
              />
            </Col>
          ))}
        </>
      )}
      <Button 
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}>
        Logout
      </Button>
    </Row>
  );
};

