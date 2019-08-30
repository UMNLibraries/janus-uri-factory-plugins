'use strict';
const test = require('tape');
const cheerio = require('cheerio');
const plugin = require('../').worldcat();
const tester = require('@nihiliad/janus/uri-factory/plugin-tester')({runIntegrationTests: false});

test('worldcat plugin default scopes', function (t) {
  t.deepEqual(plugin.scopes(), {}, 'scopes() correctly returns the default empty object');
  t.end();
});

test('worldcat baseUri()', function (t) {
  tester.baseUri(t, plugin, 'https://www.worldcat.org');
});

test('worldcat emptySearchUri()', function (t) {
  tester.emptySearchUri(t, plugin, 'https://www.worldcat.org');
});

test('worldcat uriFor() missing "search" arguments', function (t) {
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
  };
  tester.missingSearchArgs(t, plugin, testCases);
});

test('worldcat invalid field args', function (t) {
  tester.invalidFieldArgs(t, plugin, 'https://www.worldcat.org/search?q=darwin');
});

test('worldcat uriFor() valid "search" arguments', function (t) {
  // testCases map expectedUrl to uriFor arguments
  const testCases = {
    'https://www.worldcat.org/search?q=darwin': {
      search: 'darwin',
      scope: null,
      field: null,
    },
    'https://www.worldcat.org/search?q=au%3Adarwin': {
      search: 'darwin',
      scope: null,
      field: 'author',
    },
  };

  function getResultCount (html) {
    const $ = cheerio.load(html);
    const elems = $('div[class=resultsinfo]').first().find('table').find('tr').find('td');
    const matches = $(elems[0]).text().match(/Results 1-(\d+)/);
    const count = matches.pop();
    return count;
  }

  tester.validSearchArgs(t, plugin, testCases, getResultCount);
});
