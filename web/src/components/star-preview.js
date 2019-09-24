
import React from 'react'
import { Card } from 'semantic-ui-react'
import styles from './star-preview.module.css'

function StarPreview (props) {
  return (
    <Card as='a'
      fluid href={props.url}
      target='_new'
      style={{ minHeight: '240px', maxHeight: '240px', marginBottom: '20px' }}>
      {/* <div className={styles.leadMediaThumb}>
        {props.mainImage && props.mainImage.asset && (
          <img
            src={imageUrlFor(buildImageObj(props.mainImage))
              .width(600)
              .height(Math.floor((9 / 16) * 600))
              .url()}
            alt={props.mainImage.alt}
          />
        )}
      </div> */}
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
