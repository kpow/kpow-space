import React from 'react'
import { Card } from 'semantic-ui-react'

function StarPreview ({url, title, summary, author}) {
  return (
    <Card as='a'
      fluid href={url}
      target='_new'
      style={{ minHeight: '240px', maxHeight: '240px', marginBottom: '20px' }}>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          <span className='date'>{author}</span>
        </Card.Meta>
        <Card.Description>
          {summary}
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

export default StarPreview
