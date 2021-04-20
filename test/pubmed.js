'use strict'
const test = require('tape')
const plugin = require('../').pubmed()
const tester = require('@nihiliad/janus/uri-factory/plugin-tester')({ runIntegrationTests: false })

test('pubmed plugin default scopes', function (t) {
  t.deepEqual(plugin.scopes(), {}, 'scopes() correctly returns the default empty object')
  t.end()
})

test('pubmed plugin fields override', function (t) {
  t.deepEqual(plugin.fields(), {}, 'fields correctly overridden with an empty object')
  t.end()
})

test('pubmed plugin baseUri()', function (t) {
  tester.baseUri(t, plugin, 'https://pubmed.ncbi.nlm.nih.gov?otool=umnbmlib')
})

test('pubmed plugin emptySearchUri()', function (t) {
  tester.emptySearchUri(t, plugin, 'https://pubmed.ncbi.nlm.nih.gov?otool=umnbmlib')
})

test('pubmed plugin uriFor() missing "search" arguments', function (t) {
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

test('pubmed plugin uriFor() valid "search" arguments', function (t) {
  // testCases map expected uri to uriFor() arguments
  const testCases = {
    'https://pubmed.ncbi.nlm.nih.gov?otool=umnbmlib&term=neoplasm': {
      search: 'neoplasm',
      scope: null,
      field: null
    }
  }

  async function getResultCount (page) {
    const count = await page.$eval(
      '#search-results > .results-amount-container > .results-amount > .value',
      elem => { return elem.textContent.replace(/,/g, '') }
    )
    return count
  };

  tester.validSearchArgs(t, plugin, testCases, getResultCount)
})

test('cleanup', async function (t) {
  await tester.cleanup()
})
