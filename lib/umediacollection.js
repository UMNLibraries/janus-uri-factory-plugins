'use strict';
const stampit = require('stampit');
const URI = require('urijs');
const plugin = require('@nihiliad/janus/uri-factory/plugin');

const umediacollection = stampit()
.methods({
  fields () {
    // UMedia as full text search does not really support
    // searching specific fields, though it does facet them
    // by exact string match, so we have removed field support
    return {};
  },

  scopes () {
    return {};
  },

  baseUri () {
    return URI({
      protocol: 'https',
      hostname: 'umedia.lib.umn.edu',
    }).segmentCoded([
      'search',
    ]);
  },

  uriFor (search, scope, field) {
    // Without a search expression, UMedia requires at least a scope
    if (!search && !scope) {
      return [
        this.emptySearchWarning,
        this.emptySearchUri(),
      ];
    }

    const uri = this.baseUri();
    const queryParams = {};
    const warnings = [];

    // Note: All of these "if ()" tests would fail if "0" were a valid
    // value for any of these fields, but "0" is not a valid value,
    // so we should be OK.

    if (search) {
      // All other searches become a q= full text search
      queryParams['q'] = search;
    }

    if (scope) {
      // Collection scopes are nonempty string values, all begin with
      // a capital but not much else can be known.
      if (scope.match(/^[A-Z]/)) {
        // Scope is translated to facets[collection_name_s][]=
        // but there are far too many to validate a list
        // https://umedia.lib.umn.edu/facets?browse=true&facet_field=collection_name_s&facet_limit=500&facet_sort=index
        queryParams['facets[collection_name_s][]'] = scope;
      } else {
        warnings.push('Unrecognized scope: "' + scope + '"');
      }
    }

    if (field && !(field in this.fields())) {
      warnings.push('Unrecognized field: "' + field + '"');
    }

    return [
      warnings.join(' '),
      uri.addQuery(queryParams),
    ];
  },
});

module.exports = plugin.compose(umediacollection);
