import React from 'react'
import {Link} from 'gatsby'
import BookPreview from './book-preview'
import {Container, Button, Icon} from 'semantic-ui-react'
import styles from './book-preview-grid.module.css'

function BookPreviewGrid (props) {
  const nextPage = props.getBooksData;
  return (
    <div className={styles.root}>
      {props.title && <h2>{props.title}</h2>}
      <h4>I have a "thing" for science fiction. Here is m list of books from goodreads :)</h4>
      <ul className={styles.grid}>
        {props.nodes &&
          props.nodes.map(node => (
            <li key={node.id._text}>
              <BookPreview {...node} />
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

BookPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default BookPreviewGrid
