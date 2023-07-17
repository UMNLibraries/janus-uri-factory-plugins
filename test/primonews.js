'use strict'
const test = require('tape')
const plugin = require('../').primonews()
const tester = require('@nihiliad/janus/uri-factory/plugin-tester')({ runIntegrationTests: false })

test('setup', async function (t) {
  await tester.setup()
})

test('primonews baseUri()', function (t) {
  tester.baseUri(t, plugin, 'https://primo.lib.umn.edu/discovery/npsearch?vid=01UMN_INST%3ATWINCITIES&lang=en&offset=0')
})

test('primonews emptySearchUri()', function (t) {
  tester.emptySearchUri(t, plugin, 'https://primo.lib.umn.edu/discovery/npsearch?vid=01UMN_INST%3ATWINCITIES&lang=en&offset=0')
})

test('primonews uriFor() missing "search" arguments', function (t) {
  // testCases map state descriptions to uriFor arguments
  const testCases = {
    'all arguments are null': {
      search: null,
      scope: null,
      field: null
    },
    'only "search" argument has a truthy value': {
      search: '',
      scope: null,
      field: null
    }
  }
  tester.missingSearchArgs(t, plugin, testCases)
})

test('primo uriFor() valid "search" arguments', function (t) {
  // testCases map expectedUrl to uriFor arguments
  const testCases = {
    'https://primo.lib.umn.edu/discovery/npsearch?vid=01UMN_INST%3ATWINCITIES&lang=en&offset=0&query=any%2Ccontains%2Ccharles+darwin': {
      search: 'charles darwin',
      scope: null,
      field: null
    }
  }

  async function getResultCount (page) {
    await page.waitForSelector('span[class="results-count"][role="alert"]')
    return await page.$eval('span[class="results-count"][role="alert"]', elem => {
      const matches = elem.textContent.trim().replace(/[",\s]/g, '').match(/^(\d+)/)
      if (matches) return matches.pop()
      throw Error('Failed to find a result count')
    })
  };

  tester.validSearchArgs(t, plugin, testCases, getResultCount)
})

test('teardown', async function (t) {
  await tester.teardown()
})
