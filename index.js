var fs = require('fs');
var componentPathRegex = /([^\W]+)[\\\/]semantic-ui-react[\\\/]src[\\\/](elements|collections|modules|views)[\\\/]([a-zA-Z0-9-]+)[\\\/]index.jsx?$/;

function getStylePath(definition, component)
{
  return 'semantic-ui-less/definitions/' + definition + '/' + component.toLowerCase() + '.less';
}

function getStyleImport(path)
{
  return 'import \'' + path + '\';';
}

module.exports = function(source, map)
{
  this.cacheable();

  var matches = this.resourcePath.match(componentPathRegex);
  var fsPath;
  var path;

  if (matches && matches.length === 4)
  {
    fsPath = matches[1].replace('\\', '/');
    path = getStylePath(matches[2], matches[3]);

    if (fs.existsSync(fsPath + '/' + path))
    {
      source = getStyleImport(path) + source;
    }
  }

  this.callback(null, source, map);
};