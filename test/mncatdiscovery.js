'use strict';
const test = require('tape');
const cheerio = require('cheerio');
const plugin = require('../').mncatdiscovery();
const tester = require('janus/uri-factory/plugin-tester')({runIntegrationTests: false});

test('mncatdiscovery baseUri()', function (t) {
  tester.baseUri(t, plugin, 'http://primo.lib.umn.edu/primo_library/libweb/action/dlSearch.do?institution=TWINCITIES&vid=TWINCITIES&indx=1&dym=true&highlight=true&lang=eng');
});

test('mncatdiscovery emptySearchUri()', function (t) {
  tester.emptySearchUri(t, plugin, 'http://primo.lib.umn.edu/primo_library/libweb/action/search.do?institution=TWINCITIES&vid=TWINCITIES&indx=1&dym=true&highlight=true&lang=eng');
});

test ('mncatdiscovery uriFor() missing "search" arguments', function (t) {
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
  };
  tester.missingSearchArgs(t, plugin, testCases);
});

test('mncatdiscovery invalid field args', function (t) {
  tester.invalidFieldArgs(t, plugin, 'http://primo.lib.umn.edu/primo_library/libweb/action/dlSearch.do?institution=TWINCITIES&vid=TWINCITIES&indx=1&dym=true&highlight=true&lang=eng&search_scope=mncat_discovery&query=any%2Ccontains%2Cdarwin');
});

test('mncatdiscovery invalid scope args', function (t) {
  tester.invalidScopeArgs(t, plugin, 'http://primo.lib.umn.edu/primo_library/libweb/action/dlSearch.do?institution=TWINCITIES&vid=TWINCITIES&indx=1&dym=true&highlight=true&lang=eng&search_scope=mncat_discovery&query=any%2Ccontains%2Cdarwin');
});

test ('mncatdiscovery uriFor() valid "search" arguments', function (t) {
  // testCases map expectedUrl to uriFor arguments
  const testCases = {
    'http://primo.lib.umn.edu/primo_library/libweb/action/dlSearch.do?institution=TWINCITIES&vid=TWINCITIES&indx=1&dym=true&highlight=true&lang=eng&search_scope=mncat_discovery&query=any%2Ccontains%2Cdarwin': {
      search: 'darwin',
      scope: null,
      field: null,
    },
    'http://primo.lib.umn.edu/primo_library/libweb/action/dlSearch.do?institution=TWINCITIES&vid=TWINCITIES&indx=1&dym=true&highlight=true&lang=eng&search_scope=mncat_discovery&query=sub%2Ccontains%2Cdarwin': {
      search: 'darwin',
      scope: null,
      field: 'subject',
    },
    'http://primo.lib.umn.edu/primo_library/libweb/action/dlSearch.do?institution=TWINCITIES&vid=TWINCITIES&indx=1&dym=true&highlight=true&lang=eng&search_scope=wilson_rare&query=any%2Ccontains%2Cfrancis+scott+fitzgerald': {
      search: 'francis scott fitzgerald',
      scope: 'wilson_rare',
      field: null,
    },
    'http://primo.lib.umn.edu/primo_library/libweb/action/dlSearch.do?institution=TWINCITIES&vid=TWINCITIES&indx=1&dym=true&highlight=true&lang=eng&search_scope=givens&query=title%2Ccontains%2Cinvisible+man': {
      search: 'invisible man',
      scope: 'givens',
      field: 'title',
    },
  };

  function getResultCount(html) {
    const $ = cheerio.load(html);
    const ems = $('#resultsNumbersTile h1 em');
    const count = parseInt( $(ems[0]).text().trim().replace(/,/g,"") );
    return count;
  }

  tester.validSearchArgs(t, plugin, testCases, getResultCount);
});
