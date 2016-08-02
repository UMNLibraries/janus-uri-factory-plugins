# janus-uri-factory-plugins

[![Build Status](https://secure.travis-ci.org/UMNLibraries/janus-uri-factory-plugins.png)](http://travis-ci.org/UMNLibraries/janus-uri-factory-plugins)

Plugins for the [Janus URI factory](https://github.com/UMNLibraries/janus#uri-factory-plugins).

## Contents

- [Scopes](#scopes)
	- [FindingAids](#findingaids)
	- [GoogleSearchAppliance](#googlesearchappliance)
	- [MncatDiscovery](#mncatdiscovery)
	- [PubMed](#pubmed)
	- [UMedia](#umedia)
	- [Conservancy](#conservancy)
- [Install](#install)
- [Use](#use)
- [Test](#test)
	- [Integration Tests](#integration-tests)
- [Lint](#lint)

## Scopes

Except for Conservancy and PubMed, each plugin defines a list of valid `scope` values.

### FindingAids

Value | Description
------|------------
cbi | Charles Babbage Institute
clrc | Children's Literature Research Collection
scrbg | Givens Collection of African American Literature
ihrc | Immigration History Research Center Archives
jfb | James Ford Bell Library
scrbt | Jean Nikolaus-Tretter Collection in GLBT Studies
ymca | Kautz Family YMCA Archives
mss | Literary Manuscripts Collection
naa | Northwest Architectural Archives
paa | Performing Arts Archives
swha | Social Welfare History Archives
speccoll | Special Collections and Rare Books
uarc | University of Minnesota Archives
umja | Upper Midwest Jewish Archives

### GoogleSearchAppliance

Value | Description
------|------------
main | UMN Libraries Main Website
hsl | UMN Health Sciences Libraries Website

### MncatDiscovery

Value | Description
------|------------
ames | Ames Library of South Asia
andersen | Andersen Library
andersen_horticultural | Andersen Horticultural Library (Chanhassen)
andersen_rare | Andersen Rare Books
architecture | Architecture and Landscape Architecture Library
asc | Archives and Special Collections
babbage | Charles Babbage Institute Collection
bell | James Ford Bell Library
bio_med | Bio-Medical Library
children | Children's Literature Research Collection
default_scope | Twin Cities Catalog
east_asian | East Asian Library
givens | Givens Collection of African American Literature
immigration | Immigration History Research Center
journalism | Journalism Library
lake_itasca | Lake Itasca Biological Station
law | Law Library
law_rare | Law Library Rare Books
magrath | Magrath Library
math | Mathematics Library
mlac | Minnesota Library Access Center (MLAC)
mncat_discovery | MNCAT Discovery
music | Music Library
natural_resources | Natural Resources Library
northwest_architecture | Northwest Architecture Archives
performing_arts | Performing Arts Archives
plant_pathology | Plant Pathology Library
sherlock | Sherlock Holmes Collection
social_welfare | Social Welfare History Archives
tretter | Tretter GLBT Collection
university_archives | University Archives
upper_midwest_lit | Upper Midwest Literary Archives
veterinary_medical | Veterinary Medical Library
walter | Walter Science and Engineering Library
walter_smart | Walter SMART Learning Commons
wangensteen | Wangensteen Historical Library of Biology & Medicine
wilson | Wilson Library
wilson_map | John R. Borchert Map Library
wilson_rare | Wilson Library Rare Books
ymca | YMCA Archives

### PubMed

The PubMed search engine does not use scopes.

### UMedia

Value | Description
------|------------
0 | Search all collections...
3588 | Ames Library of South Asia
88869 | Andersen Horticultural Library
4760 | Bell Museum of Natural History
69341 | Botanical Images
88870 | Business Library
781 | Charles Babbage Institute
88871 | Children's Literature Research Collections
271097 | Department of American Indian Studies
69340 | East Asian Library
68641 | Entomology, Fisheries and Wildlife Library
69342 | First Flights
5299 | Givens Collection of African American Literature
700489 | Humphrey School of Public Affairs
5494 | Immigration History Research Center Archives
700472 | Institute for Advanced Study
88351 | James Ford Bell Library
88868 | Jean-Nickolaus Tretter Collection in GLBT Studies
69339 | John R. Borchert Map Library
21602 | Kautz Family YMCA Archives
11644 | Learning Resources Center
88967 | Literary Manuscripts Collections
88872 | Magrath Library
1229 | Minnesota Agricultural Experiment Station
88873 | Minnesota Geological Survey
88874 | Music Library
752030 | Nathan and Theresa Berman Upper Midwest Jewish Archives
11943 | Northwest Architectural Archives
13949 | Performing Arts Archives
895347 | Polar Geospatial Center
11433 | School of Journalism and Mass Communication
271239 | School of Public Health
100 | Social Welfare History Archives
88856 | Special Collections and Rare Books
15575 | University of Minnesota Archives
5040 | University of Minnesota Extension Service
271243 | University of Minnesota Law Library
88875 | Wangensteen Historical Library of Biology and Medicine
22163 | War Posters and Postcards
88876 | Wilson Library

### Conservancy

UDC scopes can be either a single slash (/), for all or the UDC, or
id/collectionId, where id and collectionId are both integers. id always seems
to be 1129, and Conservancy scope handling depends on that being true.
We require users to pass in only the collectionId. A list can be found at:

https://conservancy.umn.edu/community-list

The URLs listed there are all of the form: https://conservancy.umn.edu/handle/11299/collectionId

Examples:

Collection URL                                  | url-js scope | Description
------------------------------------------------|--------------|--------------------------------------
https://conservancy.umn.edu/handle/11299/1      | 1            | University of Minnesota - Twin Cities
https://conservancy.umn.edu/handle/11299/169792 | 169792       | Articles and Scholarly Works

## Install

Install with npm. In package.json:

```json
  "dependencies": {
    "@nihiliad/janus-uri-factory-plugins": "^0.0.0"
  }
```

## Use

```javascript
const janus = require('@nihiliad/janus');
const plugins = require('@nihiliad/janus-uri-factory-plugins');
const app = janus({
  uriFactoryPlugins: plugins,
});
```

## Test

Run all unit tests:

```
npm test
```

Run a single unit test by invoking [tape](https://github.com/substack/tape) directly:

```
node_modules/.bin/tape test/mncatdiscovery.js
```

### Integration Tests

Some tests make HTTP requests to real web services. To run those tests, set the `RUN_INTEGRATION_TESTS` environment variable to a true value.
The default value is false.

## Lint

Lint all files:

```
npm run lint
```

Lint a single file by invoking [ESLint](http://eslint.org/) directly:

```
node_modules/.bin/eslint.js index.js
```
