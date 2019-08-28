'use strict';
const test = require('tape');
// const cheerio = require('cheerio');
const plugin = require('../').primo();
const tester = require('@nihiliad/janus/uri-factory/plugin-tester')({runIntegrationTests: false});
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

test('primo baseUri()', function (t) {
  tester.baseUri(t, plugin, 'https://primo.lib.umn.edu/primo-explore/search?institution=TWINCITIES&vid=TWINCITIES&dum=true&highlight=true&lang=en_US');
});

test('primo emptySearchUri()', function (t) {
  tester.emptySearchUri(t, plugin, 'https://primo.lib.umn.edu/primo-explore/search?institution=TWINCITIES&vid=TWINCITIES&dum=true&highlight=true&lang=en_US');
});

test('primo uriFor() missing "search" arguments', function (t) {
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
      scope: 'bio_med',
      field: null,
    },
    'both "scope" and "field" arguments have truthy values': {
      search: 0,
      scope: 'plant_pathology',
      field: 'title',
    },
    '"scope", "field", and "format" arguments have truthy values': {
      search: 0,
      scope: 'plant_pathology',
      field: 'title',
      format: 'books'
    },
  };
  tester.missingSearchArgs(t, plugin, testCases);
});

test('primo invalid field args', function (t) {
  tester.invalidFieldArgs(t, plugin, 'https://primo.lib.umn.edu/primo-explore/search?institution=TWINCITIES&vid=TWINCITIES&dum=true&highlight=true&lang=en_US&search_scope=mncat_discovery&query=any%2Ccontains%2Cdarwin');
});

test('primo invalid scope args', function (t) {
  tester.invalidScopeArgs(t, plugin, 'https://primo.lib.umn.edu/primo-explore/search?institution=TWINCITIES&vid=TWINCITIES&dum=true&highlight=true&lang=en_US&search_scope=mncat_discovery&query=any%2Ccontains%2Cdarwin');
});

test('primo uriFor() valid "search" arguments', function (t) {
  // testCases map expectedUrl to uriFor arguments
  const testCases = {
    'https://primo.lib.umn.edu/primo-explore/search?institution=TWINCITIES&vid=TWINCITIES&dum=true&highlight=true&lang=en_US&search_scope=mncat_discovery&query=any%2Ccontains%2Cdarwin': {
      search: 'darwin',
      scope: null,
      field: null,
    },
    'https://primo.lib.umn.edu/primo-explore/search?institution=TWINCITIES&vid=TWINCITIES&dum=true&highlight=true&lang=en_US&search_scope=mncat_discovery&query=sub%2Ccontains%2Cdarwin': {
      search: 'darwin',
      scope: null,
      field: 'subject',
    },
    'https://primo.lib.umn.edu/primo-explore/search?institution=TWINCITIES&vid=TWINCITIES&dum=true&highlight=true&lang=en_US&search_scope=wilson_rare&query=any%2Ccontains%2Cfrancis+scott+fitzgerald': {
      search: 'francis scott fitzgerald',
      scope: 'wilson_rare',
      field: null,
    },
    'https://primo.lib.umn.edu/primo-explore/search?institution=TWINCITIES&vid=TWINCITIES&dum=true&highlight=true&lang=en_US&search_scope=givens&query=title%2Ccontains%2Cinvisible+man': {
      search: 'invisible man',
      scope: 'givens',
      field: 'title',
    },
    'https://primo.lib.umn.edu/primo-explore/search?institution=TWINCITIES&vid=TWINCITIES&dum=true&highlight=true&lang=en_US&search_scope=givens&query=title%2Ccontains%2Cinvisible+man&facet=rtype%2Cexact%2Cbooks': {
      search: 'invisible man',
      scope: 'givens',
      field: 'title',
      format: 'books',
    },
    'https://primo.lib.umn.edu/primo-explore/search?institution=TWINCITIES&vid=TWINCITIES&dum=true&highlight=true&lang=en_US&search_scope=mncat_discovery&query=any%2Ccontains%2Cdarwin&facet=rtype%2Cexact%2Caudio': {
      search: 'darwin',
      scope: null,
      field: null,
      format: 'audio',
    },
  };

  function getResultCount (html) {
    // const $ = cheerio.load(html);
    const dom = new JSDOM(
      html,
      {
        url: 'https://primo.lib.umn.edu',
        resources: 'usable',
        runScripts: 'dangerously',
      }
    );
    const $ = require('jquery')(dom.window);

    const ems = $('#mainResults div[class~="results-title"] span[class~="results-count"]');

    // const count = parseInt($(ems[0]).text().trim().replace(/[",\s]/g, ''));
    // const count = $(ems[0]).text().trim().replace(/,/g, '');
    const count = $(ems[0]).text();
    console.log('count = ' + count);
    return count;
  }

  tester.validSearchArgs(t, plugin, testCases, getResultCount);
});
