'use strict'
import stampit from 'stampit';
import URI from 'urijs';
import plugin from 'janus/uri-factory/plugin.js';

const googlesearchappliance = stampit()
  .methods({
    fields () { return {} },

    // Maps scope names to sets of query params:
    scopes () {
      return {
        main: { // main UMN Libraries website
          site: 'tc_libraries',
          proxystylesheet: 'tc_libraries',
          client: 'tc_libraries',
          domains: 'www.lib.umn.edu'
        },
        hsl: { // Health Sciences Libraries website
          site: 'tc_libraries_hsl',
          proxystylesheet: 'tc_libraries_hsl',
          client: 'searchumn_generic'
        }
      }
    },

    baseUri () {
      return URI({
        protocol: 'http',
        hostname: 'google.umn.edu'
      }).segmentCoded([
        'search'
      ]).query({
        output: 'xml_no_dtd'
      })
    },

    uriFor (search, scope, field) {
      const uri = this.baseUri()
      const warnings = []

      let gaScope = 'main' // default
      if (scope) {
        if (scope in this.scopes()) {
          gaScope = scope
        } else {
          warnings.push('Unrecognized scope: "' + scope + '"')
        }
      }
      uri.addQuery(this.scopes()[gaScope])

      if (!search) {
        warnings.push(this.emptySearchWarning)
        return [
          warnings.join(' '),
          uri
        ]
      }

      return [
        warnings.join(' '),
        uri.addQuery({ q: search })
      ]
    }
  })

export default plugin.compose(googlesearchappliance);
