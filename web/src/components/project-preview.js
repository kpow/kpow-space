import { Link } from 'gatsby'
import React from 'react'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import BlockText from './block-text'
import { Card } from 'semantic-ui-react'

import styles from './project-preview.module.css'

function ProjectPreview ({slug, mainImage, title, _rawExcerpt }) {
  return (
    <div>
      <Link className={styles.root} to={`/project/${slug.current}`}>

        <Card fluid
          style={{ minHeight: '385px', maxHeight: '385px', marginBottom: '20px' }}>
          <div className={styles.leadMediaThumb}>
            {mainImage && mainImage.asset && (
              <img
                src={imageUrlFor(buildImageObj(mainImage))
                  .width(600)
                  .height(Math.floor((9 / 16) * 600))
                  .url()}
                alt={mainImage.alt}
              />
            )}
          </div>
          <Card.Content>
            <Card.Header>{title}</Card.Header>
            <Card.Meta>
              {/* <span className='date'>Joined in 2015</span> */}
            </Card.Meta>
            <Card.Description>
              <BlockText blocks={_rawExcerpt} />
            </Card.Description>
          </Card.Content>
        </Card>

      </Link>
    </div>
  )
}

export default ProjectPreview
