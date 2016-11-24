module.exports = function(source, map)
{
  this.cacheable();

  source = '/* semantic-ui-react-loader */' + source;

  this.callback(null, source, map);
};