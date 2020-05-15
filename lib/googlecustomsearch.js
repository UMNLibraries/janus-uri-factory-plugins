'use strict'
const stampit = require('stampit')
const URI = require('urijs')
const plugin = require('@nihiliad/janus/uri-factory/plugin')

const googlecustomsearch = stampit({
  props: {
    defaultScope: 'www',
    scope: null
  }
})
  .methods({
    fields () { return {} },
    scopes () {
      return {
        www: 'www.lib.umn.edu',
        hsl: 'hsl.lib.umn.edu',
        // wangensteen effectively aliases hsl
        wangensteen: 'hsl.lib.umn.edu'
      }
    },
    baseUri () {
      return URI({
        protocol: 'https',
        hostname: (() => {
          return this.scopes()[this.scope || this.defaultScope]
        })()
      }).segmentCoded([
        'search'
      ]).query({
      // no base query params needed
      })
    },
    uriFor (search, scope, field) {
      const warnings = []

      if (!search) {
        return [
          this.emptySearchWarning,
          this.emptySearchUri()
        ]
      }
      this.scope = scope || this.defaultScope
      if (!(scope in this.scopes())) {
        warnings.push('Unrecognized scope: "' + scope + '", using www')
        this.scope = this.defaultScope
      }
      return [
        '',
        this.baseUri().addQuery({ query: search })
      ]
    }
  })

module.exports = plugin.compose(googlecustomsearch)
