import PropTypes from 'prop-types';

import { Button, Card } from 'react-bootstrap';

import './book-card.scss';

export const BookCard = ({ book, onBookClick }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={book.image} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>{book.author}</Card.Text>
        <Button onClick={() => onBookClick(book)} variant="link">
          Open
        </Button>
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
  }).isRequired,
  onBookClick: PropTypes.func.isRequired,
};
