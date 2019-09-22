import React, { Component } from 'react';
import {graphql} from 'gatsby'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture,
  filterOutToRead
} from '../lib/helpers'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import ProjectPreviewGrid from '../components/project-preview-grid'
import StarPreviewGrid from '../components/star-preview-grid'
import BookPreviewGrid from '../components/book-preview-grid'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import convert from 'xml-js'
import axios from 'axios'
import {Button, Icon, Responsive} from 'semantic-ui-react'

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
      keywords
    }
    projects: allSanityProject(
      limit: 6
      sort: {fields: [publishedAt], order: DESC}
      filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}
    ) {
      edges {
        node {
          id
          mainImage {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`


class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      booksLoaded: false,
      starsLoaded: false,
      items: [],
      books: [],
      stars: [],
      data: props.data,
    };
  }

  componentDidMount() {
 
    console.log('getbooksjson');
      axios.get('https://services.kpow.com/books.php?perPage=24&page=1')
      .then((response) => {
        const json = JSON.parse(convert.xml2json(response.data, {compact: true, spaces: 4}))
        const bookData = json.GoodreadsResponse.reviews.review;
        const bookNodes = bookData.filter(filterOutToRead).slice(0,6)        
        
        this.setState({
          booksLoaded: true,
          books: bookNodes
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => { });

    console.log("getjson");
    axios.get('https://services.kpow.com/stars.php?page=' + 1 + '&perPage=6')
    .then((response) => {
      let starData = response.data.reverse();
      this.setState({
        starsLoaded: true,
        stars: starData
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => { });
  }

  render() {

    const getBooksData = (page = 1) => {
      console.log('getbooksjson');
    }


    const { error, starsLoaded, booksLoaded, items, books, data, stars } = this.state
    const errors = this.props.errors
    const site = (data || {}).site

    const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterOutDocsPublishedInTheFuture)
    : []

    
    if (errors) {
      return (
        <Layout>
          <GraphQLErrorList errors={errors} />
        </Layout>
      )
    }

    if (!site) {
      throw new Error(
        'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
      )
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <Layout>
          <SEO title={site.title} description={site.description} keywords={site.keywords} />

          <div className="ui horizontal divider">0101010</div>
          {projectNodes && (
            <ProjectPreviewGrid
              title='k-projects'
              subtitle='Here are a few of the projects I have worked on. I have more by request :)'
              nodes={projectNodes}
              browseMoreHref='/archive/'
            />
          )}
          <div className="ui horizontal divider">0101010</div>
          {books && (
            
            <BookPreviewGrid
              title='bookfeed'
              subtitle='I have a "thing" for science fiction. Here is my list of books from goodreads :)'
              nodes={books}
              browseMoreHref='/allbooks/'
              getBooksData={getBooksData}
            />
            
          )}
          <div className="ui horizontal divider">0101010</div>
          {stars && (
            <StarPreviewGrid
              title='starfeed'
              subtitle='Here are some of the articles I have collected from all my feeds :)'
              nodes={stars}
              browseMoreHref='/allstars/'
            />
          )}
          <div className="ui horizontal divider">0101010</div>
          <h2>musicgram</h2>
          <h4>I love live music, and collecting clips of it on Instagram :)</h4>
          <div className="elfsight-app-aa9b91b7-7757-4793-aae3-67df059446a2"></div>
          <div>
         
           <Button 
              as='a' 
              animated 
              floated='right'
              href='https://instagram.com/kpow_musicgram'
              style={{marginTop:'8px'}}
              target='_new'
              color='blue'
            >
            <Button.Content visible>View on IG</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow right' />
            </Button.Content>
          </Button>
         
          </div>
          <div  style={{marginBottom:'24px'}} className="ui horizontal divider">0101010</div>
            
        </Layout>
      );
    }
  }
}

export default IndexPage
