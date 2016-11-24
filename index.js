var fs = require('fs');
var componentRegex = /([^\W]+)[\\\/]semantic-ui-react[\\\/]src[\\\/](elements|collections|modules|views)[\\\/]([a-zA-Z0-9-]+)[\\\/]index.jsx?$/;

function getStyleMode(query)
{
  return (styleModes.indexOf(query) === -1) ? defaultStyleMode : query;
}

function getStylePath(definition, component, styleMode)
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

  var matches = this.resourcePath.match(componentRegex);
  var fsPath;
  var path;
  var styleMode;

  if (matches && matches.length === 4)
  {
    fsPath = matches[1].replace('\\', '/');
    styleMode = getStyleMode(this.resourceQuery);
    path = getStylePath(matches[2], matches[3], styleMode);

    if (fs.existsSync(fsPath + '/' + path))
    {
      source = getStyleImport(path) + source;
    }
  }

  this.callback(null, source, map);
};