'use strict'

const superb = require('superb')
const normalizeUrl = require('normalize-url')
const humanizeUrl = require('humanize-url')
const yeoman = require('yeoman-generator')
const _s = require('underscore.string')
const moduleName = require('./module-name')

module.exports = class extends yeoman.Base {
  constructor (a, b) {
    super(a, b)

    this.option('org', {
      type: 'string',
      desc: 'Publish to a GitHub organization account'
    })

    this.option('cli', {
      type: 'boolean',
      desc: 'Add a CLI'
    })

    this.option('coverage', {
      type: 'boolean',
      desc: 'Upload coverage to codecov.io or coveralls.io (implies coverage)'
    })
  }

  init () {
    return this.prompt([{
      name: 'moduleName',
      message: 'What do you want to name your module?',
      default: _s.slugify(this.appname),
      filter: x => moduleName.slugify(x)
    }, {
      name: 'moduleDescription',
      message: 'What is your module description?',
      default: `My ${superb()} module`
    }, {
      name: 'githubUsername',
      message: 'What is your GitHub username?',
      store: true,
      validate: x => x.length > 0 ? true : 'You have to provide a username',
      when: () => !this.options.org
    }, {
      name: 'website',
      message: 'What is the URL of your website?',
      store: true,
      validate: x => x.length > 0 ? true : 'You have to provide a website URL',
      filter: x => normalizeUrl(x)
    }, {
      name: 'cli',
      message: 'Do you need a CLI?',
      type: 'confirm',
      default: Boolean(this.options.cli),
      when: () => this.options.cli === undefined
    }, {
      name: 'coverage',
      message: 'Upload coverage to codecov.io or coveralls.io?',
      type: 'list',
      default: 'codecov',
      choices: ['codecov', 'coveralls'],
      when: () => Boolean(this.options.coverage)
    }]).then(props => {
      const or = (option, prop) => this.options[option] === undefined ? props[prop || option] : this.options[option]

      const cli = or('cli')
      const coverage = or('coverage')

      const repoName = moduleName.repoName(props.moduleName)

      const tpl = {
        moduleName: props.moduleName,
        moduleDescription: props.moduleDescription,
        camelModuleName: _s.camelize(repoName),
        githubUsername: this.options.org || props.githubUsername,
        repoName,
        name: this.user.git.name(),
        email: this.user.git.email(),
        website: props.website,
        humanizedWebsite: humanizeUrl(props.website),
        cli,
        coverage
      }

      const mv = (from, to) => {
        this.fs.move(this.destinationPath(from), this.destinationPath(to))
      }

      this.fs.copyTpl([
        `${this.templatePath()}/**`,
        '!**/cli.js'
      ], this.destinationPath(), tpl)

      if (props.cli) {
        this.fs.copyTpl(this.templatePath('cli.js'), this.destinationPath('cli.js'), tpl)
      }

      mv('editorconfig', '.editorconfig')
      mv('gitattributes', '.gitattributes')
      mv('gitignore', '.gitignore')
      mv('travis.yml', '.travis.yml')
      mv('_package.json', 'package.json')
    })
  }

  git () {
    this.spawnCommandSync('git', ['init'])
  }

  install () {
    this.installDependencies({ bower: false })
  }
}
