'use strict'
const test = require('tape')
const plugin = require('../').primo()
const tester = require('@nihiliad/janus/uri-factory/plugin-tester')({ runIntegrationTests: false })

test('setup', async function (t) {
  await tester.setup()
})

test('primo baseUri()', function (t) {
  tester.baseUri(t, plugin, 'https://primo.lib.umn.edu/discovery/search?vid=01UMN_INST%3ATWINCITIES&lang=en')
})

test('primo emptySearchUri()', function (t) {
  tester.emptySearchUri(t, plugin, 'https://primo.lib.umn.edu/discovery/search?vid=01UMN_INST%3ATWINCITIES&lang=en')
})

test('primo uriFor() missing "search" arguments', function (t) {
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
      scope: 'bio_med',
      field: null
    },
    'both "scope" and "field" arguments have truthy values': {
      search: 0,
      scope: 'plant_pathology',
      field: 'title'
    },
    '"scope", "field", and "format" arguments have truthy values': {
      search: 0,
      scope: 'plant_pathology',
      field: 'title',
      format: 'books'
    }
  }
  tester.missingSearchArgs(t, plugin, testCases)
})

test('primo invalid field args', function (t) {
  tester.invalidFieldArgs(t, plugin, 'https://primo.lib.umn.edu/discovery/search?vid=01UMN_INST%3ATWINCITIES&lang=en&search_scope=default_scope&query=any%2Ccontains%2Cdarwin')
})

test('primo invalid scope args', function (t) {
  tester.invalidScopeArgs(t, plugin, 'https://primo.lib.umn.edu/discovery/search?vid=01UMN_INST%3ATWINCITIES&lang=en&search_scope=default_scope&query=any%2Ccontains%2Cdarwin')
})

test('primo uriFor() valid "search" arguments', function (t) {
  // testCases map expectedUrl to uriFor arguments
  const testCases = {
    'https://primo.lib.umn.edu/discovery/search?vid=01UMN_INST%3ATWINCITIES&lang=en&search_scope=default_scope&query=any%2Ccontains%2Cdarwin': {
      search: 'darwin',
      scope: null,
      field: null
    },
    'https://primo.lib.umn.edu/discovery/search?vid=01UMN_INST%3ATWINCITIES&lang=en&search_scope=default_scope&query=sub%2Ccontains%2Cdarwin': {
      search: 'darwin',
      scope: null,
      field: 'subject'
    },
    'https://primo.lib.umn.edu/discovery/search?vid=01UMN_INST%3ATWINCITIES&lang=en&search_scope=wilson&query=any%2Ccontains%2Cfrancis+scott+fitzgerald': {
      search: 'francis scott fitzgerald',
      scope: 'wilson',
      field: null
    },
    'https://primo.lib.umn.edu/discovery/search?vid=01UMN_INST%3ATWINCITIES&lang=en&search_scope=givens&query=title%2Ccontains%2Cinvisible+man': {
      search: 'invisible man',
      scope: 'givens',
      field: 'title'
    },
    'https://primo.lib.umn.edu/discovery/search?vid=01UMN_INST%3ATWINCITIES&lang=en&search_scope=givens&query=title%2Ccontains%2Cinvisible+man&facet=rtype%2Cinclude%2Cbooks': {
      search: 'invisible man',
      scope: 'givens',
      field: 'title',
      format: 'books'
    },
    'https://primo.lib.umn.edu/discovery/search?vid=01UMN_INST%3ATWINCITIES&lang=en&search_scope=default_scope&query=any%2Ccontains%2Cdarwin&mfacet=rtype%2Cinclude%2Carchive%2C1&mfacet=rtype%2Cinclude%2Carchival_material_manuscripts%2C1': {
      search: 'darwin',
      scope: null,
      field: null,
      format: 'archive'
    },
    'https://primo.lib.umn.edu/discovery/search?vid=01UMN_INST%3ATWINCITIES&lang=en&search_scope=default_scope&query=any%2Ccontains%2Cdarwin&facet=rtype%2Cinclude%2Caudios': {
      search: 'darwin',
      scope: null,
      field: null,
      format: 'audios'
    },
    'https://primo.lib.umn.edu/discovery/search?vid=01UMN_INST%3ATWINCITIES&lang=en&search_scope=default_scope&query=any%2Ccontains%2Cdarwin&facet=rtype%2Cinclude%2Cjournals': {
      search: 'darwin',
      scope: null,
      field: null,
      format: 'journals'
    },
    'https://primo.lib.umn.edu/discovery/search?vid=01UMN_INST%3ATWINCITIES&lang=en&search_scope=default_scope&query=any%2Ccontains%2Cdarwin&facet=rtype%2Cinclude%2Cmaps': {
      search: 'darwin',
      scope: null,
      field: null,
      format: 'maps'
    },
    'https://primo.lib.umn.edu/discovery/search?vid=01UMN_INST%3ATWINCITIES&lang=en&search_scope=default_scope&query=any%2Ccontains%2Cdarwin&facet=rtype%2Cinclude%2Cscores': {
      search: 'darwin',
      scope: null,
      field: null,
      format: 'scores'
    },
    'https://primo.lib.umn.edu/discovery/search?vid=01UMN_INST%3ATWINCITIES&lang=en&search_scope=default_scope&query=any%2Ccontains%2Cdarwin&facet=rtype%2Cinclude%2Cvideos': {
      search: 'darwin',
      scope: null,
      field: null,
      format: 'videos'
    },
    'https://primo.lib.umn.edu/discovery/search?vid=01UMN_INST%3ATWINCITIES&lang=en&search_scope=default_scope&query=any%2Ccontains%2Cdarwin&facet=tlevel%2Cinclude%2Conline_resources%24%24ITWINCITIES': {
      search: 'darwin',
      scope: null,
      field: null,
      format: 'online'
    },
    'https://primo.lib.umn.edu/discovery/search?vid=01UMN_INST%3ATWINCITIES&lang=en&search_scope=default_scope&query=any%2Ccontains%2Cdarwin&mfacet=rtype%2Cinclude%2Caudios%2C1&mfacet=rtype%2Cinclude%2Cimages%2C1&mfacet=rtype%2Cinclude%2Cvideos%2C1': {
      search: 'darwin',
      scope: null,
      field: null,
      format: 'media'
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
