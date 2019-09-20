import React from 'react'
import {Link} from 'gatsby'
import StarPreview from './star-preview'
import {Button, Icon} from 'semantic-ui-react'

import styles from './project-preview-grid.module.css'

function StarPreviewGrid (props) {

  return (
    <div className={styles.root}>
      {props.title && <h2>{props.title}</h2>}
      <h4>Here are some of the articles I've collected from all my feeds :)</h4>
      <ul className={styles.grid}>
        {props.nodes &&
          props.nodes.map(node => (
            <li key={node.id}>
              <StarPreview {...node} />
            </li>
          ))} 
      </ul>
            
      {props.browseMoreHref && (
          <div>
          <Link to={props.browseMoreHref}>
           <Button animated floated='right'>
            <Button.Content visible>Browse More</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow right' />
            </Button.Content>
          </Button>
          </Link>
        </div>
      )}    

    </div>
  )
}

StarPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default StarPreviewGrid
