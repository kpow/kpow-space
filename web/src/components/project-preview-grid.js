import { Link } from 'gatsby'
import React from 'react'
import ProjectPreview from './project-preview'
import { Button, Icon } from 'semantic-ui-react'

import styles from './project-preview-grid.module.css'

function ProjectPreviewGrid ({title, subtitle, nodes, browseMoreHref}) {
  return (
    <section className={styles.root}>
      {title && <h1>{title}</h1>}
      {subtitle && <h4>{subtitle}</h4>}
      <ul className={styles.grid}>
        {nodes &&
          nodes.map(node => (
            <li key={node.id}>
              <ProjectPreview {...node} />
            </li>
          ))}
      </ul>
      {browseMoreHref && (
        <div>
          <Link to={browseMoreHref}>
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
