import React from 'react'
import { Card } from 'semantic-ui-react'

function StarPreview (props) {
  return (
    <Card as='a'
      fluid href={props.url}
      target='_new'
      style={{ minHeight: '240px', maxHeight: '240px', marginBottom: '20px' }}>
      <Card.Content>
        <Card.Header>{props.title}</Card.Header>
        <Card.Meta>
          <span className='date'>{props.author}</span>
        </Card.Meta>
        <Card.Description>
          {props.summary}
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

export default StarPreview
