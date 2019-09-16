import React from 'react'
import {
  Container,Grid,Header,Image,List,Segment,
} from 'semantic-ui-react';


const Footer = ({}) => (


      <Segment inverted vertical style={{ padding: '5em 0em'}}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={4}>
                <Header inverted as='h4' content='Built with' />
                <List link inverted>
                <List.Item>
                  Still nailing down this part :)
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
                <Image src='https://graph.facebook.com/1169805863/picture' floated='left' verticalAlign='bottom'/>
                <Header as='h4' inverted subheader='Kevin Power' content='About Kpow' style={{ margin:0, marginBottom:'30px'}}/>

                <p>Interwebz wrangler. at <a href='https://mobelux.com'>Mobelux</a>. Voracious reader and  dad extraordinaire. Music, Travel, Poker, Pugs, and Pixels.</p>
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
