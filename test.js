import path from 'path'
import test from 'ava'
import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import pify from 'pify'
import moduleName from './app/module-name'

let generator

test.beforeEach(async () => {
  await pify(helpers.testDirectory)(path.join(__dirname, 'temp'))
  generator = helpers.createGenerator('tm:app', ['../app'], null, { skipInstall: true })
})

test.serial('generates expected files', async () => {
  helpers.mockPrompt(generator, {
    moduleName: 'test',
    githubUsername: 'test',
    website: 'test.com',
    cli: false
  })

  await pify(generator.run.bind(generator))()

  assert.file([
    '.editorconfig',
    '.git',
    '.gitattributes',
    '.gitignore',
    '.travis.yml',
    'index.js',
    'LICENSE',
    'package.json',
    'README.md',
    'test.js'
  ])

  assert.noFile('cli.js')
})

test.serial('CLI option', async () => {
  helpers.mockPrompt(generator, {
    moduleName: 'test',
    githubUsername: 'test',
    website: 'test.com',
    cli: true
  })

  await pify(generator.run.bind(generator))()

  assert.file('cli.js')
  assert.fileContent('package.json', /"bin":/)
  assert.fileContent('package.json', /"bin": "cli.js"/)
  assert.fileContent('package.json', /"meow"/)
})

test.serial('nyc option', async () => {
  helpers.mockPrompt(generator, {
    moduleName: 'test',
    githubUsername: 'test',
    website: 'test.com',
    cli: false,
    coverage: 'codecov'
  })

  await pify(generator.run.bind(generator))()

  assert.noFile('cli.js')
  assert.fileContent('.gitignore', /\.nyc_output/)
  assert.fileContent('.gitignore', /coverage/)
  assert.fileContent('package.json', /xo && nyc ava/)
  assert.fileContent('package.json', /"nyc": "/)
  assert.fileContent('package.json', /"lcov"/)
  assert.fileContent('.travis.yml', /codecov/)
})

test.serial('coveralls option', async () => {
  helpers.mockPrompt(generator, {
    moduleName: 'test',
    githubUsername: 'test',
    website: 'test.com',
    cli: false,
    coverage: 'coveralls'
  })

  await pify(generator.run.bind(generator))()

  assert.noFile('cli.js')
  assert.fileContent('.gitignore', /\.nyc_output/)
  assert.fileContent('.gitignore', /coverage/)
  assert.fileContent('package.json', /xo && nyc ava/)
  assert.fileContent('package.json', /"nyc": "/)
  assert.fileContent('package.json', /"lcov"/)
  assert.fileContent('.travis.yml', /coveralls/)
})

test('parse scoped package names', t => {
  t.is(moduleName.slugify('author/thing'), 'author-thing', 'slugify non-scoped packages')
  t.is(moduleName.slugify('@author/thing'), '@author/thing', 'accept scoped packages')
  t.is(moduleName.slugify('@author/hi/there'), 'author-hi-there', 'fall back to regular slugify if invalid scoped name')
})

test.serial('prompts for description', async () => {
  helpers.mockPrompt(generator, {
    moduleName: 'test',
    moduleDescription: 'foo',
    githubUsername: 'test',
    website: 'test.com',
    cli: false,
    coverage: 'codecov'
  })

  await pify(generator.run.bind(generator))()

  assert.fileContent('package.json', /"description": "foo",/)
  assert.fileContent('README.md', /> foo/)
})

test.serial('defaults to superb description', async () => {
  helpers.mockPrompt(generator, {
    moduleName: 'test',
    githubUsername: 'test',
    website: 'test.com',
    cli: false,
    coverage: 'codecov'
  })

  await pify(generator.run.bind(generator))()

  assert.fileContent('package.json', /"description": "My .+ module",/)
  assert.fileContent('README.md', /> My .+ module/)
})
