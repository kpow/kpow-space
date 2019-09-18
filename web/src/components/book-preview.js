import React from 'react'
import {cn, buildImageObj} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import { Card, Icon, Feed, Image, Button } from 'semantic-ui-react'

import styles from './book-preview.module.css'

function BookPreview (props) {
  console.log(props);
  return (
 <div>

<Card as='a' fluid href={props.link} target="_new">
<Card.Content>
  <Image
    floated='right'
    wrapped
    size='small'
    spaced='left'
    src={props.book.image_url}
  />
  <Card.Header>{props.book.title_without_series}</Card.Header>
  <Card.Meta><strong>Published:</strong>{props.book.published}</Card.Meta>
  <Card.Meta><strong>Author:</strong>{props.book.authors.author.name}</Card.Meta>
  <Card.Meta><strong>Avg. Rating:</strong>{props.book.average_rating}</Card.Meta>
  <Card.Meta><strong>Status:</strong>{props.shelves.shelf._name}</Card.Meta>

  <Card.Description>
    <div dangerouslySetInnerHTML={{__html: props.book.description}} />
  </Card.Description>
</Card.Content>
</Card>

</div>

  )
}

export default BookPreview
