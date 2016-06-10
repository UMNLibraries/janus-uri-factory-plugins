'use strict';
const stampit = require('stampit');
const URI = require('urijs');
const plugin = require('@nihiliad/janus/uri-factory/plugin');

const conservancy = stampit()
.methods({
  baseUri () {
    return URI({
      protocol: 'https',
      hostname: 'conservancy.umn.edu',
    }).segmentCoded([
      'discover',
    ]);
  },

  emptySearchUri () {
    return this.baseUri().path('');
  },

  fields () {
    // There are other fields we could support for the UDC, but we agreed
    // to limit the simpleSearch API to these three fields.
    return {
      author: 'author',
      title: 'title',
      subject: 'subject',
    };
  },
  // Unlike some other targets, which define a short, rarely-changing list of
  // scopes, the UDC maps each collection to a scope. Because new collections
  // may be added at any time, it doesn't make sense to validate against a fixed
  // list.
  scopes () {},

  uriFor (search, scope, field) {
    if (!search) {
      return [
        this.emptySearchWarning,
        this.emptySearchUri(),
      ];
    }

    const uri = this.baseUri();
    const queryParams = {query: search};
    const warnings = [];

    // UDC scopes can be either a single slash (/), for all or the UDC, or
    // id/collectionId, where id and collectionId are both integers. id always seems
    // to be 1129, and the following scope construction depends on that being true.
    // We require users to pass in only the collectionId. A list can be found at:
    // https://conservancy.umn.edu/community-list
    // The URLs listed there are all of the form: https://conservancy.umn.edu/handle/11299/collectionId
    // Examples:
    // '/': 'All of the UDC'
    // '11299/1': 'University of Minnesota - Twin Cities'
    // '11299/169792': 'Articles and Scholarly Works'
    // '11299/166578': 'Data Repository for U of M (DRUM)'
    // '11299/165856': 'University Digital Conservancy Inbox for New Users'
    let udcScope = '';
    if (scope) {
      if (scope === '/') {
        udcScope = scope;
      } else if (/^\d+$/.exec(scope)) {
        udcScope = '11299/' + scope;
      } else {
        // warnings.push('Unrecognized scope "' + scope + '". Scope must be an integer greater than 0.');
        warnings.push('Unrecognized scope: "' + scope + '"');
      }
      if (udcScope) {
        queryParams['scope'] = udcScope;
      }
    }

    let udcField = '';
    if (field) {
      const fields = this.fields();
      if (field in fields) {
        udcField = fields[field];
        // Not sure what the '_1' means at the end of all these 'filter*' param
        // names. Sometimes the UDC sets it to other integers, like 0, but 1
        // always seems to work for our purposes.
        queryParams['filtertype_1'] = udcField;
        queryParams['filter_relational_operator_1'] = 'contains';
        queryParams['filter_1'] = search;
      } else {
        warnings.push('Unrecognized field: "' + field + '"');
      }
    }

    return [
      warnings.join(' '),
      uri.addQuery(queryParams),
    ];
  },
});

module.exports = plugin.compose(conservancy);
