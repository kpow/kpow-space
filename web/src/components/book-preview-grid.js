import React from 'react'
import BookPreview from './book-preview'
import {Container, Button} from 'semantic-ui-react'
import styles from './book-preview-grid.module.css'

function BookPreviewGrid (props) {
  const nextPage = props.getBooksData;
  return (
    <div className={styles.root}>
      {props.title && <h2>{props.title}</h2>}
      <h4>I have a "thing" for science fiction. Here is a list of books I've read or will read :)</h4>
      <ul className={styles.grid}>
        {props.nodes &&
          props.nodes.map(node => (
            <li key={node.id._text}>
              <BookPreview {...node} />
            </li>
          ))} 
      </ul>
      {/*<Container style={{marginBottom:'40px'}} >
        <Button.Group
          compact
          size="medium"
          style={{ float: 'right', paddingTop: '15px', marginBottom: '15px' }}>
          <Button
            onClick={nextPage}
            labelPosition="left"
            icon="left chevron"
            content="Prev"
          />
          <Button
            labelPosition="right"
            icon="right chevron"
            content="Next"
          />
        </Button.Group>
          </Container>*/}
    </div>
  )
}

BookPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default BookPreviewGrid
