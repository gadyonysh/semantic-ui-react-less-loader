# semantic-ui-react-less-loader

Webpack loader for semantic-ui-react: add styles from semantic-ui-less to semantic-ui-react components
Can be used with [semantic-ui-less-module-loader](https://github.com/gadyonysh/semantic-ui-less-module-loader).

## Usage

### Installation

```js
npm install semantic-ui-react semantic-ui-less --save-dev
npm install semantic-ui-react-less-loader --dev
```

### Configuration

Add loader for semantic-ui-react components in your webpack config:

```js
module: {
  loaders: [
    {
      test: /\.jsx?$/,
      loader: 'babel!semantic-ui-react-less-loader',
      include: [/node_modules[\/\\]semantic-ui-react/]
    }
],
```

### Use semantic-ui-react components in your code like this

```js
import React from 'react';
import { render as renderDom } from 'react-dom';
import Button from 'semantic-ui-react/src/elements/Button';

const container = document.createElement('div');

document.body.appendChild(container);

renderDom(
  <Button>Click me</Button>,
  container
);
```