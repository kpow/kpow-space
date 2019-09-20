import {format, distanceInWords, differenceInDays} from 'date-fns'
import React from 'react'
import {Link} from 'gatsby'
import {buildImageObj} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import BlockContent from './block-content'
import Container from './container'
import RoleList from './role-list'
import { Grid, Button, Icon, Header, Divider } from 'semantic-ui-react'
import styles from './project.module.css'

function Project (props) {
  const {_rawBody, title, categories, mainImage, members, url, publishedAt, relatedProjects} = props
  return (
    <>
    <Divider horizontal>0101010</Divider>
    <article className={styles.root}>
      {props.mainImage && mainImage.asset && (
        <div className={styles.mainImage}>
          <img
            src={imageUrlFor(buildImageObj(mainImage))
              .width(1200)
              .height(Math.floor((9 / 16) * 1200))
              .fit('crop')
              .url()}
            alt={mainImage.alt}
          />
        </div>
      )}
    <Divider horizontal>~</Divider>
    <Grid>
    <Grid.Column width={11}>
      <Header as='h2'>{title}</Header>
      {_rawBody && <BlockContent blocks={_rawBody || []} />}
    </Grid.Column>
    <Grid.Column width={4}>
          {members && members.length > 0 && <RoleList items={members} title='Project members' />}
            {categories && categories.length > 0 && (
              <div>
                <Header as='h4'>Roles</Header>
                <ul>
                  {categories.map(category => (
                    <li key={category._id}>{category.title}</li>
                  ))}
                </ul>
              </div>
          )}

         
          
          {url && (
            <>
            <Divider horizontal>~</Divider>
            <Button as='a' target='_new' href={url} animated fluid>
              <Button.Content visible>View Project</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow right' />
              </Button.Content>
            </Button>
            </>
          )}
          
    </Grid.Column>
    </Grid>
    </article>
    <Divider horizontal>0101010</Divider>
    </>
  )
}




export default Project
