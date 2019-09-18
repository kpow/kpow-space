import {Link} from 'gatsby'
import React from 'react'
import {cn, buildImageObj} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import BlockText from './block-text'
import { Card, Icon, Image } from 'semantic-ui-react'

import styles from './star-preview.module.css'

function StarPreview (props) {
  console.log(props);
  return (
    <div>
 
      
      <Card as='a' fluid href={props.url} target='_new'
        style={{minHeight:'220px', maxHeight:'220px', marginBottom:'20px'}}>
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

    </div>
  )
}

export default StarPreview
