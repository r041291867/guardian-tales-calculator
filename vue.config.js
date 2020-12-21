module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
      args[0].title = "Guardian Tales Calculator";
      return args;
    })
  },
  publicPath: process.env.NODE_ENV === 'production'
  ? '/guardian-tales-calculator/'
  : '/',
}