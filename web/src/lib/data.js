import axios from 'axios'
import convert from 'xml-js'

const getBookData = (page = 1) => {
  console.log('getbooksjson')
  axios.get('https://services.kpow.com/books.php?perPage=9&page=' + page)
    .then((response) => {
      const json = JSON.parse(convert.xml2json(response.data, { compact: true, spaces: 4 }))
      const bookData = json.GoodreadsResponse.reviews.review
      return bookData
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => { })
}

export default getBookData
