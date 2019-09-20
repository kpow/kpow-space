import React, { Component } from 'react';
import {graphql} from 'gatsby'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
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
      axios.get('https://services.kpow.com/books.php?perPage=6&page=1')
      .then((response) => {
        let json = JSON.parse(convert.xml2json(response.data, {compact: true, spaces: 4}))
        let bookData = json.GoodreadsResponse.reviews.review;
        this.setState({
          booksLoaded: true,
          books: bookData
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
              nodes={projectNodes}
              browseMoreHref='/archive/'
            />
          )}
          <div className="ui horizontal divider">0101010</div>
          {books && (
            
            <BookPreviewGrid
              title='bookfeed'
              nodes={books}
              browseMoreHref='/allbooks/'
              getBooksData={getBooksData}
            />
            
          )}
          <div className="ui horizontal divider">0101010</div>
          {stars && (
            <StarPreviewGrid
              title='starfeed'
              nodes={stars}
              browseMoreHref='/allstars/'
            />
          )}
          <div className="ui horizontal divider">0101010</div>
          <h2>musicgram</h2>
          <h4>I love live music, and collecting clips of it on Instagram :)</h4>
          <div className="elfsight-app-aa9b91b7-7757-4793-aae3-67df059446a2"></div>
          <div className="ui horizontal divider">0101010</div>
       
        </Layout>
      );
    }
  }
}

export default IndexPage
