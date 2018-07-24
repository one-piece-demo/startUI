/**
 * some config
 */
var apiBaseUrl = '/';

if(process.env.NODE_ENV == 'development') {
  apiBaseUrl = '/api/';
}

module.exports = {
  apiBaseUrl
};