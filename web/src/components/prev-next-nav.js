import React from 'react'
import { Button } from 'semantic-ui-react'

const PrevNextNav = (props) => (
  <Button.Group floated='right'>
    <Button labelPosition='left' icon='left chevron' content='Prev' onClick={props.getPrev} />
    <Button.Or text={props.pageNumber} />    
    <Button labelPosition='right' icon='right chevron' content='Next' onClick={props.getNext} />
  </Button.Group>
)

export default PrevNextNav