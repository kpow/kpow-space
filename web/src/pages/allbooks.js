import React from 'react'
import { graphql } from 'gatsby'
import GraphQLErrorList from '../components/graphql-error-list'
import BookPreviewGrid from '../components/book-preview-grid'
import Layout from '../containers/layout'
import PrevNextNav from '../components/prev-next-nav'
import axios from 'axios'
import convert from 'xml-js'
// import getBookData from '../lib/data'
import { Responsive } from 'semantic-ui-react'
import analytics from '../lib/analytics'

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
  constructor (props) {
    super(props)
    this.state = {
      error: null,
      booksLoaded: false,
      books: [],
      page: 1
    }
  }

   getBookData = (page = 1) => {
    axios.get('https://services.kpow.com/books.php?perPage=200&page=' + page)
      .then((response) => {
        const json = JSON.parse(convert.xml2json(response.data, { compact: true, spaces: 4 }))
        const bookData = json.GoodreadsResponse.reviews.review
        
        if (this.state.page > 1)window.scrollTo(0, 0)
        
        this.setState({
          booksLoaded: true,
          books: bookData
        })
  
        analytics.track('data-load', {
          category: 'books',
          label: 'page',
          value: this.state.page
        })

      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => { })
  }
  

  getNext = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
        booksLoaded: false
      }
    })
    this.getBookData(this.state.page + 1)

  }

  getPrev = () => {
    if (this.state.page > 1) {
      this.setState(prevState => {
        return {
          page: prevState.page - 1,
          booksLoaded: false
        }
      })
      this.getBookData(this.state.page - 1)
    }
  }

  componentDidMount () {
    analytics.page()
    this.getBookData()
  }

  render () {
    const { error, booksLoaded, books } = this.state
    const errors = this.props.errors

    if (errors) {
      return (
        <Layout>
          <GraphQLErrorList errors={errors} />
        </Layout>
      )
    }

    if (error) {
      return <div>Error: {error.message}</div>
    } else {
      return (
        <Layout>
          <main>
            <Responsive maxWidth={768}>
              <PrevNextNav
                pageNumber={this.state.page}
                getNext={this.getNext} 
                getPrev={this.getPrev}
                size='tiny'
              />
            </Responsive>

            <div className="ui horizontal divider">0101010</div>

            <Responsive minWidth={768}>
              <PrevNextNav
                pageNumber={this.state.page}
                getNext={this.getNext} 
                getPrev={this.getPrev}
                size='medium'
              />
            </Responsive>

            {books && (
              <BookPreviewGrid
                title='bookfeed'
                subtitle='Here is my list of books - I have a "thing" for science fiction :)'
                booksLoaded={booksLoaded}
                nodes={books}
              />
            )}

            <Responsive maxWidth={768}>
              <PrevNextNav
                pageNumber={this.state.page}
                getNext={this.getNext} 
                getPrev={this.getPrev}
                size='mini'
              />
            </Responsive>

            <div className="ui horizontal divider">0101010</div>
            <br></br>
          </main>
        </Layout>
      );
    }
  }
}


export default AllbooksPage
