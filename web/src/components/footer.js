import React from 'react'
import {
  Container,Grid,Header,Image,List,Segment,
} from 'semantic-ui-react';

const headShot = require('../static/headshot.png')


const Footer = ({}) => (
      <Segment inverted vertical style={{ padding: '5em 0em'}}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={4}>
                <Header inverted as='h4' content='Built with' />
                <List link inverted>
                <List.Item>
                  I'm using Gatsby for static site generation and React for the Front-end. I'm using the GoodReads API, Feedbin API and Instagram.
                </List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={2}>
                <Header inverted as='h4' content='APIs used' />
                <List link inverted>
                <List.Item as='a' href='https://feedbin.com/'>Feedbin</List.Item>
                <List.Item as='a' href='https://www.goodreads.com/'>GoodReads</List.Item>
                <List.Item as='a' href='https://instagram.com'>Instagram</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Image src={headShot} floated='left' verticalAlign='bottom'/>
                <Header as='h4' inverted subheader='Kevin Power' content='About Kpow' style={{ margin:0, marginBottom:'30px'}}/>

                <p>Digital Architect/Maker/Leader. Voracious reader and  dad extraordinaire. Music, Travel, Poker, Pugs, and Pixels.</p>
                <p>Beginning to form my <a href='https://en.wikipedia.org/wiki/Technological_singularity'>post-singularity</a> self with this website.</p>

              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as='h4' content='Contact' />
                <List link inverted>
                  <List.Item as='a' href="mailto:kpow@kpow.com">kpow@kpow.com</List.Item>
                  <List.Item as='a' href="https://www.visualcv.com/kevin-power">resume</List.Item>
                </List>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
  

)

export default Footer
