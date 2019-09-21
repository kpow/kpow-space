import React from 'react'
import {graphql} from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import BookPreviewGrid from '../components/book-preview-grid'
import Layout from '../containers/layout'
import {mapEdgesToNodes, filterOutToRead} from '../lib/helpers'
import axios from 'axios'
import convert from 'xml-js'

export const query = graphql`
  query AllBooksPageQuery {
    projects: allSanityProject(
      limit: 12
      sort: {fields: [publishedAt], order: DESC}
      filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}
    ) {
      edges {
        node {
          id
          mainImage {
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


class AllbooksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      booksLoaded: false,
      books: [],
      page:1
    };
  }

  getBookData(page=1){
    console.log('getbooksjson');
      axios.get('https://services.kpow.com/books.php?perPage=18&page='+page)
      .then((response) => {
        const json = JSON.parse(convert.xml2json(response.data, {compact: true, spaces: 4}))
        const bookData = json.GoodreadsResponse.reviews.review;

        this.setState({
          booksLoaded: true,
          books: bookData
        });

      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => { });
  }

  componentDidMount() {
      console.log('getbooksjson');
      this.getBookData();
  }

  render() {

    const { error, booksLoaded, data, books } = this.state
    const errors = this.props.errors
    
    if (errors) {
      return (
        <Layout>
          <GraphQLErrorList errors={errors} />
        </Layout>
      )
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <Layout>
          <div className="ui horizontal divider">0101010</div>
          
          {books && (
            <BookPreviewGrid
              title='bookfeed'
              nodes={books}
            />
          )}
       
         <div className="ui horizontal divider">0101010</div>
       
        </Layout>
      );
    }
  }
}


export default AllbooksPage
