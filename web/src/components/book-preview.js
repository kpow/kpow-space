import React from 'react'
import BookImage from '../components/book-image'
import { Card, Rating } from 'semantic-ui-react'

function BookPreview ({book, shelves, rating}) {
  let shelf
  try {
    shelf = shelves.shelf._attributes.name
  } catch (error) {
    shelf = 'unknown'
  }

  return (
    <div>
      <Card as='a'
        href={book.link._text}
        fluid
        target="_new"
        style={{ minHeight: '150px', maxHeight: '150px', marginBottom: '20px' }}
      >
        <Card.Content>

          {shelf === 'currently-reading' && (
            <BookImage
              labelColor='purple'
              imageUrl={book.image_url._text}
              shelf={shelf}
            />
          )}

          {shelf === 'read' && (
            <BookImage
              labelColor='teal'
              imageUrl={book.image_url._text}
              shelf={shelf}
            />
          )}

          {shelf === 'to-read' && (
            <BookImage
              labelColor='blue'
              imageUrl={book.image_url._text}
              shelf={shelf}
            />
          )}

          {shelf === 'unknown' && (
            <BookImage
              labelColor='red'
              imageUrl={book.image_url._text}
              shelf={shelf}
            />
          )}

          <Card.Header>{book.title_without_series._text}</Card.Header>
          <Card.Meta><strong>Author: </strong>{book.authors.author.name._text}</Card.Meta>
          <Card.Meta><strong>Published: </strong>{book.published._text}</Card.Meta>
          <Card.Meta><strong>Avg. Rating: </strong>
            <Rating defaultRating={book.average_rating._text} maxRating={5} disabled />
          </Card.Meta>
          <Card.Meta><strong>My Rating: </strong>
            <Rating defaultRating={rating._text} maxRating={5} disabled />
          </Card.Meta>
        </Card.Content>
      </Card>

    </div>

  )
}

export default BookPreview
