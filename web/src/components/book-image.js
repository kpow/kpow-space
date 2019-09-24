import React from 'react'
import { Image, Label } from 'semantic-ui-react'

const BookImage = (props) => (
  <Image
    floated='right'
    size='tiny'
    src={props.imageUrl}
    label={{
      color: props.labelColor,
      content: props.shelf,
      ribbon: 'right'
    }}
  />

)

export default BookImage
