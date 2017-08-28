'use strict';
const stampit = require('stampit');
const URI = require('urijs');
const plugin = require('@nihiliad/janus/uri-factory/plugin');

const archivespace = stampit()
.methods({
  fields () {
    return {
      author: 'creators_text',
      title: 'title',
      // TODO: Is this even valid?
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
          this.baseUri().segmentCoded(['repositories', scope]),
        ];
      }

      // Since scope is either empty or invalid, we just ignore it, except for any warnings.
      return [
        warnings.join(' '),
        this.emptySearchUri(),
      ];
    }

    const uri = this.baseUri().segmentCoded(['search']);
    const queryParams = {
      'op[]': '',
      'q[]': search,
    };

    let badField = false;
    if (field && !(field in this.fields())) {
      badField = true;
      warnings.push('Unrecognized field: "' + field + '"');
    }

    if (field && !badField) {
      queryParams['field[]'] = this.fields()[field];
    }

    if (scope && !badScope) {
      queryParams['filter_fields[]'] = 'repository';
      queryParams['filter_values[]'] = '/repositories/' + scope;
    }

    return [
      warnings.join(' '),
      uri.addQuery(queryParams),
    ];
  },
});

module.exports = plugin.compose(archivespace);
