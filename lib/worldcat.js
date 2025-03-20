'use strict'
import stampit from 'stampit';
import URI from 'urijs';
import plugin from 'janus/uri-factory/plugin';

const worldcat = stampit()
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
        hostname: 'www.worldcat.org' // search
      })
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

      const uri = this.baseUri()
      const segments = ['search']
      const queryParams = {
        q: search
      }

      return [
        warnings.join(' '),
        uri.segmentCoded(segments).addQuery(queryParams)
      ]
    }
  })

export default plugin.compose(worldcat);
