'use strict'
const stampit = require('stampit')
const URI = require('urijs')
const plugin = require('@nihiliad/janus/uri-factory/plugin')

const pubmed = stampit()
  .methods({
    fields () { return {} },
    baseUri () {
      return URI({
        protocol: 'https',
        hostname: 'pubmed.ncbi.nlm.nih.gov'
      }).query({
        otool: 'umnbmlib'
      })
    },
    uriFor (search, scope, field) {
      if (!search) {
        return [
          this.emptySearchWarning,
          this.emptySearchUri()
        ]
      }
      return [
        '',
        this.baseUri().addQuery({ term: search })
      ]
    }
  })

module.exports = plugin.compose(pubmed)
