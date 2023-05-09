import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';


import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './book-card.scss';

export const BookCard = ({ book }) => {
  const { id } = useParams();
  return (
    <Card className="h-100" key={id}>
      <Card.Img variant="top" src={book.image} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>{book.author}</Card.Text>
        <Link to={`/books/${encodeURIComponent(book.id)}`}>
          <Button variant="success">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    genre: PropTypes.string,
    series: PropTypes.string,
    seriesNumber: PropTypes.string,
    description: PropTypes.string,
    favorite: PropTypes.bool,
  }).isRequired
};
