'use strict'
const test = require('tape')
// const cheerio = require('cheerio');
const plugin = require('../').googlecustomsearch()
const tester = require('@nihiliad/janus/uri-factory/plugin-tester')({ runIntegrationTests: false })

test('googlecustomsearch plugin scopes', function (t) {
  t.deepEqual(plugin.scopes().hsl, 'hsl.lib.umn.edu', 'scopes() correctly returns and indexable object')
  t.end()
})

test('googlecustomsearch plugin fields override', function (t) {
  t.deepEqual(plugin.fields(), {}, 'fields correctly overridden with an empty object')
  t.end()
})

test('googlecustomsearch plugin baseUri() defaults', function (t) {
  tester.baseUri(t, plugin, 'https://www.lib.umn.edu/search')
})

test('googlecustomsearch plugin emptySearchUri()', function (t) {
  tester.emptySearchUri(t, plugin, 'https://www.lib.umn.edu/search')
})

test('googlecustomsearch plugin uriFor() missing "search" arguments', function (t) {
  // testCases map state descriptions to uriFor() arguments
  const testCases = {
    'all arguments are null': {
      search: null,
      scope: null,
      field: null
    }
  }
  tester.missingSearchArgs(t, plugin, testCases)
})

test('googlecustomsearch plugin uriFor() valid "search" arguments', function (t) {
  // testCases map expected uri to uriFor() arguments
  const testCases = {
    'https://www.lib.umn.edu/search?query=math': {
      search: 'math',
      scope: null,
      field: null
    },
    'https://www.lib.umn.edu/search?query=wwwmath': {
      search: 'wwwmath',
      scope: 'www',
      field: null
    },
    'https://hsl.lib.umn.edu/search?query=math': {
      search: 'math',
      scope: 'hsl',
      field: null
    },
    'https://hsl.lib.umn.edu/search?query=quackery': {
      search: 'quackery',
      scope: 'wangensteen',
      field: null
    }
  }

  function getResultCount (html) {
    // const elem = $('#resInfo-1');
    // // Displays like "About 1,294 results", strip out the comma
    // const matches = $(elem[0]).text().trim().replace(/,/, '').match(/About (\d+) sorted/);
    // const count = matches[1];
    // return parseInt(count, 10);

    // Our /search endpoint loads Google code that does search via XHR
    // and returns to build results via JS. Current test runner
    // does not support checking this, would need something like Selenium
    return 1
  };

  tester.validSearchArgs(t, plugin, testCases, getResultCount)
})
