'use strict';
const stampit = require('stampit');
const URI = require('urijs');
const plugin = require('@nihiliad/janus/uri-factory/plugin');

const pubmed = stampit()
.methods({
  fields () { return {}; },
  baseUri () {
    return URI({
      protocol: 'https',
      //hostname: 'www.ncbi.nlm.nih.gov',
      hostname: 'pubmed.ncbi.nlm.nih.gov',
    /*
    }).segmentCoded([
      'sites',
      'entrez',
    ]).query({
    */
    }).query({
      //'db': 'pubmed',
      'otool': 'umnbmlib',
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
      this.baseUri().addQuery({term: search}),
    ];
  },
});

module.exports = plugin.compose(pubmed);
