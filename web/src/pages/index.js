import React from 'react'
import {graphql} from 'gatsby'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import ProjectPreviewGrid from '../components/project-preview-grid'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import goodReadsJSONResponse from 'goodreads-json-api'
import convert from 'xml-js'

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


function getJSON(url) {

  fetch(url)
      .then(response => response.json())
      .then(data => console.log(data));

  // var xhr = new XMLHttpRequest();
  // return new Promise((resolve, reject) => {
  //   xhr.onreadystatechange = function() {
  //     if (xhr.readyState === 4) {
  //       if (xhr.status === 200) {
  //         resolve(JSON.parse(xhr.responseText));
  //       } else {
  //         reject(xhr.responseText);
  //       }
  //     }
  //   };
  //   xhr.open("GET", url);
  //   xhr.send();
  // });
}

function getXML(url) {
  // var xhr = new XMLHttpRequest();
  // return new Promise((resolve, reject) => {
  //   xhr.onreadystatechange = function() {
  //     if (xhr.readyState === 4) {
  //       if (xhr.status === 200) {
  //         resolve(xhr.responseText);
  //       } else {
  //         reject(xhr.responseText);
  //       }
  //     }
  //   };
  //   xhr.open("GET", url);
  //   xhr.send();
  // });
}

const getStarsData = (page = 1) => {
  console.log("getjson");
  getJSON("http://services.kpow.com/stars.php?page=" + page + "&perPage=18")
    .then(data => {
      console.log("page = " + page);
      console.log(data.reverse());
    })
    .then(() => {
      console.log("dingdong");
    });
};

const getBooksData = () => {
  console.log("getbooksjson");
  getXML("http://services.kpow.com/books.php?page=1")
    .then(data => {
      let raw = convert.xml2json(data, {compact: true, spaces: 4})
      let json = JSON.parse(raw);
      let reviews = json.GoodreadsResponse.reviews.review.reverse();
      console.log(reviews);
    })
    .then(() => {
      console.log("dingdong");
    });
};

getStarsData();
getBooksData();

const IndexPage = props => {
 
  const {data, errors} = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterOutDocsPublishedInTheFuture)
    : []

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
        {projectNodes && (
          <ProjectPreviewGrid
            title='Latest projects'
            nodes={projectNodes}
            browseMoreHref='/archive/'
          />
        )}
        <h2>K-Musicgram</h2>
        <div className="elfsight-app-aa9b91b7-7757-4793-aae3-67df059446a2"></div>

    </Layout>
  )
}

export default IndexPage
