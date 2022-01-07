'use strict'
const test = require('tape')
const plugin = require('../').worldcatdiscovery()
const tester = require('@nihiliad/janus/uri-factory/plugin-tester')({ runIntegrationTests: false })

test('setup', async function (t) {
  await tester.setup()
})

test('worldcatdiscovery plugin default scopes', function (t) {
  t.deepEqual(plugin.scopes(), {}, 'scopes() correctly returns the default empty object')
  t.end()
})

test('worldcatdiscovery baseUri()', function (t) {
  tester.baseUri(t, plugin, 'https://universityofminnesota-minneapolis.on.worldcat.org')
})

test('worldcatdiscovery emptySearchUri()', function (t) {
  tester.emptySearchUri(t, plugin, 'https://universityofminnesota-minneapolis.on.worldcat.org')
})

test('worldcatdiscovery uriFor() missing "search" arguments', function (t) {
  // testCases map state descriptions to uriFor arguments
  const testCases = {
    'all arguments are null': {
      search: null,
      scope: null,
      field: null
    },
    'only "subject" argument has a truthy value': {
      search: '',
      scope: null,
      field: 'subject'
    }
  }
  tester.missingSearchArgs(t, plugin, testCases)
})

test('worldcatdiscovery invalid field args', function (t) {
  tester.invalidFieldArgs(t, plugin, 'https://universityofminnesota-minneapolis.on.worldcat.org/search?queryString=darwin')
})

test('worldcatdiscovery uriFor() valid "search" arguments', function (t) {
  // testCases map expectedUrl to uriFor arguments
  const testCases = {
    'https://universityofminnesota-minneapolis.on.worldcat.org/search?queryString=darwin': {
      search: 'darwin',
      scope: null,
      field: null
    },
    'https://universityofminnesota-minneapolis.on.worldcat.org/search?queryString=au%3Adarwin': {
      search: 'darwin',
      scope: null,
      field: 'author'
    }
  }

  async function getResultCount (page) {
    return await page.$eval('#search-scope-summary > strong', elem => {
      const matches = elem.textContent.trim().replace(/,/, '').match(/(\d+) results/)
      if (matches) return matches.pop()
      throw Error('Failed to find a result count')
    })
  };

  tester.validSearchArgs(t, plugin, testCases, getResultCount)
})

test('teardown', async function (t) {
  await tester.teardown()
})
