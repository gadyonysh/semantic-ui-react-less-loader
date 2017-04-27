var fs = require('fs');
var path = require('path');

var semanticUiLessRoot = path.dirname(
  require.resolve('semantic-ui-less/package.json')
);
var semanticUiReactComponentPathRegex = /[\\\/]node_modules[\\\/]semantic-ui-react[\\\/]src[\\\/](elements|collections|modules|views)[\\\/]([a-zA-Z0-9_-]+)[\\\/]index.jsx?$/;

function getSemanticUiLessComponentPath(definition, component)
{
  return 'definitions/' + definition + '/' + component.toLowerCase() + '.less';
}

function getSemanticUiLessComponentImport(semanticUiLessComponentPath)
{
  return 'import \'semantic-ui-less/' + semanticUiLessComponentPath + '\';';
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

  if (componentPathDetails && componentPathDetails.length === 3)
  {
    definition = componentPathDetails[1];
    component = componentPathDetails[2];
    semanticUiLessComponentPath = getSemanticUiLessComponentPath(definition, component);
    semanticUiLessComponentFullPath = path.resolve(semanticUiLessRoot, semanticUiLessComponentPath);

    if (fs.existsSync(semanticUiLessComponentFullPath))
    {
      source = getSemanticUiLessComponentImport(semanticUiLessComponentPath) + source;
    }
  }

  this.callback(null, source, map);
};
