const { override, addWebpackPlugin } = require('customize-cra')
const WebpackAssetsManifest = require('webpack-assets-manifest')

module.exports = override(
  addWebpackPlugin(
    new WebpackAssetsManifest({
      output: 'asset-manifest.json',
      publicPath: '/',
      entrypoints: true,
      transform(assets) {
        return Object.values(assets).reduce((result, asset) => {
          const { name, path } = asset
          return {
            ...result,
            [name]: `${path}?v=${Date.now().toString(36)}`
          }
        }, {})
      }
    })
  )
)
