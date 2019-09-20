import React from 'react'
import {cn, buildImageObj} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import { Card, Icon, Feed, Image, Label, Rating } from 'semantic-ui-react'

import styles from './book-preview.module.css'

function BookPreview (props) {
  console.log(props);
  return (
 <div>

<Card as='a' 
      href={props.book.link._text} 
      fluid 
      target="_new"
      style={{minHeight:'150px', maxHeight:'150px', marginBottom:'20px'}}
>
<Card.Content>

  <Image
    floated='right'
    size='tiny'
    src={props.book.image_url._text}
  />
 
  <Card.Header>{props.book.title_without_series._text}</Card.Header>
  <Card.Meta><strong>Author: </strong>{props.book.authors.author.name._text}</Card.Meta>
  <Card.Meta><strong>Avg. Rating: </strong>
    <Rating defaultRating={props.book.average_rating._text} maxRating={5} disabled />
  </Card.Meta>
  <Card.Meta><strong>My Rating: </strong>
    <Rating defaultRating={props.rating._text} maxRating={5} disabled />
  </Card.Meta>
  <Label color='teal' ribbon='right'>
    {props.shelves.shelf._attributes.name}
  </Label>

  {/* <Card.Description>
    <div dangerouslySetInnerHTML={{__html: props.book.description._text}} />
  </Card.Description> */}
</Card.Content>
</Card>

</div>

  )
}

export default BookPreview
