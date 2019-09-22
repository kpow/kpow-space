import React from 'react'
import {graphql} from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import StarPreviewGrid from '../components/star-preview-grid'
import PrevNextNav from '../components/prev-next-nav'
import Layout from '../containers/layout'
import {mapEdgesToNodes, filterOutDocsWithoutSlugs} from '../lib/helpers'
import axios from 'axios'
import {Responsive} from 'semantic-ui-react'

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


  getStarData=(page=1)=>{
    console.log("getjson");
    axios.get('https://services.kpow.com/stars.php?page=' + page + '&perPage=9')
    .then((response) => {
      let starData = response.data.reverse();
      console.log(starData)
      this.setState({
        starsLoaded: true,
        stars: starData,
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
    this.getStarData(nextPage)

  }

  getPrev = () => {
    if(this.state.page>1){
      const prevPage = this.state.page-1
      this.setState({
        page:prevPage
      })
      this.getStarData(prevPage)
    }
  }

  componentDidMount() {
      this.getStarData();
  }

  render() {

    const { error, starsLoaded, data, stars } = this.state
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
          {stars && (
            <StarPreviewGrid
              title='starfeed'
              subtitle='Here are some of the articles I have collected from all my feeds :)'
              nodes={stars}
            />
          )}

            <PrevNextNav 
              pageNumber={this.state.page} 
              getNext={this.getNext} getPrev={this.getPrev} 
            />

         <div className="ui horizontal divider">0101010</div>
       <br></br>
        </Layout>
      );
    }
  }
}


export default AllstarsPage
