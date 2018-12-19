[![npm version](https://badgen.net/npm/v/@vaadin/vaadin-select)](https://www.npmjs.com/package/@vaadin/vaadin-select)
[![Bower version](https://badgen.net/github/release/vaadin/vaadin-select)](https://github.com/vaadin/vaadin-select/releases)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/vaadin/vaadin-select)
[![Build Status](https://travis-ci.org/vaadin/vaadin-select.svg?branch=master)](https://travis-ci.org/vaadin/vaadin-select)
[![Coverage Status](https://coveralls.io/repos/github/vaadin/vaadin-select/badge.svg?branch=master)](https://coveralls.io/github/vaadin/vaadin-select?branch=master)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/vaadin/web-components?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

[![Published on Vaadin  Directory](https://img.shields.io/badge/Vaadin%20Directory-published-00b4f0.svg)](https://vaadin.com/directory/component/vaadinvaadin-select)
[![Stars on vaadin.com/directory](https://img.shields.io/vaadin-directory/star/vaadinvaadin-select.svg)](https://vaadin.com/directory/component/vaadinvaadin-select)

# &lt;vaadin-select&gt;

[Live Demo ↗](https://cdn.vaadin.com/vaadin-select/2.0.0-beta1/demo)
|
[API documentation ↗](https://cdn.vaadin.com/vaadin-select/2.0.0-beta1/#/elements/vaadin-select)


[&lt;vaadin-select&gt;](https://vaadin.com/components/vaadin-select) is a Web Component similar to a native browser select element, part of the [Vaadin components](https://vaadin.com/components).

<!--
```
<custom-element-demo height="425">
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="vaadin-select.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<vaadin-select label="Label" placeholder="Placeholder" value="Option one">
  <template>
    <vaadin-list-box>
      <vaadin-item>Option one</vaadin-item>
      <vaadin-item>Option two</vaadin-item>
      <vaadin-item>Option three</vaadin-item>
      <hr>
      <vaadin-item disabled>Option four</vaadin-item>
    </vaadin-list-box>
  </template>
</vaadin-select>
```

[<img src="https://raw.githubusercontent.com/vaadin/vaadin-select/master/screenshot.gif" width="220" alt="Screenshot of vaadin-select">](https://vaadin.com/components/vaadin-select)

## Installation

The Vaadin components are distributed as Bower and npm packages.
Please note that the version range is the same, as the API has not changed.
You should not mix Bower and npm versions in the same application, though.

Unlike the official Polymer Elements, the converted Polymer 3 compatible Vaadin components
are only published on npm, not pushed to GitHub repositories.

### Polymer 2 and HTML Imports Compatible Version

Install `vaadin-select`:

```sh
bower i vaadin/vaadin-select --save
```

Once installed, import it in your application:

```html
<link rel="import" href="bower_components/vaadin-select/vaadin-select.html">
```
### Polymer 3 and ES Modules Compatible Version

Install `vaadin-select`:

```sh
npm i @vaadin/vaadin-select --save
```

Once installed, import it in your application:

```js
import '@vaadin/vaadin-select/vaadin-select.js';
```

## Getting started

Vaadin components use the Lumo theme by default.

To use the Material theme, import the correspondent file from the `theme/material` folder.

## Entry points

- The component with the Lumo theme:

  `theme/lumo/vaadin-select.html`

- The component with the Material theme:

- `theme/material/vaadin-select.html`

- Alias for `theme/lumo/vaadin-select.html`:

- `vaadin-select.html`


## Running demos and tests in a browser
Ensure you have [npm](https://www.npmjs.com/) and [Bower](https://bower.io) installed.

Clone the `vaadin-select` repository.
```bash
$ git clone https://github.com/vaadin/vaadin-select.git
```

Change into the `vaadin-select` directory.
```bash
$ cd vaadin-select
```

Install the dependencies.
```bash
$ npm install
$ bower install
```

Launch a webserver to serve the demo & tests
```bash
$ polymer serve --port 3000
```

View the demos at :

[http://127.0.0.1:3000/components/vaadin-select/demo](http://127.0.0.1:3000/components/vaadin-select/demo)

or run the test by visiting :

[http://127.0.0.1:3000/components/vaadin-select/test](http://127.0.0.1:3000/components/vaadin-select/test)

If you wish to see the API documentation then run :
```bash 
$ polymer analyze vaadin-*.html > analysis.json
```
And vist :
[http://127.0.0.1:3000/](http://127.0.0.1:3000/)


## Running tests from the command line

1. When in the `vaadin-select` directory, run `polymer test`


## Following the coding style

We are using [ESLint](http://eslint.org/) for linting JavaScript code. You can check if your code is following our standards by running `gulp lint`, which will automatically lint all `.js` files as well as JavaScript snippets inside `.html` files.


## Big Thanks

Cross-browser Testing Platform and Open Source <3 Provided by [Sauce Labs](https://saucelabs.com).


## Contributing

  To contribute to the component, please read [the guideline](https://github.com/vaadin/vaadin-core/blob/master/CONTRIBUTING.md) first.


## License

Apache License 2.0

Vaadin collects development time usage statistics to improve this product. For details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.
