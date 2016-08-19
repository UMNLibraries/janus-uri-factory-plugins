'use strict';
const stampit = require('stampit');
const URI = require('urijs');
const plugin = require('@nihiliad/janus/uri-factory/plugin');

const umedia = stampit()
.methods({
  fields () {
    return {
      author: 'creators',
      title: 'title',
      subject: 'subjects',
    };
  },

  scopes () {
    return {
      '2': 'Bell (James Ford Bell Library of Natural History)',
      '3': 'CBI (Charles Babbage Institute)',
      '18': 'CCR-SCRB (Carlson Company Records)',
      '4': 'CLRC (Children\'s Literature Research Collections)',
      '5': 'Givens (Givens Collection of African American Literature)',
      '6': 'IHRCA (Immigration History Research Center Archives)',
      '8': 'NAA (Northwest Architectural Archives)',
      '9': 'PAA (Performing Arts Archives)',
      '12': 'SCRB (Special Collections and Rare Books)',
      '11': 'SWHA (Social Welfare History Archives)',
      '20': 'Training (Training Repository)',
      '13': 'Tretter (Jean-Nickolaus Tretter Collection in GLBT Studies)',
      '14': 'UA (University Archives)',
      '15': 'UMJA (Upper Midwest Jewish Archives)',
      '16': 'UMLA (Upper Midwest Literary Archives)',
      '19': 'WHL (Wangensteen Historical Library of Biology and Medicine)',
      '7': 'YMCA (Krautz Family YMCA Archives)',
    };
  },

  baseUri () {
    return URI({
      protocol: 'http',
      hostname: 'archives.lib.umn.edu',
    });
  },

  uriFor (search, scope, field) {
    const warnings = [];

    let badScope = false;
    if (scope && !(scope in this.scopes())) {
      badScope = true;
      warnings.push('Unrecognized scope: "' + scope + '"');
    }

    if (!search) {
      warnings.push(this.emptySearchWarning);
      // Since field modifies search, it's useless if search is missing, so
      // we just ignore it for all these cases.

      if (scope && !badScope) {
        // Redirect to the browsing UI for the repository indicated by the scope:
        return [
          warnings.join(' '),
          this.baseUri.segmentCoded(['repositories', scope]),
        ];
      }

      // Since scope is either empty or invalid, we just ignore it, except for any warnings.
      return [
        warnings.join(' '),
        this.emptySearchUri(),
      ];
    }

    const queryParams = {};
    const uri = this.baseUri();

    let badField = false;
    if (field && !(field in this.fields())) {
      badField = true;
      warnings.push('Unrecognized field: "' + field + '"');
    }

    if (field && !badField) {
      uri.segmentCoded(['advanced_search']);
      queryParams['v0'] = search;
      queryParams['f0'] = this.fields()[field];
    } else {
      // Ignore the field if it's missing or invalid, which implies a non-advance search.
      // ArchiveSpace uses a different path and different query params for non-advanced searches:
      uri.segmentCoded(['search']);
      queryParams['q'] = search;
    }

    if (scope && !badScope) {
      // Example:
      // http://archives.lib.umn.edu/search?filter_term%5B%5D=%7B%22repository%22%3A%22%2Frepositories%2F4%22%7D
      // http://archives.lib.umn.edu/search?filter_term[]={"repository":"/repositories/4"}
      queryParams['filter_term[]'] = '{"repository":"/repositories/' + scope + '"}';
    }

    return [
      warnings.join(' '),
      uri.addQuery(queryParams),
    ];
  },
});

module.exports = plugin.compose(umedia);
