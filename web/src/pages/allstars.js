import React from 'react'
import {graphql} from 'gatsby'
import GraphQLErrorList from '../components/graphql-error-list'
import StarPreviewGrid from '../components/star-preview-grid'
import PrevNextNav from '../components/prev-next-nav'
import Layout from '../containers/layout'
import axios from 'axios'
import {Responsive} from 'semantic-ui-react'
import analytics from '../lib/analytics'

export const query = graphql`
  query AllstarsPageQuery {
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

class AllstarsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      starsLoaded: false,
      stars: [],
      page:1
    };
  }

  getStarData = (page=1) => {
    console.log("getjson");
    axios.get('https://services.kpow.com/stars.php?page=' + page + '&perPage=9')
    .then((response) => {
      let starData = response.data.reverse();
      if(this.state.page>1)window.scrollTo(0, 0);
      this.setState({
        starsLoaded: true,
        stars: starData,
      });
      analytics.track('data-load', {
        category: 'stars',
        label: 'page',
        value: this.state.page
      })
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => { });
  }

  getNext = () => {
    const nextPage = this.state.page+1
    this.setState({
      page:nextPage,
      starsLoaded: false,
    })
    this.getStarData(nextPage)

  }

  getPrev = () => {
    if(this.state.page>1){
      const prevPage = this.state.page-1
      this.setState({
        page:prevPage,
        starsLoaded: false,
      })
      this.getStarData(prevPage)
    }
  }

  componentDidMount() {
      analytics.page()
      this.getStarData();
  }

  render() {

    const { error, starsLoaded, stars } = this.state
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
          <main>
            <Responsive maxWidth={768}>
              <PrevNextNav 
              pageNumber={this.state.page} 
              getNext={this.getNext} getPrev={this.getPrev} 
              size='tiny'
            />
            </Responsive>

            <div className="ui horizontal divider">0101010</div>
            
            <Responsive minWidth={768}>
              <PrevNextNav 
              pageNumber={this.state.page} 
              getNext={this.getNext} getPrev={this.getPrev} 
              size='medium'
            />
            </Responsive>

            {stars && (
              <StarPreviewGrid
                title='starfeed'
                subtitle='Some of the articles collected from all my feeds'
                starsLoaded={starsLoaded}
                nodes={stars}
              />
            )}
        
            <Responsive minWidth={768}>
              <PrevNextNav 
                pageNumber={this.state.page} 
                getNext={this.getNext} getPrev={this.getPrev} 
                size='medium'
              />
            </Responsive>
            <Responsive maxWidth={768}>
              <PrevNextNav 
                pageNumber={this.state.page} 
                getNext={this.getNext} getPrev={this.getPrev} 
                size='tiny'
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


export default AllstarsPage
