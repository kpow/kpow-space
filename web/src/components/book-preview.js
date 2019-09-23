import React from 'react'
import {cn, buildImageObj} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import { Card, Icon, Feed, Image, Label, Rating } from 'semantic-ui-react'

import styles from './book-preview.module.css'

function BookPreview (props) {
  let shelf;
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
      style={{minHeight:'150px', maxHeight:'150px', marginBottom:'20px'}}
>
<Card.Content>

{shelf == 'currently-reading' && ( 
  <Image
    floated='right'
    size='tiny'
    src={props.book.image_url._text}
    label={{
      color: 'purple',
      content:shelf,
      ribbon: 'right',
    }}
  />
)}

{shelf == 'read' && (
  <Image
    floated='right'
    size='tiny'
    src={props.book.image_url._text}
    label={{
      color: 'teal',
      content:shelf,
      ribbon: 'right',
    }}
  />
)}

{shelf == 'to-read' && (
  <Image
    floated='right'
    size='tiny'
    src={props.book.image_url._text}
    label={{
      color: 'blue',
      content:shelf,
      ribbon: 'right',
    }}
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
