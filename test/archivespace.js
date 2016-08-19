'use strict';
const test = require('tape');
const cheerio = require('cheerio');
const plugin = require('../').archivespace();
const tester = require('@nihiliad/janus/uri-factory/plugin-tester')({runIntegrationTests: false});

test('archivespace baseUri()', function (t) {
  tester.baseUri(t, plugin, 'http://archives.lib.umn.edu');
});

test('archivespace emptySearchUri()', function (t) {
  tester.emptySearchUri(t, plugin, 'http://archives.lib.umn.edu');
});

test('archivespace uriFor() missing "search" arguments', function (t) {
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

test('archivespace plugin uriFor() with no arguments except scope', function (t) {
  const [warning, uri] = plugin.uriFor(false, '5', null);
  const expectedHref = 'http://archives.lib.umn.edu/repositories/5'; // Givens Collection of African American Literature
  t.equal(uri.href(), expectedHref, 'with no arguments except scope we get expected href, to browse the associated repository (' + expectedHref + ')...');
  t.equal(warning, 'Missing or empty search expression.', '...and expected warning returned for a missing search expression');
  t.end();
});

test('archivespace plugin uriFor() with valid scope and field arguments', function (t) {
  const [warning, uri] = plugin.uriFor(0, '3', 'title');
  const expectedHref = 'http://archives.lib.umn.edu/repositories/3'; // Chalres Babbage Institute
  t.equal(uri.href(), expectedHref, 'with valid scope and field arguments we get expected href, to browse the associated repository, ignoring field (' + expectedHref + ')...');
  t.equal(warning, 'Missing or empty search expression.', '...and expected warning returned for a missing search expression');
  t.end();
});

test('archivespace invalid field args', function (t) {
  tester.invalidFieldArgs(t, plugin, 'http://archives.lib.umn.edu/search?q=darwin');
});

test('archivespace invalid scope args', function (t) {
  tester.invalidScopeArgs(t, plugin, 'http://archives.lib.umn.edu/search?q=darwin');
});

test('archivespace uriFor() valid "search" arguments', function (t) {
  // testCases map expectedUrl to uriFor arguments
  const testCases = {
    'http://archives.lib.umn.edu/search?q=darwin': {
      search: 'darwin',
      scope: null,
      field: null,
    },
    'http://archives.lib.umn.edu/advanced_search?advanced=true&v0=darwin&f0=title': {
      search: 'darwin',
      scope: null,
      field: 'title',
    },
    'http://archives.lib.umn.edu/search?q=difference+engine&filter_term%5B%5D=%7B%22repository%22%3A%22%2Frepositories%2F3%22%7D': {
      search: 'difference engine',
      scope: '3', // CBI
      field: null,
    },
    'http://archives.lib.umn.edu/advanced_search?advanced=true&v0=minnesota&f0=title&filter_term%5B%5D=%7B%22repository%22%3A%22%2Frepositories%2F15%22%7D': {
      search: 'minnesota',
      scope: '15', // UMJA
      field: 'title',
    },
  };

  function getResultCount (html) {
    const $ = cheerio.load(html);
    const divs = $('div.search-results > div.pull-left');
    const matches = $(divs[0]).text().trim().match(/of (\d+) Results/);
    const count = matches.pop();
    return count;
  }

  tester.validSearchArgs(t, plugin, testCases, getResultCount);
});
