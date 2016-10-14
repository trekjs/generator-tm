# <%= repoName %>

> <%= moduleDescription %>


## Install

```console
$ npm install <%= moduleName %> --save
```


## Usage

```js
const <%= camelModuleName %> = require('<%= modu

<%= camelModuleName %>('unicorns')
//=> 'unicorns & rainbows'
```


## API

### <%= camelModuleName %>(input, [options])

#### input

Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.<% if (cli) { %>


## CLI

```console
$ npm install <%= moduleName %> --global
```

```
$ <%= repoName %> --help

  Usage
    <%= repoName %> [input]

  Options
    --foo  Lorem ipsum [Default: false]

  Examples
    $ <%= repoName %>
    unicorns & rainbows
    $ <%= repoName %> ponies
    ponies & rainbows
```<% } %>


## Badges


<a href="https://npmjs.org/package/<%= moduleName %>"><img src="https://img.shields.io/npm/v/<%= moduleName %>.svg" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/<%= moduleName %>"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="MIT License"></a>
<a href="https://codecov.io/gh/<%= githubUsername %>/<%= repoName %>"><img src="https://codecov.io/gh/<%= githubUsername %>/<%= repoName %>/branch/master/graph/badge.svg" alt="Codecov" /></a>
<a href="https://travis-ci.org/<%= githubUsername %>/<%= repoName %>"><img src="https://img.shields.io/travis/<%= githubUsername %>/<%= repoName %>.svg?label=linux" alt="Linux Build"></a>
<a href="https://ci.appveyor.com/project/<%= githubUsername %>/<%= repoName %>"><img src="https://img.shields.io/appveyor/ci/<%= githubUsername %>/<%= repoName %>/master.svg?label=windows" alt="Window Build"/></a>


---

> [<%= website.replace(/https?:\/\//, '') %>](<%= website %>) &nbsp;&middot;&nbsp;
> GitHub [@<%= name %>](https://github.com/<%= name %>) &nbsp;&middot;&nbsp;<% if (twitter) { %>
> Twitter [@<%= twitter %>](https://twitter.com/<%= twitter %>)<% } %>
