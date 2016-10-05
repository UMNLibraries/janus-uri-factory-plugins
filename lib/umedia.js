'use strict';
const stampit = require('stampit');
const URI = require('urijs');
const plugin = require('@nihiliad/janus/uri-factory/plugin');

const umedia = stampit()
.methods({
  fields () {
    return {
      author: 'creator',
      title: 'titles',
      subject: 'subject',
    };
  },

  scopes () {
    return {
      '0': 'Search all collections...',
      '3588': 'Ames Library of South Asia',
      '88869': 'Andersen Horticultural Library',
      '4760': 'Bell Museum of Natural History',
      '69341': 'Botanical Images',
      '88870': 'Business Library',
      '781': 'Charles Babbage Institute',
      '88871': 'Children\'s Literature Research Collections',
      '271097': 'Department of American Indian Studies',
      '69340': 'East Asian Library',
      '68641': 'Entomology, Fisheries and Wildlife Library',
      '69342': 'First Flights',
      '5299': 'Givens Collection of African American Literature',
      '700489': 'Humphrey School of Public Affairs',
      '5494': 'Immigration History Research Center Archives',
      '700472': 'Institute for Advanced Study',
      '88351': 'James Ford Bell Library',
      '88868': 'Jean-Nickolaus Tretter Collection in GLBT Studies',
      '69339': 'John R. Borchert Map Library',
      '21602': 'Kautz Family YMCA Archives',
      '11644': 'Learning Resources Center',
      '88967': 'Literary Manuscripts Collections',
      '88872': 'Magrath Library',
      '1229': 'Minnesota Agricultural Experiment Station',
      '88873': 'Minnesota Geological Survey',
      '88874': 'Music Library',
      '752030': 'Nathan and Theresa Berman Upper Midwest Jewish Archives',
      '11943': 'Northwest Architectural Archives',
      '13949': 'Performing Arts Archives',
      '895347': 'Polar Geospatial Center',
      '11433': 'School of Journalism and Mass Communication',
      '271239': 'School of Public Health',
      '100': 'Social Welfare History Archives',
      '88856': 'Special Collections and Rare Books',
      '15575': 'University of Minnesota Archives',
      '5040': 'University of Minnesota Extension Service',
      '271243': 'University of Minnesota Law Library',
      '88875': 'Wangensteen Historical Library of Biology and Medicine',
      '22163': 'War Posters and Postcards',
      '88876': 'Wilson Library',
    };
  },

  baseUri () {
    return URI({
      protocol: 'https',
      hostname: 'umedia.lib.umn.edu',
    }).segmentCoded([
      'dasearch',
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

    let umediaScope;
    if (scope) {
      if (scope in this.scopes()) {
        // 'og' below probably means Drupal 'organic group', and 'gid' that group's ID.
        // This is how UMedia implements collections.
        umediaScope = 'im_og_gid:' + scope;
      } else {
        warnings.push('Unrecognized scope: "' + scope + '"');
      }
    }

    let umediaField;
    if (field) {
      const fields = this.fields();
      if (field in fields) {
        umediaField = fields[field] + ':(' + search + ')';
      } else {
        warnings.push('Unrecognized field: "' + field + '"');
      }
    }

    let pathExtension;
    if (umediaScope && umediaField) {
      pathExtension = '(' + umediaScope + ' AND ' + umediaField + ')';
    } else if (umediaScope) {
      // If we have a pathExtension at all, we'll be using the "Expert search", which
      // will display better feedback to the user if we put the search expression
      // in the path.
      pathExtension = '(' + umediaScope + ' AND (' + search + '))';
    } else if (umediaField) {
      pathExtension = umediaField;
    }

    if (pathExtension) {
      uri.segmentCoded(pathExtension);
      queryParams['mode'] = 'expert';
    } else {
      uri.segmentCoded(search);
    }

    return [
      warnings.join(' '),
      uri.addQuery(queryParams),
    ];
  },
});

module.exports = plugin.compose(umedia);
