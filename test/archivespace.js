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
    'only "scope" argument has a truthy value': {
      search: false,
      scope: '3', // (CBI) Charles Babbage Institute
      field: null,
    },
    'both "scope" and "field" arguments have truthy values': {
      search: 0,
      scope: '3',
      field: 'title',
    },
  };
  tester.missingSearchArgs(t, plugin, testCases);
});

/*
test('archivespace invalid field args', function (t) {
  tester.invalidFieldArgs(t, plugin, 'http://discover.lib.umn.edu/cgi/f/findaid/findaid-idx?c=umfa&cc=umfa&type=simple&q1=darwin&rgn=Entire+Finding+Aid');
});

test('archivespace invalid scope args', function (t) {
  tester.invalidScopeArgs(t, plugin, 'http://discover.lib.umn.edu/cgi/f/findaid/findaid-idx?c=umfa&cc=umfa&type=simple&q1=darwin&rgn=Entire+Finding+Aid');
});

test('archivespace uriFor() valid "search" arguments', function (t) {
  // testCases map expectedUrl to uriFor arguments
  const testCases = {
    'http://discover.lib.umn.edu/cgi/f/findaid/findaid-idx?c=umfa&cc=umfa&type=simple&q1=darwin&rgn=Entire+Finding+Aid': {
      search: 'darwin',
      scope: null,
      field: null,
    },
    'http://discover.lib.umn.edu/cgi/f/findaid/findaid-idx?c=umfa&cc=umfa&type=simple&q1=darwin&rgn=Subjects': {
      search: 'darwin',
      scope: null,
      field: 'subject',
    },
    'http://discover.lib.umn.edu/cgi/f/findaid/findaid-idx?c=umfa&cc=umfa&type=simple&q1=difference+engine&r=cbi&rgn=Entire+Finding+Aid': {
      search: 'difference engine',
      scope: 'cbi',
      field: null,
    },
    'http://discover.lib.umn.edu/cgi/f/findaid/findaid-idx?c=umfa&cc=umfa&type=simple&q1=minnesota&r=umja&rgn=Collection+Title': {
      search: 'minnesota',
      scope: 'umja',
      field: 'title',
    },
  };

  function getResultCount (html) {
    const $ = cheerio.load(html);
    const divs = $('div#slicehdr div.resultsheader');
    const matches = $(divs[0]).text().trim().match(/(\d+) record/);
    const count = matches.pop();
    return count;
  }

  tester.validSearchArgs(t, plugin, testCases, getResultCount);
});
*/
