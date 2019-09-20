import React from 'react'
import {graphql} from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import StarPreviewGrid from '../components/star-preview-grid'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import {mapEdgesToNodes, filterOutDocsWithoutSlugs} from '../lib/helpers'
import axios from 'axios'

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
      stars: []
    };
  }

  componentDidMount() {
 
    console.log("getjson");
    axios.get('https://services.kpow.com/stars.php?page=' + 1 + '&perPage=27')
    .then((response) => {
      let starData = response.data.reverse();
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
          <div className="ui horizontal divider">0101010</div>
          
          {stars && (
            <StarPreviewGrid
              title='starfeed'
              nodes={stars}
            />
          )}
       
         <div className="ui horizontal divider">0101010</div>
       
        </Layout>
      );
    }
  }
}


export default AllstarsPage
