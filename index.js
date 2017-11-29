var fs = require('fs');
var path = require('path');

var semanticUiLessRoot = path.dirname(
  require.resolve('semantic-ui-less/package.json')
);
var semanticUiReactComponentPathRegex = /[\\\/]node_modules[\\\/]semantic-ui-react[\\\/](src|dist[\\\/](?:es|commonjs))[\\\/](elements|collections|modules|views)[\\\/]([a-zA-Z0-9_-]+)[\\\/](?:[a-zA-Z0-9_-]+).jsx?$/;
var semanticUiReactDistPathEs6Regex = /src|dist[\\\/]es/;

function getSemanticUiLessComponentPath(definition, component)
{
  return 'definitions/' + definition + '/' + component.toLowerCase() + '.less';
}

function getSemanticUiLessComponentImport(semanticUiLessComponentPath)
{
  return 'import \'semantic-ui-less/' + semanticUiLessComponentPath + '\';';
}

function getSemanticUiLessComponentRequire(semanticUiLessComponentPath)
{
  return 'require (\'semantic-ui-less/' + semanticUiLessComponentPath + '\');';
}

module.exports = function(source, map)
{
  if (this.cacheable)
  {
    this.cacheable();
  }

  var componentPathDetails = this.resourcePath.match(semanticUiReactComponentPathRegex);

  var definition;
  var component;
  var semanticUiLessComponentFullPath;
  var semanticUiLessComponentPath;

  if (componentPathDetails && componentPathDetails.length === 4)
  {
    dist = componentPathDetails[1];
    definition = componentPathDetails[2];
    component = componentPathDetails[3];
    semanticUiLessComponentPath = getSemanticUiLessComponentPath(definition, component);
    semanticUiLessComponentFullPath = path.resolve(semanticUiLessRoot, semanticUiLessComponentPath);

    if (fs.existsSync(semanticUiLessComponentFullPath))
    {
      if (dist.match(semanticUiReactDistPathEs6Regex)) {
        source = getSemanticUiLessComponentImport(semanticUiLessComponentPath) + source;
      } else {
        source = getSemanticUiLessComponentRequire(semanticUiLessComponentPath) + source;
      }
    }
  }

  this.callback(null, source, map);
};
