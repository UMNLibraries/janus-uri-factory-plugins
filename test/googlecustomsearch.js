'use strict'
const test = require('tape')
const plugin = require('../').googlecustomsearch()
const tester = require('@nihiliad/janus/uri-factory/plugin-tester')({ runIntegrationTests: false })

test('setup', async function (t) {
  await tester.setup()
})

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
    'https://www.lib.umn.edu/search?query=math': {
      search: 'math',
      scope: 'www',
      field: null
    },
    'https://hsl.lib.umn.edu/search?query=virus': {
      search: 'virus',
      scope: 'hsl',
      field: null
    },
    'https://hsl.lib.umn.edu/search?query=virus': {
      search: 'virus',
      scope: 'wangensteen',
      field: null
    }
  }

  async function getResultCount (page) {
    return await page.$eval('#resInfo-1', elem => {
      // Displays like "About 1,294 results", strip out the comma
      const matches = elem.textContent.trim().replace(/,/, '').match(/About (\d+) results/)
      if (matches) return matches.pop()
      throw Error('Failed to find a result count')
    })
  };

  tester.validSearchArgs(t, plugin, testCases, getResultCount)
})

test('teardown', async function (t) {
  await tester.teardown()
})
