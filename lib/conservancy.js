'use strict'
const stampit = require('stampit')
const URI = require('urijs')
const plugin = require('@nihiliad/janus/uri-factory/plugin')

const conservancy = stampit()
  .methods({
    baseUri () {
      return URI({
        protocol: 'https',
        hostname: 'conservancy.umn.edu'
      }).segmentCoded([
        'search'
      ])
    },

    emptySearchUri () {
      return this.baseUri().path('')
    },

    fields () {
    // There are other fields we could support for the UDC, but we agreed
    // to limit the simpleSearch API to these three fields.
      return {
        author: 'author',
        title: 'title',
        subject: 'subject'
      }
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
          this.emptySearchUri()
        ]
      }

      const uri = this.baseUri()
      const queryParams = { query: search }
      const warnings = []

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
      // '4b8b835d-e1aa-4f79-bc86-f031b1d5882f': Beginning DSpace 7, UUID values 8-4-4-4-12 char strings
      let udcScope = ''
      if (scope) {
        if (scope === '/') {
          udcScope = scope
        } else if (/^\d+$/.exec(scope)) {
          udcScope = '11299/' + scope
        } else if (/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.exec(scope)) {
          udcScope = scope
        } else {
        // warnings.push('Unrecognized scope "' + scope + '". Scope must be an integer greater than 0.');
          warnings.push('Unrecognized scope: "' + scope + '"')
        }
        if (udcScope) {
          queryParams.scope = udcScope
        }
      }

      let udcField = ''
      if (field) {
        const fields = this.fields()
        if (field in fields) {
          udcField = fields[field]
          // Filter query in DSpace 7.x takes the form &f.fieldname=searchstring,operator
          // e.g. &f.title=darwin,contains
          queryParams['f.' + udcField] = search + ',contains'
        } else {
          warnings.push('Unrecognized field: "' + field + '"')
        }
      }

      return [
        warnings.join(' '),
        uri.addQuery(queryParams)
      ]
    }
  })

module.exports = plugin.compose(conservancy)
