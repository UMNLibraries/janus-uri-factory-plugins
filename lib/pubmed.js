'use strict'
import stampit from 'stampit';
import URI from 'urijs';
import plugin from 'janus/uri-factory/plugin';

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

export default plugin.compose(pubmed);
