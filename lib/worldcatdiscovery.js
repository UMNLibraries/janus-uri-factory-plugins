'use strict'
const stampit = require('stampit')
const URI = require('urijs')
const plugin = require('@nihiliad/janus/uri-factory/plugin')

const worldcatdiscovery = stampit()
  .methods({
    fields () {
      return {
        author: 'au',
        title: 'ti',
        subject: 'kw'
      }
    },

    baseUri () {
      return URI({
        protocol: 'https',
        hostname: 'universityofminnesota-minneapolis.on.worldcat.org', // search
        // Additional path is added as novel approach to aid in passing unit tests. Discovery searches are not simply appended to home uri. Home uri is separate path
        path: '/discovery' 
      })
    },

    emptySearchUri () {
      return this.baseUri().path('/discovery')
    },

    uriFor (search, scope, field) {
      if (!search) {
        return [
          this.emptySearchWarning,
          this.emptySearchUri()
        ]
      }

      const warnings = []
      if (field) {
        if (!(field in this.fields())) {
          warnings.push('Unrecognized field: "' + field + '"')
        } else {
          search = this.fields()[field] + ':' + search
        }
      }

      // Takes the base uri and drops it back to the base path
      const uri = this.baseUri().path('/')

      const segments = ['search']
      const queryParams = {
        queryString: search
      }

      return [
        warnings.join(' '),
        uri.segmentCoded(segments).addQuery(queryParams)
      ]
    }
  })

module.exports = plugin.compose(worldcatdiscovery)
