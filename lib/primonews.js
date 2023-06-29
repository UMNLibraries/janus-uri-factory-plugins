'use strict'
const stampit = require('stampit')
const URI = require('urijs')
const plugin = require('@nihiliad/janus/uri-factory/plugin')

// this is based on the original primo plugin, with modifications for search endpoint
// and the removal of query parameters that aren't used in the primo newspaper search.

const primonews = stampit()
  .methods({
  // TODO: Not sure that this simple mapping makes sense for this class, for Primo URLs.
    fields () {
      return {
        author: 'creator',
        title: 'title',
        subject: 'sub'
      }
    },

    baseUri () {
      return URI({
        protocol: 'https',
        hostname: 'primo.lib.umn.edu'
      }).segmentCoded([
        'discovery',
        'npsearch'
      ]).query({
        vid: '01UMN_INST:TWINCITIES',
        lang: 'en',
        offset: '0'
      })
    },

    // Convenience method for a search with a missing search expression. In order to avoid
    // presenting errors to the user, we need to use a different URL. Though the documentation
    // advocates using /primo_library/libweb/action/search.do?vid=TWINCITIES, the extra, default
    // parameters don't seem to hurt, so we keep them just to make things simpler.
    emptySearchUri () {
      return this.baseUri()
    },

    uriFor (search, scope, field) {
      if (!search) {
        return [
          this.emptySearchWarning,
          this.emptySearchUri()
        ]
      }

      const uri = this.baseUri()
      const queryParams = {}
      const warnings = []

      // Note: All of these "if ()" tests would fail if "0" were a valid
      // value for any of these fields, but "0" is not a valid value,
      // so we should be OK.

      let primoField
      if (field) {
        const fields = this.fields()
        if (field in fields) {
          primoField = fields[field]
        } else {
          warnings.push('Unrecognized field: "' + field + '"')
        }
      }
      queryParams.query = (primoField || 'any') + ',contains,' + search

      return [
        warnings.join(' '),
        uri.addQuery(queryParams)
      ]
    }
  })

module.exports = plugin.compose(primonews)
