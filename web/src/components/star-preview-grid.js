import React from 'react'
import StarPreview from './star-preview'

import styles from './project-preview-grid.module.css'

function StarPreviewGrid (props) {

  return (
    <div className={styles.root}>
      {props.title && <h2>{props.title}</h2>}
      <ul className={styles.grid}>
        {props.nodes &&
          props.nodes.map(node => (
            <li key={node.id}>
              <StarPreview {...node} />
            </li>
          ))} 
      </ul>
    </div>
  )
}

StarPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default StarPreviewGrid
