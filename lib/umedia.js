'use strict';
const stampit = require('stampit');
const URI = require('urijs');
const plugin = require('@nihiliad/janus/uri-factory/plugin');

const umedia = stampit()
.methods({
  fields () {
    return {
      author: 'creator',
      title: 'title',
      subject: 'facets[subject_ss][]',
    };
  },

  scopes () {
    return {
      // Contributing organizations listed:
      // https://lib-umedia-prd-01.oit.umn.edu/facets?browse=true&facet_field=contributing_organization_name_s&facet_limit=400&facet_offset=0&facet_sort=index
      djohnson: 'Donald Clay Johnson',
      hclib: 'Hennepin County Library, James K. Hosmer Special Collections.',
      eichner: 'Joanne B. Eicher',
      tjohnson: 'Timothy J. Johnson',
      usgs: 'United States Geological Survey',
      umnext: 'University of Minnesota Extensions.',
      riesenfeld: 'University of Minnesota Law Library, Riesenfeld Rare Books Research Center.',
      ames: 'University of Minnesota Libraries, Ames Library of South Asia.',
      andersen: 'University of Minnesota Libraries, Andersen Horticultural Library.',
      givens: 'University of Minnesota Libraries, Archie Givens, Sr. Collection of African American Literature.',
      umnbus: 'University of Minnesota Libraries, Business Library.',
      babbage: 'University of Minnesota Libraries, Charles Babbage Institute.',
      clrc: 'University of Minnesota Libraries, Children\'s Literature Research Collections.',
      eastasian: 'University of Minnesota Libraries, East Asian Library.',
      ihrca: 'University of Minnesota Libraries, Immigration History Research Center Archives.',
      bell: 'University of Minnesota Libraries, James Ford Bell Library.',
      tretter: 'University of Minnesota Libraries, Jean-Nickolaus Tretter Collection in Gay, Lesbian, Bisexual and Transgender Studies.',
      borchert: 'University of Minnesota Libraries, John R. Borchert Map Library.',
      ymca: 'University of Minnesota Libraries, Kautz Family YMCA Archives.',
      magrath: 'University of Minnesota Libraries, Magrath Library.',
      music: 'University of Minnesota Libraries, Music Library.',
      umja: 'University of Minnesota Libraries, Nathan and Theresa Berman Upper Midwest Jewish Archives.',
      naa: 'University of Minnesota Libraries, Northwest Architectural Archives.',
      wangensteen: 'University of Minnesota Libraries, Owen H. Wangensteen Historical Library of Biology and Medicine.',
      paa: 'University of Minnesota Libraries, Performing Arts Archives.',
      rare: 'University of Minnesota Libraries, Rare Books and Special Collections.',
      swha: 'University of Minnesota Libraries, Social Welfare History Archives.',
      scrbm: 'University of Minnesota Libraries, Special Collections and Rare Books.',
      uarch: 'University of Minnesota Libraries, University Archives.',
      mss: 'University of Minnesota Libraries, Upper Midwest Literary Archives.',
      wilson: 'University of Minnesota Libraries, Wilson Library.',
      lms: 'University of Minnesota Libraries. Library Media Services.',
      upress: 'University of Minnesota Press Test Division.',
      bell: 'University of Minnesota, Bell Museum.',
      chgs: 'University of Minnesota, Center for Holocaust and Genocide Studies.',
      umnais: 'University of Minnesota, Department of American Indian Studies.',
      umnpsych: 'University of Minnesota, Department of Psychology.',
      hrc: 'University of Minnesota, Horticultural Research Center.',
      advanced: 'University of Minnesota, Institute for Advanced Study.',
      umnima: 'University of Minnesota, Institute for Mathematics and its Applications.',
      agex: 'University of Minnesota, Minnesota Agricultural Experiment Station.',
      misa: 'University of Minnesota, Minnesota Institute for Sustainable Agriculture (MISA).',
      physics: 'University of Minnesota, School of Physics and Astronomy.',
      pubhealth: 'University of Minnesota, School of Public Health.',
    };
  },

  baseUri () {
    return URI({
      protocol: 'https',
      hostname: 'umedia.lib.umn.edu',
    }).segmentCoded([
      'search',
    ]);
  },

  uriFor (search, scope, field) {
    // Without a search expression, UMedia's "Expert search" will
    // display error messages, so we just don't bother with any of
    // the other arguments:
    if (!search) {
      return [
        this.emptySearchWarning,
        this.emptySearchUri(),
      ];
    }

    const uri = this.baseUri();
    const queryParams = {};
    const warnings = [];

    // Note: All of these "if ()" tests would fail if "0" were a valid
    // value for any of these fields, but "0" is not a valid value,
    // so we should be OK.

    if (search) {
      if (field) {
        const fields = this.fields();
        // search with a field becomes the field param
        if (field in fields) {
          queryParams[fields[field]] = search;
        } else {
          warnings.push('Unrecognized field: "' + field + '"');
        }
      } else {
        // All other searches become a q= full text search
        queryParams['q'] = search;
      }
    }

    if (scope) {
      const scopes = this.scopes();
      // Scope is translated to facets[contributing_organization_name_s][]=
      if (scope in scopes) {
        queryParams['facets[contributing_organization_name_s][]'] = scopes[scope];
      } else {
        warnings.push('Unrecognized scope: "' + scope + '"');
      }
    }

    return [
      warnings.join(' '),
      uri.addQuery(queryParams),
    ];
  },
});

module.exports = plugin.compose(umedia);
