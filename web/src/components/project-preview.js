import { Link } from 'gatsby'
import React from 'react'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import BlockText from './block-text'
import { Card } from 'semantic-ui-react'

import styles from './project-preview.module.css'

function ProjectPreview (props) {
  return (
    <div>
      <Link className={styles.root} to={`/project/${props.slug.current}`}>

        <Card fluid
          style={{ minHeight: '385px', maxHeight: '385px', marginBottom: '20px' }}>
          <div className={styles.leadMediaThumb}>
            {props.mainImage && props.mainImage.asset && (
              <img
                src={imageUrlFor(buildImageObj(props.mainImage))
                  .width(600)
                  .height(Math.floor((9 / 16) * 600))
                  .url()}
                alt={props.mainImage.alt}
              />
            )}
          </div>
          <Card.Content>
            <Card.Header>{props.title}</Card.Header>
            <Card.Meta>
              {/* <span className='date'>Joined in 2015</span> */}
            </Card.Meta>
            <Card.Description>
              <BlockText blocks={props._rawExcerpt} />
            </Card.Description>
          </Card.Content>
        </Card>

      </Link>
    </div>
  )
}

export default ProjectPreview
