import React from 'react'
import BookImage from '../components/book-image'
import { Card, Rating } from 'semantic-ui-react'

function BookPreview (props) {
  let shelf
  try {
    shelf = props.shelves.shelf._attributes.name
  } catch (error) {
    shelf = 'unknown'
  }

  return (
    <div>
      <Card as='a'
        href={props.book.link._text}
        fluid
        target="_new"
        style={{ minHeight: '150px', maxHeight: '150px', marginBottom: '20px' }}
      >
        <Card.Content>

          {shelf === 'currently-reading' && (
            <BookImage
              labelColor='purple'
              imageUrl={props.book.image_url._text}
              shelf={shelf}
            />
          )}

          {shelf === 'read' && (
            <BookImage
              labelColor='teal'
              imageUrl={props.book.image_url._text}
              shelf={shelf}
            />
          )}

          {shelf === 'to-read' && (
            <BookImage
              labelColor='blue'
              imageUrl={props.book.image_url._text}
              shelf={shelf}
            />
          )}

          {shelf === 'unknown' && (
            <BookImage
              labelColor='red'
              imageUrl={props.book.image_url._text}
              shelf={shelf}
            />
          )}

          <Card.Header>{props.book.title_without_series._text}</Card.Header>
          <Card.Meta><strong>Author: </strong>{props.book.authors.author.name._text}</Card.Meta>
          <Card.Meta><strong>Published: </strong>{props.book.published._text}</Card.Meta>
          <Card.Meta><strong>Avg. Rating: </strong>
            <Rating defaultRating={props.book.average_rating._text} maxRating={5} disabled />
          </Card.Meta>
          <Card.Meta><strong>My Rating: </strong>
            <Rating defaultRating={props.rating._text} maxRating={5} disabled />
          </Card.Meta>
        </Card.Content>
      </Card>

    </div>

  )
}

export default BookPreview
