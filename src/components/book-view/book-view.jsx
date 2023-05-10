import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Card, Button } from 'react-bootstrap';

import './book-view.scss';

export const BookView = ({ books }) => {
  const { bookId } = useParams();
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [token, setToken] = useState(storedToken ? storedToken : null);
  
  const book = books.find((b) => b.id === bookId);
  console.log(book)
  const [favorite, setFavorite] = useState('');
  // console.log(favorite)
  
  async function handleClick(event) {
    event.preventDefault();

    const data = {
      uid: storedUser,
      bid: bookId,
    };

    console.log(data)
    console.log(favorite)

    try {
      const response = await fetch(
        `http://localhost:5000/api/library/${storedUser}/${bookId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();

      console.log(responseData);

      if (responseData) {
        // setFavorite(!favorite);
      } else {
        throw new Error('Login failed');
      }
      // if (favorite === false) {
        
      // }
      // if (favorite === true) {
      //   const response = await fetch(
      //     `http://localhost:5000/api/library/${storedUser}/${bookId}`,
      //     {
      //       method: 'DELETE',
      //       headers: {
      //         'Content-Type': 'application/json',
      //         'Authorization': `Bearer ${token}`
      //       },
      //       body: JSON.stringify(data),
      //     }
      //   );
      //   const responseData = await response.json();

      //   console.log(responseData);

      //   if (responseData) {
      //     setFavorite(!favorite);
      //   } else {
      //     throw new Error('Login failed');
      //   }
      // }
      
    } catch (error) {
      console.error('Error occurred while trying add to library:', error);
    }
  }

  return (
    <Card className="h-100" key={bookId}>
      <Card.Img variant="top" src={book.image} />
      <Card.Body>
        <Card.Text className="title">{book.title}</Card.Text>
        <Card.Text>Author: {book.author}</Card.Text>
        <Card.Text>Genre: {book.genre}</Card.Text>
        <Card.Text>Series: {book.series}</Card.Text>
        <Card.Text>Book: {book.seriesNumber}</Card.Text>
        <Card.Text>Description: {book.description}</Card.Text>
        <Card.Text>
          Favorite: {book.favorite}
          <FontAwesomeIcon
            icon={faHeart}
            style={{
              // color: book.favorite ? 'red' : 'gray',
              marginLeft: '10px',
              cursor: 'pointer',
            }}
            onClick={handleClick}
          />
        </Card.Text>
        <Link to={`/`}>
          <Button variant="success">Back</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};
