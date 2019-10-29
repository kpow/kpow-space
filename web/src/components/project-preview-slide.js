import { Link } from 'gatsby'
import React from 'react'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import BlockText from './block-text'
import { Card } from 'semantic-ui-react'

import styles from './project-preview.module.css'

function ProjectPreviewSlide (props) {
  return (
    <Link className={styles.root} to={`/project/${props.slug.current}`}>
      <div key={props.id} className={styles.leadMediaThumb}>
        <div className={styles.slideTitle}>
          {props.title}
          <div className={styles.excerpt}><BlockText blocks={ props._rawExcerpt } /></div>
          <h2>{ console.log(props) }</h2>
        </div>
        {props.mainImage && props.mainImage.asset && (
          <img
            src={imageUrlFor(buildImageObj(props.mainImage))
              .width(1200)
              .height(Math.floor((9 / 16) * 1200))
              .url()}
            alt={props.mainImage.alt}
          />
        )}
      </div>
    </Link>
  )
}

export default ProjectPreviewSlide
