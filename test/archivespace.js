'use strict'
const test = require('tape')
const plugin = require('../').archivespace()
const tester = require('@nihiliad/janus/uri-factory/plugin-tester')({ runIntegrationTests: false })

test('setup', async function (t) {
  await tester.setup()
})

test('archivespace baseUri()', function (t) {
  tester.baseUri(t, plugin, 'https://archives.lib.umn.edu')
})

test('archivespace emptySearchUri()', function (t) {
  tester.emptySearchUri(t, plugin, 'https://archives.lib.umn.edu')
})

test('archivespace uriFor() missing "search" arguments', function (t) {
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

test('archivespace plugin uriFor() with no arguments except scope', function (t) {
  const [warning, uri] = plugin.uriFor(false, '5', null)
  const expectedHref = 'https://archives.lib.umn.edu/repositories/5' // Givens Collection of African American Literature
  t.equal(uri.href(), expectedHref, 'with no arguments except scope we get expected href, to browse the associated repository (' + expectedHref + ')...')
  t.equal(warning, 'Missing or empty search expression.', '...and expected warning returned for a missing search expression')
  t.end()
})

test('archivespace plugin uriFor() with valid scope and field arguments', function (t) {
  const [warning, uri] = plugin.uriFor(0, '3', 'title')
  const expectedHref = 'https://archives.lib.umn.edu/repositories/3' // Chalres Babbage Institute
  t.equal(uri.href(), expectedHref, 'with valid scope and field arguments we get expected href, to browse the associated repository, ignoring field (' + expectedHref + ')...')
  t.equal(warning, 'Missing or empty search expression.', '...and expected warning returned for a missing search expression')
  t.end()
})

test('archivespace invalid field args', function (t) {
  tester.invalidFieldArgs(t, plugin, 'https://archives.lib.umn.edu/search?op%5B%5D=&q%5B%5D=darwin')
})

test('archivespace invalid scope args', function (t) {
  tester.invalidScopeArgs(t, plugin, 'https://archives.lib.umn.edu/search?op%5B%5D=&q%5B%5D=darwin')
})

test('archivespace uriFor() valid "search" arguments', function (t) {
  const testCases = {
    'https://archives.lib.umn.edu/search?op%5B%5D=&q%5B%5D=darwin': {
      search: 'darwin',
      scope: null,
      field: null
    },
    'https://archives.lib.umn.edu/search?op%5B%5D=&q%5B%5D=darwin&field%5B%5D=title': {
      search: 'darwin',
      scope: null,
      field: 'title'
    },
    'https://archives.lib.umn.edu/search?op%5B%5D=&q%5B%5D=borlaug&field%5B%5D=creators_text': {
      search: 'borlaug',
      scope: null,
      field: 'author'
    },
    'https://archives.lib.umn.edu/search?op%5B%5D=&q%5B%5D=hospital&limit=subject': {
      search: 'hospital',
      scope: null,
      field: 'subject'
    },
    'https://archives.lib.umn.edu/repositories/3/search?op%5B%5D=&q%5B%5D=difference+engine': {
      search: 'difference engine',
      scope: '3', // CBI
      field: null
    },
    'https://archives.lib.umn.edu/repositories/15/search?op%5B%5D=&q%5B%5D=minnesota&field%5B%5D=title': {
      search: 'minnesota',
      scope: '15', // UMJA
      field: 'title'
    }
  }

  async function getResultCount (page) {
    return await page.$eval('title', elem => {
      const matches = elem.textContent.trim().match(/Found (\d+) Results/)
      if (matches) return matches.pop()
      throw Error('Failed to find a result count')
    })
  };

  tester.validSearchArgs(t, plugin, testCases, getResultCount)
})

test('teardown', async function (t) {
  await tester.teardown()
})
