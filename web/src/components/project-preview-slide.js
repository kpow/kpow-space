import { Link } from 'gatsby'
import React from 'react'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import BlockText from './block-text'

import styles from './project-preview.module.css'

function ProjectPreviewSlide ({slug, id, title, _rawExcerpt, mainImage}) {
  return (
    <Link className={styles.root} to={`/project/${slug.current}`}>
      <div key={id} className={styles.leadMediaThumb}>
        <div className={styles.slideTitle}>
          {title}
          <div className={styles.excerpt}><BlockText blocks={ _rawExcerpt } /></div>
        </div>
        {mainImage && mainImage.asset && (
          <img
            src={imageUrlFor(buildImageObj(mainImage))
              .width(1200)
              .height(Math.floor((9 / 16) * 1200))
              .url()}
            alt={mainImage.alt}
          />
        )}
      </div>
    </Link>
  )
}

export default ProjectPreviewSlide
