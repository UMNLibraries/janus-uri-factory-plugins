'use strict';
const stampit = require('stampit');
const URI = require('urijs');
const plugin = require('@nihiliad/janus/uri-factory/plugin');

const googlecustomsearch = stampit()
.methods({
  fields () { return {}; },
  baseUri () {
    return URI({
      protocol: 'https',
      hostname: 'www.lib.umn.edu',
    }).segmentCoded([
      'search',
    ]).query({
      // no base query params needed
    });
  },
  uriFor (search, scope, field) {
    if (!search) {
      return [
        this.emptySearchWarning,
        this.emptySearchUri(),
      ];
    }
    return [
      '',
      this.baseUri().addQuery({query: search}),
    ];
  },
});

module.exports = plugin.compose(googlecustomsearch);
