'use strict';
const test = require('tape');
const cheerio = require('cheerio');
const plugin = require('../').umedia();
const tester = require('@nihiliad/janus/uri-factory/plugin-tester')({runIntegrationTests: false});

test('umedia baseUri()', function (t) {
  tester.baseUri(t, plugin, 'https://umedia.lib.umn.edu/dasearch');
});

test('umedia emptySearch()', function (t) {
  tester.emptySearchUri(t, plugin, 'https://umedia.lib.umn.edu/dasearch');
});

test('umedia uriFor() missing "search" arguments', function (t) {
  // testCases map state descriptions to uriFor arguments
  const testCases = {
    'all arguments are null': {
      search: null,
      scope: null,
      field: null,
    },
    'only "subject" argument has a truthy value': {
      search: '',
      scope: null,
      field: 'subject',
    },
    'only "scope" argument has a truthy value': {
      search: false,
      scope: '69339', // John R. Borchert Map Library
      field: null,
    },
    'both "scope" and "field" arguments have truthy values': {
      search: 0,
      scope: '69339', // John R. Borchert Map Library
      field: 'title',
    },
  };
  tester.missingSearchArgs(t, plugin, testCases);
});

test('umedia invalid field args', function (t) {
  tester.invalidFieldArgs(t, plugin, 'https://umedia.lib.umn.edu/dasearch/darwin');
});

test('umedia invalid scope args', function (t) {
  tester.invalidScopeArgs(t, plugin, 'https://umedia.lib.umn.edu/dasearch/darwin');
});

test('umedia uriFor() valid "search" arguments', function (t) {
  // testCases map expectedUrl to uriFor arguments
  const testCases = {
    'https://umedia.lib.umn.edu/dasearch/darwin': {
      search: 'darwin',
      scope: null,
      field: null,
    },
    'https://umedia.lib.umn.edu/dasearch/subject:%28darwin%29?mode=expert': {
      search: 'darwin',
      scope: null,
      field: 'subject',
    },
    'https://umedia.lib.umn.edu/dasearch/%28im_og_gid:69339%20AND%20%28darwin%29%29?mode=expert': {
      search: 'darwin',
      scope: '69339', // John R. Borchert Map Library
      field: null,
    },
    'https://umedia.lib.umn.edu/dasearch/%28tid:871%20AND%20%28urdu%20poetry%29%29?mode=expert': {
      search: 'urdu poetry',
      scope: 'tid:871', // Classical Urdu Poetry taxonomy term within Ames Library of South Asia collection.
      field: null,
    },
    'https://umedia.lib.umn.edu/dasearch/%28im_og_gid:69339%20AND%20%28darwin%20glacier%29%29?mode=expert': {
      search: 'darwin glacier',
      scope: 'im_og_gid:69339', // John R. Borchert Map Library, including the Drupal group ID prefix in the param value.
      field: null,
    },
    'https://umedia.lib.umn.edu/dasearch/%28im_og_gid:69339%20AND%20titles:%28darwin%29%29?mode=expert': {
      search: 'darwin',
      scope: '69339', // John R. Borchert Map Library
      field: 'title',
    },
    'https://umedia.lib.umn.edu/dasearch/%28tid:871%20AND%20titles:%28urdu%20poetry%29%29?mode=expert': {
      search: 'urdu poetry',
      scope: 'tid:871', // Classical Urdu Poetry taxonomy term within Ames Library of South Asia collection.
      field: 'title',
    },
  };

  function getResultCount (html) {
    const $ = cheerio.load(html);
    const divs = $('div.dasset_search_summary');
    const matches = $(divs[0]).text().trim().match(/(\d+) items found/);
    const count = matches.pop();
    return count;
  }

  tester.validSearchArgs(t, plugin, testCases, getResultCount);
});
