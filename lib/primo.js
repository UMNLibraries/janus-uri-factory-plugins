'use strict'
const stampit = require('stampit')
const URI = require('urijs')
const plugin = require('@nihiliad/janus/uri-factory/plugin')

// Much of this is based on the document 'Linking to Primo':
// https://docs.google.com/a/umn.edu/document/d/1MufWU9IEJVGM1zrOPaIWhP0nrgvMcYteJCU57fHp_7k/edit?usp=sharing

const primo = stampit()
  .methods({
  // TODO: Not sure that this simple mapping makes sense for this class, for Primo URLs.
    fields () {
      return {
        author: 'creator',
        title: 'title',
        subject: 'sub'
      }
    },

    scopes () {
      return {
        ames: 'Ames Library of South Asia',
        andersen: 'Andersen Library',
        andersen_horticultural: 'Andersen Horticultural Library (Chanhassen)',
        andersen_rare: 'Andersen Rare Books',
        architecture: 'Architecture and Landscape Architecture Library',
        asc: 'Archives and Special Collections',
        babbage: 'Charles Babbage Institute Collection',
        bell: 'James Ford Bell Library',
        berman: 'Berman Upper Midwest Jewish Archives',
        bio_med: 'Bio-Medical Library',
        children: 'Children\'s Literature Research Collection',
        default_scope: 'Twin Cities Catalog',
        east_asian: 'East Asian Library',
        givens: 'Givens Collection of African American Literature',
        immigration: 'Immigration History Research Center',
        journalism: 'Journalism Library',
        lake_itasca: 'Lake Itasca Biological Station',
        law: 'Law Library',
        law_rare: 'Law Library Rare Books',
        magrath: 'Magrath Library',
        math: 'Mathematics Library',
        mlac: 'Minnesota Library Access Center (MLAC)',
        // mncat_discovery may eventually get aliased to a debranded scope
        // but remains the active default in fall 2019
        mncat_discovery: 'Libraries Search',
        music: 'Music Library',
        natural_resources: 'Natural Resources Library',
        northwest_architecture: 'Northwest Architecture Archives',
        performing_arts: 'Performing Arts Archives',
        plant_pathology: 'Plant Pathology Library',
        sherlock: 'Sherlock Holmes Collection',
        social_welfare: 'Social Welfare History Archives',
        tretter: 'Tretter GLBT Collection',
        university_archives: 'University Archives',
        upper_midwest_lit: 'Upper Midwest Literary Archives',
        veterinary_medical: 'Veterinary Medical Library',
        walter: 'Walter Science and Engineering Library',
        walter_smart: 'Walter SMART Learning Commons',
        wangensteen: 'Wangensteen Historical Library of Biology & Medicine',
        wilson: 'Wilson Library',
        wilson_map: 'John R. Borchert Map Library',
        wilson_rare: 'Wilson Library Rare Books',
        ymca: 'YMCA Archives'
      }
    },

    formats () {
      return {
        archive: 'Archival/MSS Mtls and Archival Material/Manuscripts',
        audios: 'Audio',
        books: 'Books',
        journals: 'Journals',
        maps: 'Maps',
        scores: 'Scores',
        videos: 'Videos'
      }
    },

    baseUri () {
      return URI({
        protocol: 'https',
        hostname: 'primo.lib.umn.edu'
      }).segmentCoded([
        'primo-explore',
        'search'
      ]).query({
        institution: 'TWINCITIES',
        vid: 'TWINCITIES',
        dum: 'true',
        highlight: 'true',
        lang: 'en_US'
      })
    },

    // Convenience method for a search with a missing search expression. In order to avoid
    // presenting errors to the user, we need to use a different URL. Though the documentation
    // advocates using /primo_library/libweb/action/search.do?vid=TWINCITIES, the extra, default
    // parameters don't seem to hurt, so we keep them just to make things simpler.
    emptySearchUri () {
      return this.baseUri()
    },

    uriFor (search, scope, field, format) {
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

      let primoScope
      if (scope) {
        if (scope in this.scopes()) {
          primoScope = scope
        } else {
          warnings.push('Unrecognized scope: "' + scope + '"')
        }
      }
      queryParams.search_scope = primoScope || 'mncat_discovery'

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

      if (format) {
        const formats = this.formats()
        if (format in formats) {
          // Facet is excluded from the query if not supplied, rather than a default
          if (format === 'archive') {
            queryParams.mfacet = ['rtype,include,archive,1', 'rtype,include,archival_material_manuscripts,1']
          } else {
            queryParams.facet = 'rtype,include,' + format
          }
        } else {
          warnings.push('Unrecognized format: "' + format + '"')
        }
      }

      return [
        warnings.join(' '),
        uri.addQuery(queryParams)
      ]
    }
  })

module.exports = plugin.compose(primo)
