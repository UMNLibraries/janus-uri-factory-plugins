'use strict'
const test = require('tape')
const plugin = require('../').conservancy()
const tester = require('@nihiliad/janus/uri-factory/plugin-tester')({ runIntegrationTests: false })

test('setup', async function (t) {
  await tester.setup()
})

test('conservancy baseUri()', function (t) {
  tester.baseUri(t, plugin, 'https://conservancy.umn.edu/search')
})

test('conservancy emptySearchUri()', function (t) {
  tester.emptySearchUri(t, plugin, 'https://conservancy.umn.edu/')
})

test('conservancy uriFor() missing "search" arguments', function (t) {
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
    },
    'only "scope" argument has a truthy value': {
      search: false,
      scope: '1', // University of Minnesota - Twin Cities,
      field: null
    },
    'both "scope" and "field" arguments have truthy values': {
      search: 0,
      scope: '1',
      field: 'title'
    }
  }
  tester.missingSearchArgs(t, plugin, testCases)
})

test('conservancy invalid field args', function (t) {
  tester.invalidFieldArgs(t, plugin, 'https://conservancy.umn.edu/search?query=darwin')
})

test('conservancy invalid scope args', function (t) {
  tester.invalidScopeArgs(t, plugin, 'https://conservancy.umn.edu/search?query=darwin')
})

test('conservancy uriFor() valid "search" arguments', function (t) {
  // testCases map expectedUrl to uriFor arguments
  const testCases = {
    'https://conservancy.umn.edu/search?query=darwin': {
      search: 'darwin',
      scope: null,
      field: null
    },
    'https://conservancy.umn.edu/search?query=darwin&filtertype_1=subject&filter_relational_operator_1=contains&filter_1=darwin': {
      search: 'darwin',
      scope: null,
      field: 'subject'
    },
    'https://conservancy.umn.edu/search?query=minnesota&scope=4b8b835d-e1aa-4f79-bc86-f031b1d5882f': {
      search: 'minnesota',
      scope: '4b8b835d-e1aa-4f79-bc86-f031b1d5882f', // UUID for DRUM
      field: null
    }
  }

  async function getResultCount (page) {
    return await page.$eval('small.results', elem => {
      const matches = elem.textContent.trim().match(/(\d+) results/)
      if (matches) return matches.pop()
      throw Error('Failed to find a result count')
    })
  };

  tester.validSearchArgs(t, plugin, testCases, getResultCount)
})

test('teardown', async function (t) {
  await tester.teardown()
})
