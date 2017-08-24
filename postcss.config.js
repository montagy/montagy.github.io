var cssnext = require('postcss-cssnext');
module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-property-lookup'),
    cssnext(),
  ],
};
