'use strict';
const test = require('tape');
const cheerio = require('cheerio');
const plugin = require('../').umediacollection();
const tester = require('@nihiliad/janus/uri-factory/plugin-tester')({runIntegrationTests: false});

test('umedia baseUri()', function (t) {
  tester.baseUri(t, plugin, 'https://umedia.lib.umn.edu/search');
});

test('umedia emptySearch()', function (t) {
  tester.emptySearchUri(t, plugin, 'https://umedia.lib.umn.edu/search');
});

test('umedia uriFor() missing "search" arguments', function (t) {
  // testCases map state descriptions to uriFor arguments
  const testCases = {
    'all arguments are null': {
      search: null,
      scope: null,
      field: null,
    },
    'only "field" argument has a truthy value': {
      search: '',
      scope: null,
      field: 'subject',
    },
  };
  tester.missingSearchArgs(t, plugin, testCases);
});

test('umedia invalid field args', function (t) {
  tester.invalidFieldArgs(t, plugin, 'https://umedia.lib.umn.edu/search?q=darwin');
});

test('umedia invalid scope args', function (t) {
  tester.invalidScopeArgs(t, plugin, 'https://umedia.lib.umn.edu/search?q=darwin');
});

test('umedia uriFor() valid "search" arguments', function (t) {
  // testCases map expectedUrl to uriFor arguments
  const testCases = {
    'https://umedia.lib.umn.edu/search?q=darwin': {
      search: 'darwin',
      scope: null,
      field: null,
    },
    'https://umedia.lib.umn.edu/search?q=darwin&facets%5Bcollection_name_s%5D%5B%5D=Classical+Urdu+Poetry': {
      search: 'darwin',
      scope: 'Classical Urdu Poetry',
      field: null,
    },
    'https://umedia.lib.umn.edu/search?facets%5Bcollection_name_s%5D%5B%5D=Classical+Urdu+Poetry': {
      search: null,
      scope: 'Classical Urdu Poetry',
      field: null,
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