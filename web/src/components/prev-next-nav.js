import React from 'react'
import { Button } from 'semantic-ui-react'

const PrevNextNav = ({size, pageNumber, getPrev, getNext}) => (

  <Button.Group floated='right' size={size}>
    <Button labelPosition='left' icon='left chevron' content='Prev' onClick={getPrev} />
    <Button.Or text={pageNumber} />
    <Button labelPosition='right' icon='right chevron' content='Next' onClick={getNext} />
  </Button.Group>

)

export default PrevNextNav
