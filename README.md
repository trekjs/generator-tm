# generator-tm

> Scaffold out a Trek.js module

Optionally with a [CLI](http://en.wikipedia.org/wiki/Command-line_interface).

Forked from [generator-nm](https://github.com/sindresorhus/generator-nm).


## Install

```
$ npm install --global yo generator-tm
```


## Usage

With [yo](https://github.com/yeoman/yo):

```
$ yo nm
```

There are multiple command-line options available:

```
$ yo nm --help

  Usage:
    yo tm [options]

  Options:
    --help          # Print the generator's options and usage
    --skip-cache    # Do not remember prompt answers                      Default: false
    --skip-install  # Do not automatically install dependencies           Default: false
    --org           # Publish to a GitHub organization account
    --cli           # Add a CLI
    --coverage      # Upload coverage to codecov.io coveralls.io (implies --coverage)
```

The `--org` option takes a string value (i.e. `--org=avajs`). All others are boolean flags and can be negated with the `no` prefix (i.e. `--no-coverage`). You will be prompted for any options not passed on the command-line.


## Tip

Use [chalk](https://github.com/sindresorhus/chalk) if you want colors in your CLI.


## Badges

[![Build Status](https://travis-ci.org/trekjs/generator-tm.svg?branch=master)](https://travis-ci.org/trekjs/generator-tm)
[![codecov](https://codecov.io/gh/trekjs/generator-tm/branch/master/graph/badge.svg)](https://codecov.io/gh/trekjs/generator-tm)
![](https://img.shields.io/badge/license-MIT-blue.svg)

---

> [fundon.me](https://fundon.me) &nbsp;&middot;&nbsp;
> GitHub [@fundon](https://github.com/fundon) &nbsp;&middot;&nbsp;
> Twitter [@_fundon](https://twitter.com/_fundon)
