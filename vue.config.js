const BASE_URL = process.env.NODE_ENV === 'production' ? '/easy-clipboard/' : '/'

module.exports = {
  publicPath: BASE_URL,
  productionSourceMap: false,
  outputDir: 'docs',
}
