'use strict';
const test = require('tape');
const cheerio = require('cheerio');
const plugin = require('../').googlesearchappliance();
const tester = require('@nihiliad/janus/uri-factory/plugin-tester')({runIntegrationTests: false});

test('googlesearchappliance plugin fields override', function (t) {
  t.deepEqual(plugin.fields(), {}, 'fields correctly overridden with an empty object');
  t.end();
});

test('googlesearchappliance plugin baseUri()', function (t) {
  tester.baseUri(t, plugin, 'http://google.umn.edu/search?output=xml_no_dtd');
});

test('googlesearchappliance plugin emptySearchUri()', function (t) {
  // This function is actually not very useful for this plugin, because we need a scope even for the empty search uri.
  tester.emptySearchUri(t, plugin, 'http://google.umn.edu/search?output=xml_no_dtd');
});

test('googlesearchappliance plugin uriFor() with no arguments', function (t) {
  const [warning, uri] = plugin.uriFor();
  const expectedHref = 'http://google.umn.edu/search?output=xml_no_dtd&site=tc_libraries&proxystylesheet=tc_libraries&client=tc_libraries&domains=www.lib.umn.edu';
  t.equal(uri.href(), expectedHref, 'with no arguments we get expected href, using the main site scope (' + expectedHref + ')...');
  t.equal(warning, 'Missing or empty search expression.', '...and expected warning returned for a missing search expression');
  t.end();
});

test('googlesearchappliance plugin uriFor() valid "search" & "scope" arguments', function (t) {
  // testCases map expected uri to uriFor() arguments
  const testCases = {
    'http://google.umn.edu/search?output=xml_no_dtd&site=tc_libraries&proxystylesheet=tc_libraries&client=tc_libraries&domains=www.lib.umn.edu&q=darwin': {
      search: 'darwin',
      scope: 'main',
      field: null,
    },
    'http://google.umn.edu/search?output=xml_no_dtd&site=tc_libraries_hsl&proxystylesheet=tc_libraries_hsl&client=searchumn_generic&q=medicine': {
      search: 'medicine',
      scope: 'hsl',
      field: null,
    },
  };

  function getResultCount (html) {
    const $ = cheerio.load(html);

    // This is a janky selector, but the Google Search Appliance gives us no
    // better way to parse its HTML output.
    const resultString = $('td[nowrap="1"][align="right"][bgcolor="#eee"]:contains(Results)').text();

    return resultString.trim().match(/of about (\d+)/).pop();
  };

  tester.validSearchArgs(t, plugin, testCases, getResultCount);
});
