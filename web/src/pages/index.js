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
import StarPreviewGrid from '../components/star-preview-grid'
import BookPreviewGrid from '../components/book-preview-grid'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import convert from 'xml-js'
import axios from 'axios'
import staticStars from '../static/static-stars'

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
console.log('wwwwwwwwwweeeeeeeeeeeeee')
console.log(staticStars);

let starData;

const getStarsData = (page = 1) => {
  console.log("getjson");
  axios.get('https://services.kpow.com/stars.php?page=' + page + '&perPage=18')
  .then(function (response) {
    // handle success
    let starData = response.data.reverse();
    //console.log(starData);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

};

let bookData;

const getBooksData = () => {
  console.log('getbooksjson');
  axios.get('https://services.kpow.com/books.php?page=1')
  .then(function (response) {
    // handle success
    let raw = convert.xml2json(response.data, {compact: true, spaces: 4})
    let json = JSON.parse(raw)
    bookData = json.GoodreadsResponse.reviews.review.reverse();
    console.log(bookData);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

};

getStarsData();
getBooksData();


const IndexPage = props => {
  const starData =
[
  {
    "id": 2042781261,
    "feed_id": 2194,
    "title": "ArchiveBox — open-source self-hosted web archive",
    "author": "Adam Stacoviak",
    "summary": "This combined with Pinboard is a nice combo! ArchiveBox takes a list of website URLs you want to archive, and creates a local, static, browsable HTML clone of the content from those websites. … It imports lists of URLs, renders the pages in a headless,",
    "content": "\n<p>This combined with <a href=\"https://pinboard.in/\">Pinboard</a> is a nice combo!</p>\n<blockquote>\n<p>ArchiveBox takes a list of website URLs you want to archive, and creates a local, static, browsable HTML clone of the content from those websites. … <mark>It imports lists of URLs, renders the pages in a headless, authenticated, user-scriptable browser, and then archives the content in multiple redundant common formats (HTML, PDF, PNG, WARC) that will last long after the originals disappear off the internet.</mark></p>\n</blockquote>\n\n<p><a href=\"https://changelog.com/news/6D0d\">Discuss on Changelog News</a></p>",
    "url": "https://github.com/pirate/ArchiveBox",
    "extracted_content_url": "https://extract.feedbin.com/parser/feedbin/b876168b5a5db539fde35bb8868c6cb0a5bd7cd7?base64_url=aHR0cHM6Ly9naXRodWIuY29tL3BpcmF0ZS9BcmNoaXZlQm94",
    "published": "2019-03-22T15:38:03.000000Z",
    "created_at": "2019-03-22T15:42:34.670629Z"
  },
  {
    "id": 2192139217,
    "feed_id": 3094,
    "title": "OpenDataCam 2.0 – An open source tool to quantify the world",
    "author": "Filip Visnjic",
    "summary": "OpenDataCam is a open source tool to quantify the world. It consists of a camera attached to a mini computer that is running an object detection algorithm that counts and tracks moving objects.",
    "content": "<div>\n\t<a href=\"https://www.creativeapplications.net/environment/opendatacam-2-0-an-open-source-tool-to-quantify-the-world/\"><img title=\"about-1\" src=\"https://www.creativeapplications.net/wp-content/uploads/2019/08/about-1-1024x651.jpg\" alt=\"OpenDataCam 2.0 – An open source tool to quantify the world\" width=\"1024\" height=\"651\"></a>\n\t</div>\n\tOpenDataCam is a open source tool to quantify the world. It consists of a camera attached to a mini computer that is running an object detection algorithm that counts and tracks moving objects.<img src=\"http://feeds.feedburner.com/~r/creativeapplicationsnet/~4/x-bSIItUU70\" height=\"1\" width=\"1\" alt=\"\">",
    "url": "https://www.creativeapplications.net/environment/opendatacam-2-0-an-open-source-tool-to-quantify-the-world/",
    "extracted_content_url": "https://extract.feedbin.com/parser/feedbin/fad964a49fc38ad8d1d18bc633fb3343d30064f7?base64_url=aHR0cHM6Ly93d3cuY3JlYXRpdmVhcHBsaWNhdGlvbnMubmV0L2Vudmlyb25tZW50L29wZW5kYXRhY2FtLTItMC1hbi1vcGVuLXNvdXJjZS10b29sLXRvLXF1YW50aWZ5LXRoZS13b3JsZC8=",
    "published": "2019-08-30T12:27:12.000000Z",
    "created_at": "2019-08-30T12:41:30.882295Z"
  },
  {
    "id": 2192363114,
    "feed_id": 1289200,
    "title": "Sugar: Open-source software learning platform for children",
    "author": "geogra4",
    "summary": "Article URL: https://sugarlabs.org/ Comments URL: https://news.ycombinator.com/item?id=20839870 Points: 108 #Comments: 43",
    "content": "\n<p>Article URL: <a href=\"https://sugarlabs.org/\">https://sugarlabs.org/</a></p>\n<p>Comments URL: <a href=\"https://news.ycombinator.com/item?id=20839870\">https://news.ycombinator.com/item?id=20839870</a></p>\n<p>Points: 108</p>\n<p># Comments: 43</p>\n",
    "url": "https://sugarlabs.org/",
    "extracted_content_url": "https://extract.feedbin.com/parser/feedbin/5a58314d0bd52fcec07bc07571db1f27310c20d5?base64_url=aHR0cHM6Ly9zdWdhcmxhYnMub3JnLw==",
    "published": "2019-08-30T16:05:29.000000Z",
    "created_at": "2019-08-30T16:46:00.887793Z"
  },
  {
    "id": 2193071113,
    "feed_id": 4519,
    "title": "Tiny Metal Plants, Animals, and Buildings are Liberated From Coins by Artist Micah Adams",
    "author": "Andrew LaSane",
    "summary": "Toronto-based artist Micah Adams uses a jeweler’s saw to cut out the embossed animals, figures, and objects from coins of different sizes and denominations. The metal cut-outs are used to create tiny readymades and fun collages. From a growing pile of",
    "content": "<p><img class=\"alignnone size-full wp-image-117285\" src=\"https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cutout_Penny_Leaves.jpg\" alt=\"\" width=\"2000\" height=\"2000\" srcset=\"https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cutout_Penny_Leaves.jpg 2000w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cutout_Penny_Leaves-150x150.jpg 150w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cutout_Penny_Leaves-640x640.jpg 640w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cutout_Penny_Leaves-768x768.jpg 768w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cutout_Penny_Leaves-960x960.jpg 960w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cutout_Penny_Leaves-624x624.jpg 624w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cutout_Penny_Leaves-50x50.jpg 50w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cutout_Penny_Leaves-1472x1472.jpg 1472w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cutout_Penny_Leaves-1104x1104.jpg 1104w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cutout_Penny_Leaves-912x912.jpg 912w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cutout_Penny_Leaves-550x550.jpg 550w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cutout_Penny_Leaves-470x470.jpg 470w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cutout_Penny_Leaves-150x150@2x.jpg 300w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cutout_Penny_Leaves-640x640@2x.jpg 1280w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cutout_Penny_Leaves-768x768@2x.jpg 1536w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cutout_Penny_Leaves-960x960@2x.jpg 1920w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cutout_Penny_Leaves-624x624@2x.jpg 1248w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cutout_Penny_Leaves-50x50@2x.jpg 100w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cutout_Penny_Leaves-912x912@2x.jpg 1824w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cutout_Penny_Leaves-550x550@2x.jpg 1100w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cutout_Penny_Leaves-470x470@2x.jpg 940w\" sizes=\"(max-width: 2000px) 100vw, 2000px\"></p>\n<p>Toronto-based artist <a href=\"https://www.instagram.com/micahadams.ca/\" target=\"_blank\" rel=\"noopener noreferrer\">Micah Adams</a> uses a jeweler’s saw to cut out the embossed animals, figures, and objects from coins of different sizes and denominations. The metal cut-outs are used to create tiny readymades and fun collages. From a growing pile of copper leaves taken from Canadian pennies, to intricate birds and flowers borrowed from foreign currency, each of Micah Adams works are hand cut using the same basic tool. Working at a smaller scale is something that the artist came to in art college while making sculptures and spending his free time in the jewelry and metal smithing department. The practice of cutting coins evolved out of using other materials.</p>\n<p>“I was making small assemblages from things I’d collected over the years, tiny things like toys, bottle caps, beach finds and even teeth,” Adams tells Colossal. “Then I cast them in metal. They were like tiny bronzes or miniature monuments. That lead me to look for tiny things that were already metal that I could use. So I looked at coins and their designs for things I could cut-out.”</p>\n<p>Micah Adams is currently working on another solo exhibition of his coin collages and other works which will open at MKG127 in Toronto in February 2020. He also has an <a href=\"https://www.etsy.com/shop/MicahAdamsCo\" target=\"_blank\" rel=\"noopener noreferrer\">Etsy shop</a> where he sells earrings, tie tacks, and other keepsakes. For future updates and to see more of his art, follow Adams on <a href=\"https://www.instagram.com/micahadams.ca/\" target=\"_blank\" rel=\"noopener noreferrer\">Instagram</a>.</p>\n<p><img class=\"alignnone size-full wp-image-117188\" src=\"https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut-Coin_Demo.jpg\" alt=\"\" width=\"2000\" height=\"2000\" srcset=\"https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut-Coin_Demo.jpg 2000w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut-Coin_Demo-150x150.jpg 150w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut-Coin_Demo-640x640.jpg 640w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut-Coin_Demo-768x768.jpg 768w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut-Coin_Demo-960x960.jpg 960w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut-Coin_Demo-624x624.jpg 624w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut-Coin_Demo-50x50.jpg 50w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut-Coin_Demo-1472x1472.jpg 1472w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut-Coin_Demo-1104x1104.jpg 1104w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut-Coin_Demo-912x912.jpg 912w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut-Coin_Demo-550x550.jpg 550w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut-Coin_Demo-470x470.jpg 470w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut-Coin_Demo-150x150@2x.jpg 300w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut-Coin_Demo-640x640@2x.jpg 1280w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut-Coin_Demo-768x768@2x.jpg 1536w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut-Coin_Demo-960x960@2x.jpg 1920w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut-Coin_Demo-624x624@2x.jpg 1248w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut-Coin_Demo-50x50@2x.jpg 100w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut-Coin_Demo-912x912@2x.jpg 1824w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut-Coin_Demo-550x550@2x.jpg 1100w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut-Coin_Demo-470x470@2x.jpg 940w\" sizes=\"(max-width: 2000px) 100vw, 2000px\"></p>\n<p><img class=\"alignnone size-full wp-image-117184\" src=\"https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Rocking_Chair_Earring.jpg\" alt=\"\" width=\"2000\" height=\"2000\" srcset=\"https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Rocking_Chair_Earring.jpg 2000w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Rocking_Chair_Earring-150x150.jpg 150w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Rocking_Chair_Earring-640x640.jpg 640w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Rocking_Chair_Earring-768x768.jpg 768w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Rocking_Chair_Earring-960x960.jpg 960w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Rocking_Chair_Earring-624x624.jpg 624w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Rocking_Chair_Earring-50x50.jpg 50w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Rocking_Chair_Earring-1472x1472.jpg 1472w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Rocking_Chair_Earring-1104x1104.jpg 1104w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Rocking_Chair_Earring-912x912.jpg 912w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Rocking_Chair_Earring-550x550.jpg 550w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Rocking_Chair_Earring-470x470.jpg 470w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Rocking_Chair_Earring-150x150@2x.jpg 300w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Rocking_Chair_Earring-640x640@2x.jpg 1280w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Rocking_Chair_Earring-768x768@2x.jpg 1536w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Rocking_Chair_Earring-960x960@2x.jpg 1920w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Rocking_Chair_Earring-624x624@2x.jpg 1248w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Rocking_Chair_Earring-50x50@2x.jpg 100w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Rocking_Chair_Earring-912x912@2x.jpg 1824w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Rocking_Chair_Earring-550x550@2x.jpg 1100w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Rocking_Chair_Earring-470x470@2x.jpg 940w\" sizes=\"(max-width: 2000px) 100vw, 2000px\"></p>\n<p><img class=\"alignnone size-full wp-image-117185\" src=\"https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Nest-of-Birds.jpg\" alt=\"\" width=\"2000\" height=\"2000\" srcset=\"https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Nest-of-Birds.jpg 2000w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Nest-of-Birds-150x150.jpg 150w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Nest-of-Birds-640x640.jpg 640w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Nest-of-Birds-768x768.jpg 768w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Nest-of-Birds-960x960.jpg 960w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Nest-of-Birds-624x624.jpg 624w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Nest-of-Birds-50x50.jpg 50w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Nest-of-Birds-1472x1472.jpg 1472w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Nest-of-Birds-1104x1104.jpg 1104w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Nest-of-Birds-912x912.jpg 912w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Nest-of-Birds-550x550.jpg 550w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Nest-of-Birds-470x470.jpg 470w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Nest-of-Birds-150x150@2x.jpg 300w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Nest-of-Birds-640x640@2x.jpg 1280w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Nest-of-Birds-768x768@2x.jpg 1536w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Nest-of-Birds-960x960@2x.jpg 1920w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Nest-of-Birds-624x624@2x.jpg 1248w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Nest-of-Birds-50x50@2x.jpg 100w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Nest-of-Birds-912x912@2x.jpg 1824w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Nest-of-Birds-550x550@2x.jpg 1100w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Nest-of-Birds-470x470@2x.jpg 940w\" sizes=\"(max-width: 2000px) 100vw, 2000px\"></p>\n<p><img class=\"alignnone size-full wp-image-117186\" src=\"https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Lincoln_Penny_Glasses_with_Chain.jpg\" alt=\"\" width=\"2000\" height=\"2000\" srcset=\"https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Lincoln_Penny_Glasses_with_Chain.jpg 2000w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Lincoln_Penny_Glasses_with_Chain-150x150.jpg 150w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Lincoln_Penny_Glasses_with_Chain-640x640.jpg 640w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Lincoln_Penny_Glasses_with_Chain-768x768.jpg 768w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Lincoln_Penny_Glasses_with_Chain-960x960.jpg 960w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Lincoln_Penny_Glasses_with_Chain-624x624.jpg 624w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Lincoln_Penny_Glasses_with_Chain-50x50.jpg 50w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Lincoln_Penny_Glasses_with_Chain-1472x1472.jpg 1472w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Lincoln_Penny_Glasses_with_Chain-1104x1104.jpg 1104w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Lincoln_Penny_Glasses_with_Chain-912x912.jpg 912w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Lincoln_Penny_Glasses_with_Chain-550x550.jpg 550w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Lincoln_Penny_Glasses_with_Chain-470x470.jpg 470w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Lincoln_Penny_Glasses_with_Chain-150x150@2x.jpg 300w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Lincoln_Penny_Glasses_with_Chain-640x640@2x.jpg 1280w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Lincoln_Penny_Glasses_with_Chain-768x768@2x.jpg 1536w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Lincoln_Penny_Glasses_with_Chain-960x960@2x.jpg 1920w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Lincoln_Penny_Glasses_with_Chain-624x624@2x.jpg 1248w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Lincoln_Penny_Glasses_with_Chain-50x50@2x.jpg 100w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Lincoln_Penny_Glasses_with_Chain-912x912@2x.jpg 1824w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Lincoln_Penny_Glasses_with_Chain-550x550@2x.jpg 1100w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Lincoln_Penny_Glasses_with_Chain-470x470@2x.jpg 940w\" sizes=\"(max-width: 2000px) 100vw, 2000px\"></p>\n<p><img class=\"alignnone size-full wp-image-117187\" src=\"https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut_Coin_Bird.jpg\" alt=\"\" width=\"2000\" height=\"2000\" srcset=\"https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut_Coin_Bird.jpg 2000w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut_Coin_Bird-150x150.jpg 150w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut_Coin_Bird-640x640.jpg 640w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut_Coin_Bird-768x768.jpg 768w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut_Coin_Bird-960x960.jpg 960w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut_Coin_Bird-624x624.jpg 624w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut_Coin_Bird-50x50.jpg 50w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut_Coin_Bird-1472x1472.jpg 1472w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut_Coin_Bird-1104x1104.jpg 1104w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut_Coin_Bird-912x912.jpg 912w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut_Coin_Bird-550x550.jpg 550w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut_Coin_Bird-470x470.jpg 470w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut_Coin_Bird-150x150@2x.jpg 300w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut_Coin_Bird-640x640@2x.jpg 1280w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut_Coin_Bird-768x768@2x.jpg 1536w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut_Coin_Bird-960x960@2x.jpg 1920w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut_Coin_Bird-624x624@2x.jpg 1248w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut_Coin_Bird-50x50@2x.jpg 100w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut_Coin_Bird-912x912@2x.jpg 1824w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut_Coin_Bird-550x550@2x.jpg 1100w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Cut_Coin_Bird-470x470@2x.jpg 940w\" sizes=\"(max-width: 2000px) 100vw, 2000px\"></p>\n<p><img class=\"alignnone size-full wp-image-117189\" src=\"https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Coin_Flower_Bouquet_Brooch.jpg\" alt=\"\" width=\"2000\" height=\"2000\" srcset=\"https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Coin_Flower_Bouquet_Brooch.jpg 2000w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Coin_Flower_Bouquet_Brooch-150x150.jpg 150w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Coin_Flower_Bouquet_Brooch-640x640.jpg 640w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Coin_Flower_Bouquet_Brooch-768x768.jpg 768w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Coin_Flower_Bouquet_Brooch-960x960.jpg 960w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Coin_Flower_Bouquet_Brooch-624x624.jpg 624w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Coin_Flower_Bouquet_Brooch-50x50.jpg 50w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Coin_Flower_Bouquet_Brooch-1472x1472.jpg 1472w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Coin_Flower_Bouquet_Brooch-1104x1104.jpg 1104w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Coin_Flower_Bouquet_Brooch-912x912.jpg 912w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Coin_Flower_Bouquet_Brooch-550x550.jpg 550w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Coin_Flower_Bouquet_Brooch-470x470.jpg 470w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Coin_Flower_Bouquet_Brooch-150x150@2x.jpg 300w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Coin_Flower_Bouquet_Brooch-640x640@2x.jpg 1280w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Coin_Flower_Bouquet_Brooch-768x768@2x.jpg 1536w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Coin_Flower_Bouquet_Brooch-960x960@2x.jpg 1920w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Coin_Flower_Bouquet_Brooch-624x624@2x.jpg 1248w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Coin_Flower_Bouquet_Brooch-50x50@2x.jpg 100w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Coin_Flower_Bouquet_Brooch-912x912@2x.jpg 1824w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Coin_Flower_Bouquet_Brooch-550x550@2x.jpg 1100w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Coin_Flower_Bouquet_Brooch-470x470@2x.jpg 940w\" sizes=\"(max-width: 2000px) 100vw, 2000px\"></p>\n<p><img class=\"alignnone size-full wp-image-117190\" src=\"https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Kangaroo.jpg\" alt=\"\" width=\"2000\" height=\"2000\" srcset=\"https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Kangaroo.jpg 2000w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Kangaroo-150x150.jpg 150w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Kangaroo-640x640.jpg 640w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Kangaroo-768x768.jpg 768w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Kangaroo-960x960.jpg 960w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Kangaroo-624x624.jpg 624w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Kangaroo-50x50.jpg 50w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Kangaroo-1472x1472.jpg 1472w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Kangaroo-1104x1104.jpg 1104w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Kangaroo-912x912.jpg 912w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Kangaroo-550x550.jpg 550w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Kangaroo-470x470.jpg 470w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Kangaroo-150x150@2x.jpg 300w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Kangaroo-640x640@2x.jpg 1280w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Kangaroo-768x768@2x.jpg 1536w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Kangaroo-960x960@2x.jpg 1920w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Kangaroo-624x624@2x.jpg 1248w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Kangaroo-50x50@2x.jpg 100w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Kangaroo-912x912@2x.jpg 1824w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Kangaroo-550x550@2x.jpg 1100w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Kangaroo-470x470@2x.jpg 940w\" sizes=\"(max-width: 2000px) 100vw, 2000px\"></p>\n<p><img class=\"alignnone size-full wp-image-117192\" src=\"https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Bobcat.jpg\" alt=\"\" width=\"2000\" height=\"2000\" srcset=\"https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Bobcat.jpg 2000w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Bobcat-150x150.jpg 150w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Bobcat-640x640.jpg 640w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Bobcat-768x768.jpg 768w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Bobcat-960x960.jpg 960w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Bobcat-624x624.jpg 624w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Bobcat-50x50.jpg 50w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Bobcat-1472x1472.jpg 1472w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Bobcat-1104x1104.jpg 1104w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Bobcat-912x912.jpg 912w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Bobcat-550x550.jpg 550w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Bobcat-470x470.jpg 470w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Bobcat-150x150@2x.jpg 300w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Bobcat-640x640@2x.jpg 1280w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Bobcat-768x768@2x.jpg 1536w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Bobcat-960x960@2x.jpg 1920w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Bobcat-624x624@2x.jpg 1248w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Bobcat-50x50@2x.jpg 100w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Bobcat-912x912@2x.jpg 1824w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Bobcat-550x550@2x.jpg 1100w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Caribou_Bobcat-470x470@2x.jpg 940w\" sizes=\"(max-width: 2000px) 100vw, 2000px\"></p>\n<p><img class=\"alignnone size-full wp-image-117193\" src=\"https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_mobile_Earrings.jpg\" alt=\"\" width=\"2000\" height=\"2000\" srcset=\"https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_mobile_Earrings.jpg 2000w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_mobile_Earrings-150x150.jpg 150w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_mobile_Earrings-640x640.jpg 640w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_mobile_Earrings-768x768.jpg 768w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_mobile_Earrings-960x960.jpg 960w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_mobile_Earrings-624x624.jpg 624w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_mobile_Earrings-50x50.jpg 50w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_mobile_Earrings-1472x1472.jpg 1472w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_mobile_Earrings-1104x1104.jpg 1104w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_mobile_Earrings-912x912.jpg 912w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_mobile_Earrings-550x550.jpg 550w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_mobile_Earrings-470x470.jpg 470w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_mobile_Earrings-150x150@2x.jpg 300w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_mobile_Earrings-640x640@2x.jpg 1280w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_mobile_Earrings-768x768@2x.jpg 1536w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_mobile_Earrings-960x960@2x.jpg 1920w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_mobile_Earrings-624x624@2x.jpg 1248w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_mobile_Earrings-50x50@2x.jpg 100w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_mobile_Earrings-912x912@2x.jpg 1824w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_mobile_Earrings-550x550@2x.jpg 1100w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_mobile_Earrings-470x470@2x.jpg 940w\" sizes=\"(max-width: 2000px) 100vw, 2000px\"></p>\n<p><img class=\"alignnone size-full wp-image-117194\" src=\"https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_Brooch.jpg\" alt=\"\" width=\"2000\" height=\"1333\" srcset=\"https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_Brooch.jpg 2000w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_Brooch-640x427.jpg 640w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_Brooch-768x512.jpg 768w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_Brooch-960x640.jpg 960w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_Brooch-624x416.jpg 624w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_Brooch-640x427@2x.jpg 1280w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_Brooch-768x512@2x.jpg 1536w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_Brooch-960x640@2x.jpg 1920w, https://www.thisiscolossal.com/wp-content/uploads/2019/08/Micah_Adams_Birds_In_Flight_Brooch-624x416@2x.jpg 1248w\" sizes=\"(max-width: 2000px) 100vw, 2000px\"></p>\n<img src=\"http://feeds.feedburner.com/~r/colossal/~4/08vzp8xmQJs\" height=\"1\" width=\"1\" alt=\"\">",
    "url": "https://www.thisiscolossal.com/2019/08/micah-adams-handcarved-coins/",
    "extracted_content_url": "https://extract.feedbin.com/parser/feedbin/1324abc3fb316b44674e083aa1632f821cb3a12c?base64_url=aHR0cHM6Ly93d3cudGhpc2lzY29sb3NzYWwuY29tLzIwMTkvMDgvbWljYWgtYWRhbXMtaGFuZGNhcnZlZC1jb2lucy8=",
    "published": "2019-08-31T15:21:07.000000Z",
    "created_at": "2019-08-31T15:21:22.946755Z"
  },
  {
    "id": 2194251184,
    "feed_id": 1289200,
    "title": "America's Depressing New Culture War",
    "author": "atlasunshrugged",
    "summary": "Article URL: https://www.bloomberg.com/opinion/articles/2019-08-29/patreon-s-top-50-list-values-the-ordinary-over-the-transcendent Comments URL: https://news.ycombinator.com/item?id=20857645 Points: 33 #Comments: 24",
    "content": "\n<p>Article URL: <a href=\"https://www.bloomberg.com/opinion/articles/2019-08-29/patreon-s-top-50-list-values-the-ordinary-over-the-transcendent\">https://www.bloomberg.com/opinion/articles/2019-08-29/patreon-s-top-50-list-values-the-ordinary-over-the-transcendent</a></p>\n<p>Comments URL: <a href=\"https://news.ycombinator.com/item?id=20857645\">https://news.ycombinator.com/item?id=20857645</a></p>\n<p>Points: 33</p>\n<p># Comments: 24</p>\n",
    "url": "https://www.bloomberg.com/opinion/articles/2019-08-29/patreon-s-top-50-list-values-the-ordinary-over-the-transcendent",
    "extracted_content_url": "https://extract.feedbin.com/parser/feedbin/ecf3d4d903116ee44bda6cf246a450bc691cae04?base64_url=aHR0cHM6Ly93d3cuYmxvb21iZXJnLmNvbS9vcGluaW9uL2FydGljbGVzLzIwMTktMDgtMjkvcGF0cmVvbi1zLXRvcC01MC1saXN0LXZhbHVlcy10aGUtb3JkaW5hcnktb3Zlci10aGUtdHJhbnNjZW5kZW50",
    "published": "2019-09-02T08:39:52.000000Z",
    "created_at": "2019-09-02T09:51:53.767090Z"
  },
  {
    "id": 2194438921,
    "feed_id": 1289200,
    "title": "The Secret History of Dune",
    "author": "currymj",
    "summary": "Article URL: https://lareviewofbooks.org/article/the-secret-history-of-dune/ Comments URL: https://news.ycombinator.com/item?id=20858875 Points: 102 #Comments: 17",
    "content": "\n<p>Article URL: <a href=\"https://lareviewofbooks.org/article/the-secret-history-of-dune/\">https://lareviewofbooks.org/article/the-secret-history-of-dune/</a></p>\n<p>Comments URL: <a href=\"https://news.ycombinator.com/item?id=20858875\">https://news.ycombinator.com/item?id=20858875</a></p>\n<p>Points: 102</p>\n<p># Comments: 17</p>\n",
    "url": "https://lareviewofbooks.org/article/the-secret-history-of-dune/",
    "extracted_content_url": "https://extract.feedbin.com/parser/feedbin/0dd784f84ffef0bff73094cb5076f06260a03456?base64_url=aHR0cHM6Ly9sYXJldmlld29mYm9va3Mub3JnL2FydGljbGUvdGhlLXNlY3JldC1oaXN0b3J5LW9mLWR1bmUv",
    "published": "2019-09-02T13:07:45.000000Z",
    "created_at": "2019-09-02T14:15:48.937407Z"
  },
  {
    "id": 2194689096,
    "feed_id": 16697,
    "title": "Minimum Viable Bureaucracy",
    "author": null,
    "summary": "The world of work has changed. Companies have transitioned from highly structured 9-to-5 clockworks, to always-on controlled chaos engines, partially remote or wholly distributed. Workers are affected too, expected to keep up with the 24/7 schedule of",
    "content": "<div class=\"g8 i2 first\"><div class=\"pad\">\n  \n<p>The world of work has changed. Companies have transitioned from highly structured 9-to-5 clockworks, to always-on controlled chaos engines, partially remote or wholly distributed. Workers are affected too, expected to keep up with the 24/7 schedule of their directors and customers. This is only possible with the many communication and collaboration tools we have at our disposal. I work remotely myself, often across an ocean, and after years of this, I'd like to share some observations and advice.</p>\n\n<p>Mainly, that the use of these tools is often severely flawed. I think it stems from a misconception my generation was brought up on: that technology is an admirable end in itself, rather than merely a means to an end. This attitude was pervasive during the 80s and 90s, when a dash of neon green cyberpunk was enough to be too cool for school. It laid the groundwork for the tireless technological optimism that is now associated with Silicon Valley and its colonies, but which is actually just part of the global zeitgeist.</p>\n\n<p>In this contemporary view, when you have a problem, you get some software, and it fixes it. If it's not yet fixed, you add some more. Need to share documents? Just use Dropbox. Need to collaborate? Just use Google Docs. Need to communicate? Get your own Slack, they're a dime a dozen. But there is a huge cost attached: it doesn't just fragment the work across multiple disconnected spaces, it also severely limits our expressive abilities, shoehorning them into each product and platform's particular workflows and interfaces.</p>\n\n</div></div>\n\n<div class=\"c m1\"></div>\n\n<div class=\"wide mt2\">\n  <a target=\"_blank\" href=\"https://www.imdb.com/title/tt0088846/\"><img src=\"https://acko.net/files/bureaucracy/brazil.jpg\" alt=\"Brazil Movie Poter\"></a>\n</div>\n\n<div class=\"g8 i2 mt1\"><div class=\"pad\">\n\n<h2>The Missing Workplace</h2>\n\n<p>The first and most prominent casualty of this is the office itself: we have carelessly dismissed its invisible benefits for the dubious luxury of going to work in our pyjamas as remote workers. This is accelerated by the plague of open plan offices, which resemble cafeterias more than workshops or labs. The result in both cases is the same: employees sequester themselves, behind headphones or physical distance, shut off from the everyday cues that provide ambient legibility to the workplace.</p>\n\n<p>It's not just the water cooler that's missing. Did that meeting go well, or are people leaving with their hands in their hair? Is someone usually the last one to turn off the lights, and do they need help? Is now a good time to talk about that thing, or are they busy putting out 4 fires at once? Did they even get a decent night sleep? Good luck reading any of that off a flakey online status indicator that is multiple timezones away.</p>\n\n<p class=\"mt2 mb2\"><img src=\"https://acko.net/files/bureaucracy/status.png\" alt=\"Slack status\" class=\"mt1 mb1\"></p>\n\n<p>There are tools to fix this, of course. Just set a custom status! With emoji! Now, instead of just going about your work day like a human, you have to constantly self-monitor and provide timely updates on your activities and mental state. But there's an app for that, don't worry. Everyone turns into their own public relations agent, while expected to actively monitor everyone else's feeds. The solution is more of the problem, and the simple medium of body language is replaced by a somewhat trite and trivially spoofable bark. The only way you will get the real information at a distance is by having a serious conversation about it, which takes time and energy.</p>\n\n<p>Even if you do though, you won't be privy to who else is talking to who, unless you explicitly ask. Innocently peeking in through the meeting room glass makes way for a complete lack of transparency. More so, clients don't even visit, lunches are often eaten alone, and occasional beers on Friday are usually off the table. They're not coming back when your workforce is spread across multiple timezones. This is a fundamentally different workplace, which needs a different approach.</p>\n\n<p>The environment is asynchronous by default, yet people often still try to work in a synchronous way. We continue to try and maintain the personal and professional protocols of face to face interaction, even if they're a terrible fit. If you've ever been pinged with a context-less \"hey,\" waiting for your acknowledgement before telling you what's up, you have experienced this. Your conversation partner has failed to realize they have all the time in the world to converse slowly, glacially even, with care and thought put into every message, which is the opposite of rude in that situation. Because it means you can't decide if it's actually necessary to respond if the timing is inconvenient.</p>\n\n<p>A related example is the in-person \"hey, I just sent you an email\": they know they'll get a response eventually, but they want one now. By first sending the email, they are able to launder their interruption, passing the bulk of the message asynchronously, while keeping their synchronous message a seemingly trivial nothing. This isn't always bad, if you e.g. summarize some urgent notes immediately and let the email fill out the details, but this is rarely the case.</p>\n\n<h2 class=\"mt3\">Write-Only Media</h2>\n\n<p>The notifications themselves are also a problem. They feature so prominently, they turn every issue into a priority 1 crisis. If left to accumulate for later they just get in the way, like a desk you can't even clear. The expectation is that you'll immediately want to look at it, and this is why they are so enticing for the sender: a response is practically guaranteed. But any medium that caters more to the writer than the reader should be treated with extreme skepticism <em>[Twitter, 2006]</em>.</p>\n\n<p>Instant notifications are an example of a mechanism that produces negative work. Whatever task is being interrupted is not just on pause, you've added an additional cost of context switching away and back that wasn't there before. A more destructive version is the careless Reply to All and its close sibling, the lazy Forward to Y'all. Whatever was said, instead of now 1 person reading it, there will be many. Everyone will now spend time digesting it independently, offering a multitude of uncoordinated replies, each of which will then need to be read, and so on. It can even become iterated negative work, and it scales up quickly.</p>\n\n<p>Any time a manager forwards mails wholesale from the level above, or a rep forwards requests from a 3rd party to the entire team, this is what they are doing, and they should really stop that. Instead, you should make sure everyone mainly mass-sends answers, rather than questions. The purpose of a manager and a rep is to shield one side of a process from the details of the other after all. You do not want unfiltered, unvetted assignments to be mixed in with the highly focused, day to day communication of a well-oiled team. Any such attempt at inter-departmental buck passing should be resisted vigorously as the write-only pollution that it is. That said, specialty tools like issue trackers and revision control can be extremely useful even for non-specialist workers. You just need to make sure each group has their own space to work in, and is taught how to use it well.</p>\n\n<p>Each person in a chain, even within a group, should act like an information optimizer, investigating and summarizing the matter at hand so the next ones don’t have to. Conversational style should be minimized, in favor of bullet points, diagrams and analysis. If you don't do this, you will end up with a company where everyone is constantly overloaded by communication, and yet very little gets resolved.</p>\n\n<h2 class=\"mt3\">Ping Me Twice, Shame On You</h2>\n\n<p>If you do need to get a bunch of people into a synchronous room, virtual or otherwise, there needs to be a clear agenda and goal ahead of time. There should be concrete takeaways at the end, in the form of notes or assigned tasks. Otherwise, you will have nothing to constrain the discussion, and then several people will have to decide for themselves what to do next with the resulting tangle of ideas. Sometimes you will just have the same meeting again a few weeks later, especially if not everyone attends both. Instead you should aim to differentiate between those who need to attend a meeting versus those who just need to hear the conclusion. Particularly naive is the notion that mere recordings or logs are a sufficient substitute for due diligence here, as it takes a special kind of stupid to think that someone would voluntarily subject themselves to an aimless meeting they can't even participate in, after the fact.</p>\n\n<p>This means optimizing for people-space, ensuring that the minimum amount of people are directly involved, as well as people-time, ensuring the least amount of manhours are spent. This also works on the long scale. If a question gets asked multiple times, it signifies a missed opportunity to capture past insight. It is essential to do this in a highly accessible place like a wiki, known and understood by all. It should be structured to match the immediate needs of those who need to read it. Dumping valuable information into chat is therefore an anti-pattern, requiring everyone to filter out the past nuggets of information based on the vague memory of them existing. A permanently updated record is a much better choice, and can serve as the central jumping off point to link to other, more ephemeral tools and resources. It should have every possible convenience for images, markup and app integration.</p>\n\n<p>Unfortunately, few people will take the initiative on a blank canvas. There are two important reasons for this. The first is simply the bystander effect. If someone doesn't fill it out with placeholder outlines, clear instructions and pre-made templates, expect very little to happen organically. Make a place for project bibles, practical operations, one-time event organizing, etc. Also make sure you have a standard tool for diagramming, and some stencils for everything you draw frequently. It's invaluable, a picture says a thousand words. Encourage white board and paper sketching too, and editing them into other notes.</p>\n\n<p>Second and more important is you need to get buy in on the intent and expected benefits. This is hard. The environment in some companies is so dysfunctional, some people have learned that meetings exist to waste time, and ticket queues exist to grow long and stale. They will pattern match sincere requests for participation to a request to waste their time. Or maybe they do appreciate those tools, but they've never been part of a development process where, by the time a ticket reaches a developer, the feature has been fully specced out and validated, and the bug is sufficiently analyzed and reproducible. To achieve this requires the design and QA team to have their own separate queues and tasks, as disciplined as the devs themselves.</p>\n\n<p>Participants need to internalize that they can actually save everyone time, a tide that lifts all boats. It also translates into such luxuries as actually being able to take 2 weeks off without having to check your email. Fear of stepping on toes can prevent contributions from being attempted at all, so you should encourage the notion that the best critique comes in the form of additional proposed edits. Often, bad attempts at collaboration lead to a vicious cycle, where the few initiators burn out while reluctant non-participants feel helpless, until it gets abandoned.</p>\n\n<p>In practice, swarm intelligence is a fickle thing. It can seem magical when things spontaneously come together, but often it's actually the result of some well spotted cow paths being paved, and a few helpful individuals picking up the slack to guide the group. You don't actually want an aimless mob, you want to have one or two captains per group, respected enough to resolve disputes and break ties. When done right, truly collaborative creation can be a wonderful thing, but most group dances require some choreography and practice. If your organization seems to magically run by itself regardless, consider you merely have no idea who's actually running it.</p>\n\n<h2 class=\"mt3\">Legibility on Sale</h2>\n\n<p>In addition to day-to-day legibility of the workplace, there is a big need for accumulated legibility too. With so much communication now needing to be explicit rather than implicit, you run the risk of becoming incomprehensible to anyone who wasn't there from the start. If this becomes the norm, an unbridgeable divide forms between the old and the new guard, and the former group will only shrink, not grow.</p>\n\n<p>A good antidote for this is to leverage the perspective of the newcomer. Any time someone new joins, they need to be onboarded, which means you are getting a free 3rd party audit of your processes. They will run into the stumbling blocks and pitfalls you step over without thinking. They will extract the information that nobody realizes only exists in everyone's heads. They will ask the obvious questions that haven't actually been written down yet, or even asked.</p>\n\n<p>They should be encouraged to document their own learning process and document answers obtained. This is a good way to make someone feel immediately valued, and the perfect way to teach them early the right habits of your information ecosystem. You get to see what you look like from the outside, so pay attention, and you will learn all your blind spots.</p>\n\n<p>Who are the staff and their roles and competences? How can I reach someone for this thing, and when are they available? What are our current ongoing projects and when are they due? What's our strategic timeline, and what's our budget? What's the process for vacations, or expenses? Remote work takes away a thousand tiny opportunities to learn all this by osmosis, and you need to actively compensate.</p>\n\n<p>The resulting need for transparency may seem daunting, particularly if you need to document financial and legal matters. It can feel like dropping your pants for all to see, opening the floodgates to envy and drama to boot. It's a mistake however to consider it superfluous, because that gate is always open, whether you want it or not. If left unaddressed, it will be found out through gossip regardless, only you won't hear about any accumulated resentment until it's likely too late to resolve amicably.</p>\n\n<p>It's also a red flag if someone doesn't want to document important discussions and negotiations. Like a boss who prefers to talk about performance or a raise entirely verbally and off-the-record, out of anyone else's earshot. Or a worker who can't account for their own hours or tasks, and pretends what they do is simply too complicated to explain. Such tight control of who hears what is never good, and means someone is positioning themselves to control information going up and down an organization entirely for their own benefit. However, as the cost of record keeping has been reduced to practically nothing, employees have a fair amount of power to push back. Everyone should be encouraged to ask for written terms for deals and promises, and keep their own copies of their history, including key negotiations and discussions. They should store this outside of accounts that can be locked out upon dismissal, or tampered with by a malicious inside actor.</p>\n\n<p>I leave you with a trope, the beast that is the Big Vision Meeting. Usually something has gone wrong which casts doubt on the company's future, or which puts management in a bad light, or both. Likely people are being \"let go\". Before this news can be delivered, the bosses must save face. So they give a 1-3 hour PowerPoint which projects the company into the future for a year or two, and lays out how successful they will be. Crucially absent will be the specifics of how they will get there, and instead you will get abstract playbooks, colorful diagrams and \"market research\" or \"financial analyses\" that don't have any real numbers in it.</p>\n\n<p>It's important to consider the perspective of the worker here: the minute the Big Meeting starts, they already know something is up, because it is always called without notice. Everything that is not critically urgent is immediately put on hold. So they have to sit through this possibly hours-long spiel, wondering the entire time how bad it actually is, while the bosses think they are elevating spirits, in a stunning failure of self-awareness. Finally they tell them, and then the meeting ends soon after, and the question they had the entire time was not answered: how are we going to get through the next 2 weeks, what's our plan here?</p>\n\n<p>The worst of the worst will do this by asking the non-fired employees to come in an hour late, so they can fire the unlucky ones by themselves, without having to own up in front of everyone at the same time why they had to let them go. Certain types abhor this lack of image control. You'll learn to spot them quickly enough. My real point though is what this Big Vision Meeting looks like when everyone's remote: they can just break the news individually, selling it as a personal touch, and don't even have to tell the same story to everyone all at once. Sometimes learning to deal with a fully remote environment means taking on the role of an investigator and archivist. Keep that in mind.</p>\n\n<p class=\"mt3\">The best way to capture the necessary mindset is that of <em>Minimum Viable Bureaucracy</em>: we need to make our tools and processes work for us, with a minimum amount of fuss for the maximum amount of benefit, without any illusions that the technology will simply do it for us. It can even save your bacon when the shit hits the fan.</p>\n\n<p>That means engaging in things many workers are often averse to, like creating meeting agendas, writing concise and comprehensive documentation, taking notes, making archives, and much more. But once people clue in that this actually saves time and effort in the long run, they'll wonder how they ever got things done without it.</p>\n\n<p>Or at least I do.</p>\n\n<p class=\"mt3\"><em>Edit: Apparently I'm not the first to come up with the term!</em></p>\n\n</div></div>\n",
    "url": "http://acko.net/blog/minimum-viable-bureaucracy/",
    "extracted_content_url": "https://extract.feedbin.com/parser/feedbin/50dcf7bdc335550a8d42f2d18ab32c21f5d19cd4?base64_url=aHR0cDovL2Fja28ubmV0L2Jsb2cvbWluaW11bS12aWFibGUtYnVyZWF1Y3JhY3kv",
    "published": "2019-09-01T22:00:00.000000Z",
    "created_at": "2019-09-02T20:30:21.864370Z"
  },
  {
    "id": 2202504986,
    "feed_id": 1289200,
    "title": "I Quit Social Media for a Year and Nothing Magical Happened",
    "author": "jcpsimmons",
    "summary": "Article URL: https://joshcsimmons.com/2019/09/10/i-quit-social-media-for-a-year-and-nothing-magical-happened/ Comments URL: https://news.ycombinator.com/item?id=20934675 Points: 139 #Comments: 100",
    "content": "\n<p>Article URL: <a href=\"https://joshcsimmons.com/2019/09/10/i-quit-social-media-for-a-year-and-nothing-magical-happened/\">https://joshcsimmons.com/2019/09/10/i-quit-social-media-for-a-year-and-nothing-magical-happened/</a></p>\n<p>Comments URL: <a href=\"https://news.ycombinator.com/item?id=20934675\">https://news.ycombinator.com/item?id=20934675</a></p>\n<p>Points: 139</p>\n<p># Comments: 100</p>\n",
    "url": "https://joshcsimmons.com/2019/09/10/i-quit-social-media-for-a-year-and-nothing-magical-happened/",
    "extracted_content_url": "https://extract.feedbin.com/parser/feedbin/62dc50516547ac1ad05bf8ab81f026867b7a1e4f?base64_url=aHR0cHM6Ly9qb3NoY3NpbW1vbnMuY29tLzIwMTkvMDkvMTAvaS1xdWl0LXNvY2lhbC1tZWRpYS1mb3ItYS15ZWFyLWFuZC1ub3RoaW5nLW1hZ2ljYWwtaGFwcGVuZWQv",
    "published": "2019-09-10T22:46:55.000000Z",
    "created_at": "2019-09-10T23:17:09.224108Z"
  },
  {
    "id": 2202859109,
    "feed_id": 981509,
    "title": "Formstatic — HTML form processing for static websites",
    "author": "Gilbert Pellegrom",
    "summary": "“Formstatic was a small side project idea I decided to build while on paternity leave. I'd love to hear any feedback people would be willing to share! Let me know what you think. Good idea? Bad idea? Would you use this for your static sites?” – Gilbert",
    "content": "      <p>\n        “\n        Formstatic was a small side project idea I decided to build while on paternity leave. I'd love to hear any feedback people would be willing to share! Let me know what you think. Good idea? Bad idea? Would you use this for your static sites?\n        ”\n        <br>\n        – Gilbert Pellegrom\n      </p>\n      <p>\n        <a href=\"https://www.producthunt.com/posts/formstatic?utm_campaign=producthunt-atom-posts-feed&amp;utm_medium=rss-feed&amp;utm_source=producthunt-atom-posts-feed\">Discussion</a>\n        |\n        <a href=\"https://www.producthunt.com/r/2103f317b86dbe/167543?app_id=339\">Link</a>\n      </p>\n",
    "url": "https://www.producthunt.com/posts/formstatic",
    "extracted_content_url": "https://extract.feedbin.com/parser/feedbin/7aa7ce0cfcac6ecc1928346def40b463b7faa448?base64_url=aHR0cHM6Ly93d3cucHJvZHVjdGh1bnQuY29tL3Bvc3RzL2Zvcm1zdGF0aWM=",
    "published": "2019-09-11T09:25:05.000000Z",
    "created_at": "2019-09-11T09:30:52.673898Z"
  }
]

const bookData = [
          {
            "id": "2960755988",
            "book": {
              "id": {
                "_type": "integer",
                "__text": "43263243"
              },
              "isbn": "1250165261",
              "isbn13": "9781250165268",
              "text_reviews_count": {
                "_type": "integer",
                "__text": "5"
              },
              "uri": "kca://book/amzn1.gr.book.v1.p_tgNTKdB5gOOfnC_pHKZw",
              "title": "Gamechanger",
              "title_without_series": "Gamechanger",
              "image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1556770272l/43263243._SX98_.jpg",
              "small_image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1556770272l/43263243._SY75_.jpg",
              "large_image_url": "",
              "link": "https://www.goodreads.com/book/show/43263243-gamechanger",
              "num_pages": "576",
              "format": "Hardcover",
              "edition_information": "",
              "publisher": "Tor Books",
              "publication_day": "17",
              "publication_year": "2019",
              "publication_month": "9",
              "average_rating": "4.14",
              "ratings_count": "7",
              "description": "<b><i>Neuromancer</i> meets <i>Star Trek</i> in <i>Gamechanger</i>, a fantastic new book from award-winning author L. X. Beckett.</b><br /><br />First there was the Setback. Then came the Clawback. Now humanity thrives.<br /><br />Rubi Whiting is a member of the Bounceback Generation. The first to be raised free of the troubles of the late twenty-first century. Now she works as a public defender to help troubled individuals with anti-social behavior. That’s how she met Luciano Pox.<br /><br />Luce is a firebrand and has made a name for himself as a naysayer. But there’s more to him than being a lightning rod for controversy. Rubi has to find out why the governments of the world want to bring Luce into custody, and why Luce is hell bent on stopping the recovery of the planet.",
              "authors": {
                "author": {
                  "id": "17991212",
                  "name": "L.X. Beckett",
                  "role": "",
                  "image_url": {
                    "_nophoto": "true",
                    "__cdata": "https://s.gr-assets.com/assets/nophoto/user/u_200x266-e183445fd1a1b5cc7075bb1cf7043306.png"
                  },
                  "small_image_url": {
                    "_nophoto": "true",
                    "__cdata": "https://s.gr-assets.com/assets/nophoto/user/u_50x66-632230dc9882b4352d753eedf9396530.png"
                  },
                  "link": "https://www.goodreads.com/author/show/17991212.L_X_Beckett",
                  "average_rating": "3.85",
                  "ratings_count": "80",
                  "text_reviews_count": "21"
                }
              },
              "published": "2019",
              "work": {
                "id": "67142091",
                "uri": "kca://work/amzn1.gr.work.v1.8bt4j0uiKiMbpYnPYFO2Cg"
              }
            },
            "rating": "0",
            "votes": "0",
            "spoiler_flag": "false",
            "spoilers_state": "none",
            "shelves": {
              "shelf": {
                "_exclusive": "true",
                "_id": "934932",
                "_name": "to-read",
                "_review_shelf_id": "2606956806",
                "_sortable": "true"
              }
            },
            "recommended_for": "",
            "recommended_by": "",
            "started_at": "",
            "read_at": "",
            "date_added": "Sun Sep 01 14:07:05 -0700 2019",
            "date_updated": "Sun Sep 01 14:07:05 -0700 2019",
            "read_count": "0",
            "body": "",
            "comments_count": "0",
            "url": "https://www.goodreads.com/review/show/2960755988",
            "link": "https://www.goodreads.com/review/show/2960755988",
            "owned": "0"
          },
          {
            "id": "2949897344",
            "book": {
              "id": {
                "_type": "integer",
                "__text": "25546167"
              },
              "isbn": "1632154269",
              "isbn13": "9781632154262",
              "text_reviews_count": {
                "_type": "integer",
                "__text": "1255"
              },
              "uri": "kca://book/amzn1.gr.book.v1.NmrbTJ_XIkvJvRCMzPiZ8w",
              "title": "Descender, Vol. 1: Tin Stars",
              "title_without_series": "Descender, Vol. 1: Tin Stars",
              "image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1435054237l/25546167._SX98_.jpg",
              "small_image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1435054237l/25546167._SY75_.jpg",
              "large_image_url": "",
              "link": "https://www.goodreads.com/book/show/25546167-descender-vol-1",
              "num_pages": "160",
              "format": "Paperback",
              "edition_information": "Trade",
              "publisher": "Image Comics",
              "publication_day": "24",
              "publication_year": "2015",
              "publication_month": "9",
              "average_rating": "4.08",
              "ratings_count": "13510",
              "description": "Young Robot boy TIM-21 and his companions struggle to stay alive in a universe where all androids have been outlawed and bounty hunters lurk on every planet. Written by award-winning creator, Jeff Lemire, Descender is a rip-roaring and heart-felt cosmic odyssey. Lemire pits humanity against machine, and world against world, to create a sprawling epic. Created by Jeff Lemire (<i>Sweet Tooth</i>, <i>Trillium</i>) and Dustin Nguyen's (<i>Little Gotham</i>) critically acclaimed, bestselling new science fiction series!<br /><br /><b>Collecting</b>: <i>Descender</i> 1-6",
              "authors": {
                "author": {
                  "id": "543719",
                  "name": "Jeff Lemire",
                  "role": "Writer",
                  "image_url": {
                    "_nophoto": "false",
                    "__cdata": "https://images.gr-assets.com/authors/1300396580p5/543719.jpg"
                  },
                  "small_image_url": {
                    "_nophoto": "false",
                    "__cdata": "https://images.gr-assets.com/authors/1300396580p2/543719.jpg"
                  },
                  "link": "https://www.goodreads.com/author/show/543719.Jeff_Lemire",
                  "average_rating": "3.98",
                  "ratings_count": "222768",
                  "text_reviews_count": "21827"
                }
              },
              "published": "2015",
              "work": {
                "id": "45338966",
                "uri": "kca://work/amzn1.gr.work.v1.goi2Zvnk0rRPaay7GFabxg"
              }
            },
            "rating": "0",
            "votes": "0",
            "spoiler_flag": "false",
            "spoilers_state": "none",
            "shelves": {
              "shelf": {
                "_exclusive": "true",
                "_id": "934932",
                "_name": "to-read",
                "_review_shelf_id": "2596009446",
                "_sortable": "true"
              }
            },
            "recommended_for": "",
            "recommended_by": "",
            "started_at": "",
            "read_at": "",
            "date_added": "Sat Aug 24 05:07:46 -0700 2019",
            "date_updated": "Sat Aug 24 05:07:47 -0700 2019",
            "read_count": "0",
            "body": "",
            "comments_count": "0",
            "url": "https://www.goodreads.com/review/show/2949897344",
            "link": "https://www.goodreads.com/review/show/2949897344",
            "owned": "0"
          },
          {
            "id": "2946601414",
            "book": {
              "id": {
                "_type": "integer",
                "__text": "31189192"
              },
              "isbn": {
                "_nil": "true"
              },
              "isbn13": {
                "_nil": "true"
              },
              "text_reviews_count": {
                "_type": "integer",
                "__text": "117"
              },
              "uri": "kca://book/amzn1.gr.book.v1.I9f-v1CYyutwYRenx8GnRA",
              "title": "Null States (The Centenal Cycle, #2)",
              "title_without_series": "Null States",
              "image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1484154863l/31189192._SX98_.jpg",
              "small_image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1484154863l/31189192._SY75_.jpg",
              "large_image_url": "",
              "link": "https://www.goodreads.com/book/show/31189192-null-states",
              "num_pages": "432",
              "format": "ebook",
              "edition_information": "",
              "publisher": "Tor.com",
              "publication_day": "19",
              "publication_year": "2017",
              "publication_month": "9",
              "average_rating": "3.87",
              "ratings_count": "995",
              "description": "The future of democracy is about to implode.<br /><br />After the last controversial global election, the global infomocracy that has ensured thirty years of world peace is fraying at the edges. As the new Supermajority government struggles to establish its legitimacy, agents of Information across the globe strive to keep the peace and maintain the flows of data that feed the new world order.<br /><br />In the newly-incorporated DarFur, a governor dies in a fiery explosion. In Geneva, a superpower hatches plans to bring microdemocracy to its knees. In Central Asia, a sprawling war among archaic states threatens to explode into a global crisis. And across the world, a shadowy plot is growing, threatening to strangle Information with the reins of power.<br /><br />\"",
              "authors": {
                "author": {
                  "id": "14220734",
                  "name": "Malka Ann Older",
                  "role": "",
                  "image_url": {
                    "_nophoto": "false",
                    "__cdata": "https://images.gr-assets.com/authors/1446698915p5/14220734.jpg"
                  },
                  "small_image_url": {
                    "_nophoto": "false",
                    "__cdata": "https://images.gr-assets.com/authors/1446698915p2/14220734.jpg"
                  },
                  "link": "https://www.goodreads.com/author/show/14220734.Malka_Ann_Older",
                  "average_rating": "3.70",
                  "ratings_count": "7258",
                  "text_reviews_count": "1388"
                }
              },
              "published": "2017",
              "work": {
                "id": "51832886",
                "uri": "kca://work/amzn1.gr.work.v1.lbDPuVfiFSWdlEyjwVkzOw"
              }
            },
            "rating": "0",
            "votes": "0",
            "spoiler_flag": "false",
            "spoilers_state": "none",
            "shelves": {
              "shelf": {
                "_exclusive": "true",
                "_id": "934932",
                "_name": "to-read",
                "_review_shelf_id": "2592772850",
                "_sortable": "true"
              }
            },
            "recommended_for": "",
            "recommended_by": "",
            "started_at": "",
            "read_at": "",
            "date_added": "Wed Aug 21 12:18:19 -0700 2019",
            "date_updated": "Wed Aug 21 12:18:19 -0700 2019",
            "read_count": "0",
            "body": "",
            "comments_count": "0",
            "url": "https://www.goodreads.com/review/show/2946601414",
            "link": "https://www.goodreads.com/review/show/2946601414",
            "owned": "0"
          },
          {
            "id": "2928652606",
            "book": {
              "id": {
                "_type": "integer",
                "__text": "28153844"
              },
              "isbn": "1782392394",
              "isbn13": "9781782392392",
              "text_reviews_count": {
                "_type": "integer",
                "__text": "65"
              },
              "uri": "kca://book/amzn1.gr.book.v1.G6Yq32lMiYEnFKHjaadinA",
              "title": "Daughter of Eden (Dark Eden, #3)",
              "title_without_series": "Daughter of Eden",
              "image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1449672020l/28153844._SX98_.jpg",
              "small_image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1449672020l/28153844._SY75_.jpg",
              "large_image_url": "",
              "link": "https://www.goodreads.com/book/show/28153844-daughter-of-eden",
              "num_pages": "400",
              "format": "Hardcover",
              "edition_information": "",
              "publisher": "Corvus",
              "publication_day": "6",
              "publication_year": "2016",
              "publication_month": "10",
              "average_rating": "3.99",
              "ratings_count": "775",
              "description": "Angie Redlantern is the first to spot the boats - five abreast with men in metal masks and spears standing proud, ready for the fight to come. As the people of New Earth declare war on the people of Mainground, a dangerous era has dawned for Eden. After generations of division and disagreement, the two populations of Eden have finally broken their tentative peace, giving way to bloodshed and slaughter. Angie must flee with her family across the pitch black of Snowy Dark to the place where it all started, the stone circle where the people from Earth first landed, where the story of Gela - the mother of them all - began.<br /><br />It is there that Angie witnesses the most extraordinary event, one that will change the history of Eden forever. It will alter their future and re-shape their past. It is both a beginning and an ending.<br /><br />It is the true story of Eden.",
              "authors": {
                "author": {
                  "id": "541994",
                  "name": "Chris Beckett",
                  "role": "",
                  "image_url": {
                    "_nophoto": "false",
                    "__cdata": "https://images.gr-assets.com/authors/1364887263p5/541994.jpg"
                  },
                  "small_image_url": {
                    "_nophoto": "false",
                    "__cdata": "https://images.gr-assets.com/authors/1364887263p2/541994.jpg"
                  },
                  "link": "https://www.goodreads.com/author/show/541994.Chris_Beckett",
                  "average_rating": "3.79",
                  "ratings_count": "13307",
                  "text_reviews_count": "1737"
                }
              },
              "published": "2016",
              "work": {
                "id": "48167452",
                "uri": "kca://work/amzn1.gr.work.v1.z-CHPoOD-bHG4txTQRKTfA"
              }
            },
            "rating": "0",
            "votes": "0",
            "spoiler_flag": "false",
            "spoilers_state": "none",
            "shelves": {
              "shelf": {
                "_exclusive": "true",
                "_id": "934932",
                "_name": "to-read",
                "_review_shelf_id": "2574934900",
                "_sortable": "true"
              }
            },
            "recommended_for": "",
            "recommended_by": "",
            "started_at": "",
            "read_at": "",
            "date_added": "Wed Aug 07 19:31:48 -0700 2019",
            "date_updated": "Wed Aug 07 19:31:49 -0700 2019",
            "read_count": "0",
            "body": "",
            "comments_count": "0",
            "url": "https://www.goodreads.com/review/show/2928652606",
            "link": "https://www.goodreads.com/review/show/2928652606",
            "owned": "0"
          },
          {
            "id": "2926402244",
            "book": {
              "id": {
                "_type": "integer",
                "__text": "40524312"
              },
              "isbn": "0735220174",
              "isbn13": "9780735220171",
              "text_reviews_count": {
                "_type": "integer",
                "__text": "1932"
              },
              "uri": "kca://book/amzn1.gr.book.v1.mtSGsd_Fr77JGlzCUjDT-w",
              "title": "Black Leopard, Red Wolf (The Dark Star Trilogy, #1)",
              "title_without_series": "Black Leopard, Red Wolf",
              "image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1538656386l/40524312._SX98_.jpg",
              "small_image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1538656386l/40524312._SY75_.jpg",
              "large_image_url": "",
              "link": "https://www.goodreads.com/book/show/40524312-black-leopard-red-wolf",
              "num_pages": "620",
              "format": "Hardcover",
              "edition_information": "",
              "publisher": "Riverhead Books",
              "publication_day": "5",
              "publication_year": "2019",
              "publication_month": "2",
              "average_rating": "3.51",
              "ratings_count": "8323",
              "description": "In the first novel in Marlon James's Dark Star trilogy, myth, fantasy, and history come together to explore what happens when a mercenary is hired to find a missing child. <br /><br />Tracker is known far and wide for his skills as a hunter: \"He has a nose,\" people say. Engaged to track down a mysterious boy who disappeared three years earlier, Tracker breaks his own rule of always working alone when he finds himself part of a group that comes together to search for the boy. The band is a hodgepodge, full of unusual characters with secrets of their own, including a shape-shifting man-animal known as Leopard.<br /><br />Drawing from African history and mythology and his own rich imagination, Marlon James has written an adventure that's also an ambitious, involving read. Defying categorization and full of unforgettable characters, Black Leopard, Red Wolf explores the fundamentals of truths, the limits of power, the excesses of ambition, and our need to understand them all.",
              "authors": {
                "author": {
                  "id": "56064",
                  "name": "Marlon James",
                  "role": "",
                  "image_url": {
                    "_nophoto": "false",
                    "__cdata": "https://images.gr-assets.com/authors/1546528568p5/56064.jpg"
                  },
                  "small_image_url": {
                    "_nophoto": "false",
                    "__cdata": "https://images.gr-assets.com/authors/1546528568p2/56064.jpg"
                  },
                  "link": "https://www.goodreads.com/author/show/56064.Marlon_James",
                  "average_rating": "3.89",
                  "ratings_count": "42163",
                  "text_reviews_count": "7337"
                }
              },
              "published": "2019",
              "work": {
                "id": "48215793",
                "uri": "kca://work/amzn1.gr.work.v1.tJJjadZdAgEAonlAkeyG1Q"
              }
            },
            "rating": "0",
            "votes": "0",
            "spoiler_flag": "false",
            "spoilers_state": "none",
            "shelves": {
              "shelf": {
                "_exclusive": "true",
                "_id": "934932",
                "_name": "to-read",
                "_review_shelf_id": "2572694160",
                "_sortable": "true"
              }
            },
            "recommended_for": "",
            "recommended_by": "",
            "started_at": "",
            "read_at": "",
            "date_added": "Tue Aug 06 06:48:35 -0700 2019",
            "date_updated": "Tue Aug 06 06:48:36 -0700 2019",
            "read_count": "0",
            "body": "",
            "comments_count": "0",
            "url": "https://www.goodreads.com/review/show/2926402244",
            "link": "https://www.goodreads.com/review/show/2926402244",
            "owned": "0"
          },
          {
            "id": "2926401414",
            "book": {
              "id": {
                "_type": "integer",
                "__text": "42036965"
              },
              "isbn": "1542042836",
              "isbn13": "9781542042833",
              "text_reviews_count": {
                "_type": "integer",
                "__text": "31"
              },
              "uri": "kca://book/amzn1.gr.book.v1.-cwfqvbWT2n76bJSxnTUbg",
              "title": "One Word Kill (Impossible Times, #1)",
              "title_without_series": "One Word Kill",
              "image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1543429629l/42036965._SX98_.jpg",
              "small_image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1543429629l/42036965._SX50_.jpg",
              "large_image_url": "",
              "link": "https://www.goodreads.com/book/show/42036965-one-word-kill",
              "num_pages": "204",
              "format": "Hardcover",
              "edition_information": "",
              "publisher": "47North",
              "publication_day": "1",
              "publication_year": "2019",
              "publication_month": "5",
              "average_rating": "3.79",
              "ratings_count": "9551",
              "description": "<b><i>Ready Player One</i> meets <i>Stranger Things</i> in this new novel by the bestselling author who George RR Martin describes as “an excellent writer.”</b><br /><br />In January 1986, fifteen-year-old boy-genius Nick Hayes discovers he’s dying. And it isn’t even the strangest thing to happen to him that week.<br /><br />Nick and his Dungeons &amp; Dragons-playing friends are used to living in their imaginations. But when a new girl, Mia, joins the group and reality becomes weirder than the fantasy world they visit in their weekly games, none of them are prepared for what comes next. A strange—yet curiously familiar—man is following Nick, with abilities that just shouldn’t exist. And this man bears a cryptic message: Mia’s in grave danger, though she doesn’t know it yet. She needs Nick’s help—now.<br /><br />He finds himself in a race against time to unravel an impossible mystery and save the girl. And all that stands in his way is a probably terminal disease, a knife-wielding maniac and the laws of physics.<br /><br />Challenge accepted.",
              "authors": {
                "author": {
                  "id": "4721536",
                  "name": "Mark  Lawrence",
                  "role": "",
                  "image_url": {
                    "_nophoto": "false",
                    "__cdata": "https://images.gr-assets.com/authors/1318781585p5/4721536.jpg"
                  },
                  "small_image_url": {
                    "_nophoto": "false",
                    "__cdata": "https://images.gr-assets.com/authors/1318781585p2/4721536.jpg"
                  },
                  "link": "https://www.goodreads.com/author/show/4721536.Mark_Lawrence",
                  "average_rating": "4.12",
                  "ratings_count": "301225",
                  "text_reviews_count": "23441"
                }
              },
              "published": "2019",
              "work": {
                "id": "61521749",
                "uri": "kca://work/amzn1.gr.work.v1.1wDqpeq6fNDABMpXAL74LA"
              }
            },
            "rating": "0",
            "votes": "0",
            "spoiler_flag": "false",
            "spoilers_state": "none",
            "shelves": {
              "shelf": {
                "_exclusive": "true",
                "_id": "934932",
                "_name": "to-read",
                "_review_shelf_id": "2572693307",
                "_sortable": "true"
              }
            },
            "recommended_for": "",
            "recommended_by": "",
            "started_at": "",
            "read_at": "",
            "date_added": "Tue Aug 06 06:47:52 -0700 2019",
            "date_updated": "Tue Aug 06 06:47:53 -0700 2019",
            "read_count": "0",
            "body": "",
            "comments_count": "0",
            "url": "https://www.goodreads.com/review/show/2926401414",
            "link": "https://www.goodreads.com/review/show/2926401414",
            "owned": "0"
          },
          {
            "id": "2926397962",
            "book": {
              "id": {
                "_type": "integer",
                "__text": "37562956"
              },
              "isbn": {
                "_nil": "true"
              },
              "isbn13": {
                "_nil": "true"
              },
              "text_reviews_count": {
                "_type": "integer",
                "__text": "126"
              },
              "uri": "kca://book/amzn1.gr.book.v1.JswOY1V3_HP0RzB9_rr7hg",
              "title": "Dark Age (Red Rising Saga #5)",
              "title_without_series": "Dark Age",
              "image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1525464466l/37562956._SX98_.jpg",
              "small_image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1525464466l/37562956._SY75_.jpg",
              "large_image_url": "",
              "link": "https://www.goodreads.com/book/show/37562956-dark-age",
              "num_pages": "784",
              "format": "",
              "edition_information": "",
              "publisher": "",
              "publication_day": "30",
              "publication_year": "2019",
              "publication_month": "7",
              "average_rating": "4.53",
              "ratings_count": "6237",
              "description": "<b>The #1 <i>New York Times</i> bestselling author of <i>Morning Star</i> returns to the Red Rising universe with the thrilling sequel to <i>Iron Gold</i>.</b><br /><br />For a decade Darrow led a revolution against the corrupt color-coded Society. Now, outlawed by the very Republic he founded, he wages a rogue war on Mercury in hopes that he can still salvage the dream of Eo. But as he leaves death and destruction in his wake, is he still the hero who broke the chains? Or will another legend rise to take his place?<br /><br />Lysander au Lune, the heir in exile, has returned to the Core. Determined to bring peace back to mankind at the edge of his sword, he must overcome or unite the treacherous Gold families of the Core and face down Darrow over the skies of war-torn Mercury. <br /><br />But theirs are not the only fates hanging in the balance.<br /><br />On Luna, Mustang, Sovereign of the Republic, campaigns to unite the Republic behind her husband. Beset by political and criminal enemies, can she outwit her opponents in time to save him? <br /><br />Once a Red refugee, young Lyria now stands accused of treason, and her only hope is a desperate escape with unlikely new allies.<br /><br />Abducted by a new threat to the Republic, Pax and Electra, the children of Darrow and Sevro, must trust in Ephraim, a thief, for their salvation—and Ephraim must look to them for his chance at redemption.<br /><br />As alliances shift, break, and re-form—and power is seized, lost, and reclaimed—every player is at risk in a game of conquest that could turn the Rising into a new Dark Age.",
              "authors": {
                "author": {
                  "id": "6474348",
                  "name": "Pierce Brown",
                  "role": "",
                  "image_url": {
                    "_nophoto": "false",
                    "__cdata": "https://images.gr-assets.com/authors/1417558860p5/6474348.jpg"
                  },
                  "small_image_url": {
                    "_nophoto": "false",
                    "__cdata": "https://images.gr-assets.com/authors/1417558860p2/6474348.jpg"
                  },
                  "link": "https://www.goodreads.com/author/show/6474348.Pierce_Brown",
                  "average_rating": "4.36",
                  "ratings_count": "477799",
                  "text_reviews_count": "47834"
                }
              },
              "published": "2019",
              "work": {
                "id": "49464237",
                "uri": "kca://work/amzn1.gr.work.v1.EPUUWtRWjpsIYJFmvn6Q5Q"
              }
            },
            "rating": "4",
            "votes": "0",
            "spoiler_flag": "false",
            "spoilers_state": "none",
            "shelves": {
              "shelf": {
                "_name": "read",
                "_exclusive": "true",
                "_id": "5959171",
                "_review_shelf_id": ""
              }
            },
            "recommended_for": "",
            "recommended_by": "",
            "started_at": "Sun Aug 11 14:30:22 -0700 2019",
            "read_at": "Tue Sep 17 13:26:20 -0700 2019",
            "date_added": "Tue Aug 06 06:44:56 -0700 2019",
            "date_updated": "Tue Sep 17 13:26:20 -0700 2019",
            "read_count": "1",
            "body": "",
            "comments_count": "0",
            "url": "https://www.goodreads.com/review/show/2926397962",
            "link": "https://www.goodreads.com/review/show/2926397962",
            "owned": "0"
          },
          {
            "id": "2922302160",
            "book": {
              "id": {
                "_type": "integer",
                "__text": "25385429"
              },
              "isbn": {
                "_nil": "true"
              },
              "isbn13": {
                "_nil": "true"
              },
              "text_reviews_count": {
                "_type": "integer",
                "__text": "3"
              },
              "uri": "kca://book/amzn1.gr.book.v1.NDZM1UlOAupdw_kSuMQL1w",
              "title": "Mother of Eden (Dark Eden, #2)",
              "title_without_series": "Mother of Eden",
              "image_url": "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png",
              "small_image_url": "https://s.gr-assets.com/assets/nophoto/book/50x75-a91bf249278a81aabab721ef782c4a74.png",
              "large_image_url": "",
              "link": "https://www.goodreads.com/book/show/25385429-mother-of-eden",
              "num_pages": "",
              "format": "",
              "edition_information": "",
              "publisher": "",
              "publication_day": "",
              "publication_year": "",
              "publication_month": "",
              "average_rating": "3.79",
              "ratings_count": "1580",
              "description": "We speak of a mother's love, but we forget her power. Power over life. Power to give and to withhold.'<br />Generations after the breakup of the human family of Eden, the Johnfolk emphasise knowledge and innovation, the Davidfolk tradition and cohesion. But both have built hierarchical societies sustained by violence and dominated by men - and both claim to be the favoured children of a long-dead woman from Earth that all Eden knows as Gela, the mother of them all.<br />When Starlight Brooking meets a handsome and powerful man from across Worldpool, she believes he will offer an outlet for her ambition and energy. But she has no idea that she will be a stand-in for Gela herself, and wear Gela's ring on her own finger.<br />And she has no idea of the enemies she will make, no inkling that a time will come when she, like John Redlantern, will choose to kill...",
              "authors": {
                "author": {
                  "id": "541994",
                  "name": "Chris Beckett",
                  "role": "",
                  "image_url": {
                    "_nophoto": "false",
                    "__cdata": "https://images.gr-assets.com/authors/1364887263p5/541994.jpg"
                  },
                  "small_image_url": {
                    "_nophoto": "false",
                    "__cdata": "https://images.gr-assets.com/authors/1364887263p2/541994.jpg"
                  },
                  "link": "https://www.goodreads.com/author/show/541994.Chris_Beckett",
                  "average_rating": "3.79",
                  "ratings_count": "13307",
                  "text_reviews_count": "1737"
                }
              },
              "published": "",
              "work": {
                "id": "40752165",
                "uri": "kca://work/amzn1.gr.work.v1.BscvIWJPZhXkmasA_PNSfQ"
              }
            },
            "rating": "4",
            "votes": "0",
            "spoiler_flag": "false",
            "spoilers_state": "none",
            "shelves": {
              "shelf": {
                "_name": "read",
                "_exclusive": "true",
                "_id": "5959171",
                "_review_shelf_id": ""
              }
            },
            "recommended_for": "",
            "recommended_by": "",
            "started_at": "Sat Aug 03 05:18:29 -0700 2019",
            "read_at": "Sun Aug 11 08:38:26 -0700 2019",
            "date_added": "Sat Aug 03 05:18:29 -0700 2019",
            "date_updated": "Sun Aug 11 08:38:26 -0700 2019",
            "read_count": "1",
            "body": "",
            "comments_count": "0",
            "url": "https://www.goodreads.com/review/show/2922302160",
            "link": "https://www.goodreads.com/review/show/2922302160",
            "owned": "0"
          },
          {
            "id": "2905470670",
            "book": {
              "id": {
                "_type": "integer",
                "__text": "36229297"
              },
              "isbn": "0765391473",
              "isbn13": "9780765391476",
              "text_reviews_count": {
                "_type": "integer",
                "__text": "85"
              },
              "uri": "kca://book/amzn1.gr.book.v1.y6KGZmZCXU56RZ5pim4z-g",
              "title": "Moon Rising (Luna #3)",
              "title_without_series": "Moon Rising",
              "image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1507051387l/36229297._SX98_.jpg",
              "small_image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1507051387l/36229297._SY75_.jpg",
              "large_image_url": "",
              "link": "https://www.goodreads.com/book/show/36229297-moon-rising",
              "num_pages": "437",
              "format": "Hardcover",
              "edition_information": "",
              "publisher": "Tor Books",
              "publication_day": "19",
              "publication_year": "2019",
              "publication_month": "3",
              "average_rating": "4.04",
              "ratings_count": "794",
              "description": "The continuing saga of the Moon's Five Dragons, already under option from CBS, a fast-paced, intricately plotted space opera pitched as <i>Game of Thrones</i> meets <i>The Expanse</i><br /><br />A hundred years in the future, a war wages between the Five Dragons—five families that control the Moon’s leading industrial companies. Each clan does everything in their power to claw their way to the top of the food chain—marriages of convenience, corporate espionage, kidnapping, and mass assassinations. <br /><br />Through ingenious political manipulation and sheer force of will, Lucas Cortas rises from the ashes of corporate defeat and seizes control of the Moon. The only person who can stop him is a brilliant lunar lawyer, his sister, Ariel.<br /><br />Witness the Dragons' final battle for absolute sovereignty in Ian McDonald's heart-stopping finale to the Luna trilogy.",
              "authors": {
                "author": {
                  "id": "25376",
                  "name": "Ian McDonald",
                  "role": "",
                  "image_url": {
                    "_nophoto": "false",
                    "__cdata": "https://images.gr-assets.com/authors/1372533252p5/25376.jpg"
                  },
                  "small_image_url": {
                    "_nophoto": "false",
                    "__cdata": "https://images.gr-assets.com/authors/1372533252p2/25376.jpg"
                  },
                  "link": "https://www.goodreads.com/author/show/25376.Ian_McDonald",
                  "average_rating": "3.83",
                  "ratings_count": "44964",
                  "text_reviews_count": "5606"
                }
              },
              "published": "2019",
              "work": {
                "id": "57869094",
                "uri": "kca://work/amzn1.gr.work.v1.dmdufJNNacmSJaCBT8sbZA"
              }
            },
            "rating": "0",
            "votes": "0",
            "spoiler_flag": "false",
            "spoilers_state": "none",
            "shelves": {
              "shelf": {
                "_exclusive": "true",
                "_id": "934932",
                "_name": "to-read",
                "_review_shelf_id": "2551865105",
                "_sortable": "true"
              }
            },
            "recommended_for": "",
            "recommended_by": "",
            "started_at": "",
            "read_at": "",
            "date_added": "Sun Jul 21 14:31:10 -0700 2019",
            "date_updated": "Sun Jul 21 14:31:10 -0700 2019",
            "read_count": "0",
            "body": "",
            "comments_count": "0",
            "url": "https://www.goodreads.com/review/show/2905470670",
            "link": "https://www.goodreads.com/review/show/2905470670",
            "owned": "0"
          }
        ]

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
            title='k-projects'
            nodes={projectNodes}
            browseMoreHref='/archive/'
          />
        )}
        {starData && (
          <StarPreviewGrid
            title='starfeed'
            nodes={starData}
            browseMoreHref='/allstars/'
          />
        )}
        {bookData && (
          <BookPreviewGrid
            title='bookfeed'
            nodes={bookData}
            browseMoreHref='/allstars/'
          />
        )}
        <h2>musicgram</h2>
        <div className="elfsight-app-aa9b91b7-7757-4793-aae3-67df059446a2"></div>

    </Layout>
  )
}

export default IndexPage
