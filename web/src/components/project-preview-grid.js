import { Link } from 'gatsby'
import React from 'react'
import ProjectPreview from './project-preview'
import { Button, Icon } from 'semantic-ui-react'

import styles from './project-preview-grid.module.css'

function ProjectPreviewGrid (props) {
  return (
    <section className={styles.root}>
      {props.title && <h1>{props.title}</h1>}
      {props.subtitle && <h4>{props.subtitle}</h4>}
      <ul className={styles.grid}>
        {props.nodes &&
          props.nodes.map(node => (
            <li key={node.id}>
              <ProjectPreview {...node} />
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

    </section>
  )
}

ProjectPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default ProjectPreviewGrid
