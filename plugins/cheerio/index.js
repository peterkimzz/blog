import cheerio from 'cheerio'

export default (_, inject) => {
  inject('cheerio', cheerio)
}
