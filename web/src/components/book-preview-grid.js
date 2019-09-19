import React from 'react'
import BookPreview from './book-preview'

import styles from './book-preview-grid.module.css'

function BookPreviewGrid (props) {

  return (
    <div className={styles.root}>
      {props.title && <h2>{props.title}</h2>}
      <ul className={styles.grid}>
        {props.nodes &&
          props.nodes.map(node => (
            <li key={node.id._text}>
              <BookPreview {...node} />
            </li>
          ))} 
      </ul>
    </div>
  )
}

BookPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default BookPreviewGrid
