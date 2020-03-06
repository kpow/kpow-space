import React from 'react'
import { Link } from 'gatsby'
import StarPreview from './star-preview'
import { Button, Icon, Segment, Dimmer, Loader } from 'semantic-ui-react'

import styles from './project-preview-grid.module.css'

function StarPreviewGrid ({title, 
                           subtitle, 
                           starsLoaded, 
                           nodes, 
                           browseMoreHref}) {
  return (
    <section className={styles.root}>
      {title && <h2>{title}</h2>}
      {subtitle && <h4>{subtitle}</h4>}

      <Segment basic style={{ minHeight: '150px' }}>
        {!starsLoaded && (
          <Dimmer active inverted>
            <Loader size='large'>Loading</Loader>
          </Dimmer>
        )}
        <ul className={styles.grid}>
          {nodes &&
              nodes.map(node => (
                <li
                  key={node.id}
                  style={{ overflow: 'hidden' }}
                >
                  <StarPreview {...node} />
                </li>
              ))}
        </ul>
      </Segment>

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

StarPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default StarPreviewGrid
