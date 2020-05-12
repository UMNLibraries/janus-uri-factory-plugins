'use strict';
const test = require('tape');
const cheerio = require('cheerio');
const plugin = require('../').pubmed();
const tester = require('@nihiliad/janus/uri-factory/plugin-tester')({runIntegrationTests: false});

test('pubmed plugin default scopes', function (t) {
  t.deepEqual(plugin.scopes(), {}, 'scopes() correctly returns the default empty object');
  t.end();
});

test('pubmed plugin fields override', function (t) {
  t.deepEqual(plugin.fields(), {}, 'fields correctly overridden with an empty object');
  t.end();
});

test('pubmed plugin baseUri()', function (t) {
  tester.baseUri(t, plugin, 'https://pubmed.ncbi.nlm.nih.gov?otool=umnbmlib');
});

test('pubmed plugin emptySearchUri()', function (t) {
  tester.emptySearchUri(t, plugin, 'https://pubmed.ncbi.nlm.nih.gov?otool=umnbmlib');
});

test('pubmed plugin uriFor() missing "search" arguments', function (t) {
  // testCases map state descriptions to uriFor() arguments
  const testCases = {
    'all arguments are null': {
      search: null,
      scope: null,
      field: null,
    },
  };
  tester.missingSearchArgs(t, plugin, testCases);
});

test('pubmed plugin uriFor() valid "search" arguments', function (t) {
  // testCases map expected uri to uriFor() arguments
  const testCases = {
    'https://pubmed.ncbi.nlm.nih.gov?otool=umnbmlib&term=neoplasm': {
      search: 'neoplasm',
      scope: null,
      field: null,
    },
  };

  function getResultCount (html) {
    const $ = cheerio.load(html);
    const elems = $('div[class=results-amount]').first().find('span[class=value]');
    const matches = $(elems[0]).text().trim().replace(/,/g, '').match(/(\d+)/);
    const count = matches.pop();
    return count;
  };

  tester.validSearchArgs(t, plugin, testCases, getResultCount);
});
