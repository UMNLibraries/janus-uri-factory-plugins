'use strict';
const stampit = require('stampit');
const URI = require('urijs');
const plugin = require('janus/uri-factory/plugin');

const findingaids = stampit()
.methods({
  baseUri() {
    return URI({
      protocol: 'http',
      hostname: 'discover.lib.umn.edu',
    }).segmentCoded([
      'cgi',
      'f',
      'findaid',
      'findaid-idx',
    ]).query({
      'c': 'umfa',
      'cc': 'umfa',
      'type': 'simple',
    });
  },

  emptySearchUri() {
    return this.baseUri().segmentCoded([
      'u',
      'umfa',
    ]).query('');
  },

  fields() {
    // There are other fields we could support for Finding Aids, but we agreed
    // to limit the simpleSearch API to these three fields.
    return {
      author: 'Names',
      title: 'Collection Title',
      subject: 'Subjects',
    };
  },

  scopes() {
    return {
      cbi: 'Charles Babbage Institute',
      clrc: 'Children\'s Literature Research Collection',
      scrbg: 'Givens Collection of African American Literature',
      ihrc: 'Immigration History Research Center Archives',
      jfb: 'James Ford Bell Library',
      scrbt: 'Jean Nikolaus-Tretter Collection in GLBT Studies',
      ymca: 'Kautz Family YMCA Archives',
      mss: 'Literary Manuscripts Collection',
      naa: 'Northwest Architectural Archives',
      paa: 'Performing Arts Archives',
      swha: 'Social Welfare History Archives',
      speccoll: 'Special Collections and Rare Books',
      uarc: 'University of Minnesota Archives',
      umja: 'Upper Midwest Jewish Archives',
    };
  },

  uriFor(search, scope, field) {
    if (!search) {
      return [
        this.emptySearchWarning,
        this.emptySearchUri(),
      ];
    }

    const uri = this.baseUri();
    const queryParams = {q1: search};
    const warnings = [];

    // Note: All of these "if ()" tests would fail if "0" were a valid
    // value for any of these fields, but "0" is not a valid value,
    // so we should be OK.
    let faScope;
    if (scope) {
      if (scope in this.scopes()) {
        faScope = scope;
        queryParams['r'] = faScope;
      } else {
        warnings.push('Unrecognized scope: "' + scope + '"');
      }
    }

    const fields = this.fields();
    let faField;
    if (field) {
      if (field in fields) {
        faField = fields[field];
      } else {
        warnings.push('Unrecognized field: "' + field + '"');
      }
    }
    queryParams['rgn'] = faField || 'Entire Finding Aid';

    return [
      warnings.join(' '),
      uri.addQuery(queryParams),
    ];
  },
});

module.exports = plugin.compose(findingaids);
