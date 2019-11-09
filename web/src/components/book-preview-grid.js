import React from 'react'
import { Link } from 'gatsby'
import BookPreview from './book-preview'
import { Button, Icon, Segment, Dimmer, Loader } from 'semantic-ui-react'
import styles from './book-preview-grid.module.css'

function BookPreviewGrid (props) {
  return (

    <section className={styles.root}>
      {props.title && <h2>{props.title}</h2>}
      {props.subtitle && <h4>{props.subtitle}</h4>}

      <Segment basic style={{ minHeight: '150px' }}>
        {!props.booksLoaded && (
          <Dimmer active inverted>
            <Loader size='large'>Loading</Loader>
          </Dimmer>
        )}
        <ul className={styles.grid}>
          {props.nodes &&
            props.nodes.map(node => (
              <li key={node.id._text}>
                <BookPreview {...node} />
              </li>
            ))}
        </ul>
      </Segment>

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

BookPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default BookPreviewGrid
