/* 
 * modified from `assets-webpack-plugin` source
 * see https://github.com/kossnocorp/assets-webpack-plugin
 * 
 */

var URL = require('url');
var path = require('path');

module.exports = function getFileExtension(asset) {
  var url = URL.parse(asset);
  var ext = path.extname(url.pathname);
  return ext ? ext.slice(1) : '';
};
