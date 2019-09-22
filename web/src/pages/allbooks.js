import React from 'react'
import {graphql} from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import BookPreviewGrid from '../components/book-preview-grid'
import Layout from '../containers/layout'
import {mapEdgesToNodes, filterOutToRead} from '../lib/helpers'
import PrevNextNav from '../components/prev-next-nav'
import axios from 'axios'
import convert from 'xml-js'
import {Responsive} from 'semantic-ui-react'

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

  getBookData=(page=1)=>{
    console.log('getbooksjson');
      axios.get('https://services.kpow.com/books.php?perPage=9&page='+page)
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

  getNext = () => {
    const nextPage = this.state.page+1
    this.setState({
      page:nextPage
    })
    this.getBookData(nextPage)

  }

  getPrev = () => {
    if(this.state.page>1){
      const prevPage = this.state.page-1
      this.setState({
        page:prevPage
      })
      this.getBookData(prevPage)
    }
  }

  componentDidMount() {
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
         <Responsive maxWidth={768}>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </Responsive>
          <div className="ui horizontal divider">0101010</div>
          <PrevNextNav 
            pageNumber={this.state.page} 
            getNext={this.getNext} getPrev={this.getPrev} 
          />
          {books && (
            <BookPreviewGrid
              title='bookfeed'
              subtitle='I have a "thing" for science fiction. Here is my list of books from goodreads :)'
              nodes={books}
            />
          )}
           
              
                
        <Responsive maxWidth={768}>
          <PrevNextNav 
            pageNumber={this.state.page} 
            getNext={this.getNext} getPrev={this.getPrev} 
           />
        </Responsive>
        
         <div className="ui horizontal divider">0101010</div>
            <br></br>
        </Layout>
      );
    }
  }
}


export default AllbooksPage
