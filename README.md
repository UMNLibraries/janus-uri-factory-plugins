# janus-uri-factory-plugins

[![Build Status](https://secure.travis-ci.org/UMNLibraries/janus-uri-factory-plugins.png)](http://travis-ci.org/UMNLibraries/janus-uri-factory-plugins)

Plugins for the [Janus URI factory](https://github.com/UMNLibraries/janus#uri-factory-plugins).

## Contents

- [Scopes and Formats](#scopes-and-formats)
	- [ArchiveSpace](#archivespace)
	- [GoogleCustomSearch](#google-custom-search)
	- [MncatDiscovery](#mncatdiscovery)
	- [Primo](#primo)
	- [PubMed](#pubmed)
	- [UMedia](#umedia)
	- [Conservancy](#conservancy)
	- [WorldCat](#worldcat)
- [Install](#install)
- [Use](#use)
- [Test](#test)
	- [Lint](#lint)
	- [Integration Tests](#integration-tests)
	- [Unit Tests](#unit-tests)

## Scopes and Formats

Except for Conservancy, PubMed, and WorldCat, each plugin defines a list of valid `scope` values.

Plugins may also define a list of valid `format` values, implemented only by Primo.

### ArchiveSpace

We use ArchiveSpace repositories for scopes.

Name/Description | Value
-----------------|------
Bell (James Ford Bell Library of Natural History) | 2
CBI (Charles Babbage Institute) | 3
CCR-SCRB (Carlson Company Records) | 18
CLRC (Children\'s Literature Research Collections) | 4
Givens (Givens Collection of African American Literature) | 5
IHRCA (Immigration History Research Center Archives) | 6
NAA (Northwest Architectural Archives) | 8
PAA (Performing Arts Archives) | 9
SCRB (Special Collections and Rare Books) | 12
SWHA (Social Welfare History Archives) | 11
Training (Training Repository) | 20
Tretter (Jean-Nickolaus Tretter Collection in GLBT Studies) | 13
UA (University Archives) | 14
UMJA (Upper Midwest Jewish Archives) | 15
UMLA (Upper Midwest Literary Archives) | 16
WHL (Wangensteen Historical Library of Biology and Medicine) | 19
YMCA (Krautz Family YMCA Archives) | 7

### Conservancy

UDC scopes can be either a single slash (/), for all or the UDC, or
id/collectionId, where id and collectionId are both integers. id always seems
to be 1129, and Conservancy scope handling depends on that being true.
We require users to pass in only the collectionId. A list can be found at:

https://conservancy.umn.edu/community-list

The URLs listed there are all of the form: https://conservancy.umn.edu/handle/11299/collectionId

Examples:

Name/Description                      | Collection URL                                  | Value
--------------------------------------|-------------------------------------------------|-------------
University of Minnesota - Twin Cities | https://conservancy.umn.edu/handle/11299/1      | 1
Articles and Scholarly Works          | https://conservancy.umn.edu/handle/11299/169792 | 169792

### Google Custom Search
Performs a search via the Google Custom Search endpoint configured at
https://www.lib.umn.edu/search or https://hsl.lib.umn.edu/search

Base site URLs are available as scopes

scope                          | Name/Description               | URL
-------------------------------|--------------------------------|-----------------
`www` (default if unspeficied) | https://www.lib.umn.edu/search | UL www website
`hsl`                          | https://hsl.lib.umn.edu/search | HSL website
`wangensteen`                  | https://hsl.lib.umn.edu/search | HSL website (alias)

Google Custom Search has no fields.

### MncatDiscovery
Alias of [Primo](#primo).

### Primo
#### Primo Scopes

Name/Description | Value
-----------------|------
Ames Library of South Asia | ames
Andersen Library | andersen
Andersen Horticultural Library (Chanhassen) | andersen_horticultural
Andersen Rare Books | andersen_rare
Architecture and Landscape Architecture Library | architecture
Archives and Special Collections | asc
Charles Babbage Institute Collection | babbage
James Ford Bell Library | bell
Berman Upper Midwest Jewish Archives | berman
Bio-Medical Library | bio_med
Children's Literature Research Collection | children
Twin Cities Catalog | default_scope
East Asian Library | east_asian
Givens Collection of African American Literature | givens
Immigration History Research Center | immigration
Journalism Library | journalism
Lake Itasca Biological Station | lake_itasca
Law Library | law
Law Library Rare Books | law_rare
Magrath Library | magrath
Mathematics Library | math
Minnesota Library Access Center (MLAC) | mlac
Libraries Search | mncat_discovery
Music Library | music
Natural Resources Library | natural_resources
Northwest Architecture Archives | northwest_architecture
Performing Arts Archives | performing_arts
Plant Pathology Library | plant_pathology
Sherlock Holmes Collection | sherlock
Social Welfare History Archives | social_welfare
Tretter GLBT Collection | tretter
University Archives | university_archives
Upper Midwest Literary Archives | upper_midwest_lit
Veterinary Medical Library | veterinary_medical
Walter Science and Engineering Library | walter
Walter SMART Learning Commons | walter_smart
Wangensteen Historical Library of Biology & Medicine | wangensteen
Wilson Library | wilson
John R. Borchert Map Library | wilson_map
Wilson Library Rare Books | wilson_rare
YMCA Archives | ymca

#### Primo Formats

Name/Description | Value
-----------------|------
Archival/MSS Mtls _and_ Archival Material/Manuscripts | archive
Audio | audios
Books | books
Journals | journals
Maps | maps
Scores | scores
Videos | videos


### PubMed

The PubMed search engine does not use scopes.

### UMedia
Alias of `umediaorganization`

### UMedia Organization

Scope UMedia search results by Contributing Organization facet. Contributing Organizations are valiated against this list, and provided with an abbreviated name for convenience. Currently available Contributing Organizations are listed at
https://umedia.lib.umn.edu/facets?facet_field=contributing_organization_name_s&facet_limit=500&facet_sort=index

#### Sample Usage:

```
# Search for "maps" within United States Geological Survey contributions
/janus?target=umediaorganization&scope=usgs&search=maps
```

Name | Value
-----|-------
Donald Clay Johnson | djohnson
Hennepin County Library, James K. Hosmer Special Collections. | hosmer
Joanne B. Eicher | eichner
Timothy J. Johnson | tjohnson
United States Geological Survey | usgs
University of Minnesota Extensions. | umnext
University of Minnesota Law Library, Riesenfeld Rare Books Research Center. | riesenfeld
University of Minnesota Libraries, Ames Library of South Asia. | ames
University of Minnesota Libraries, Andersen Horticultural Library. | andersen
University of Minnesota Libraries, Archie Givens, Sr. Collection of African American Literature. | givens
University of Minnesota Libraries, Business Library. | umnbus
University of Minnesota Libraries, Charles Babbage Institute. | babbage
University of Minnesota Libraries, Children\'s Literature Research Collections. | clrc
University of Minnesota Libraries, East Asian Library. | eastasian
University of Minnesota Libraries, Immigration History Research Center Archives. | ihrca
University of Minnesota Libraries, James Ford Bell Library. | bell
University of Minnesota Libraries, Jean-Nickolaus Tretter Collection in Gay, Lesbian, Bisexual and Transgender Studies. | tretter
University of Minnesota Libraries, John R. Borchert Map Library. | borchert
University of Minnesota Libraries, Kautz Family YMCA Archives. | ymca
University of Minnesota Libraries, Magrath Library. | magrath
University of Minnesota Libraries, Music Library. | music
University of Minnesota Libraries, Nathan and Theresa Berman Upper Midwest Jewish Archives. | umja
University of Minnesota Libraries, Northwest Architectural Archives. | naa
University of Minnesota Libraries, Owen H. Wangensteen Historical Library of Biology and Medicine. | wangensteen
University of Minnesota Libraries, Performing Arts Archives. | paa
University of Minnesota Libraries, Rare Books and Special Collections. | rare
University of Minnesota Libraries, Social Welfare History Archives. | swha
University of Minnesota Libraries, Special Collections and Rare Books. | scrbm
University of Minnesota Libraries, University Archives. | uarch
University of Minnesota Libraries, Upper Midwest Literary Archives. | mss
University of Minnesota Libraries, Wilson Library. | wilson
University of Minnesota Libraries. Library Media Services. | lms
University of Minnesota Press Test Division. | upress
University of Minnesota, Bell Museum. | bellmuseum
University of Minnesota, Center for Holocaust and Genocide Studies. | chgs
University of Minnesota, Department of American Indian Studies. | umnais
University of Minnesota, Department of Psychology. | umnpsych
University of Minnesota, Horticultural Research Center. | hrc
University of Minnesota, Institute for Advanced Study. | advanced
University of Minnesota, Institute for Mathematics and its Applications. | umnima
University of Minnesota, Minnesota Agricultural Experiment Station. | agex
University of Minnesota, Minnesota Institute for Sustainable Agriculture (MISA). | misa
University of Minnesota, School of Physics and Astronomy. | physics
University of Minnesota, School of Public Health. | pubhealth

### UMedia Collection

Scope UMedia search results by Collection name. Hundreds of collections are available and the list is too fluid to validate. Scope values will be accepted and passed to UMedia as a facet. Currently available collections usable as `scope` values are listed at https://umedia.lib.umn.edu/facets?facet_field=collection_name_s&facet_limit=500&facet_sort=index

#### Sample Usage:

```
# Search for "arboretum" within the Cloquet Forestry Center Records collection
/janus?target=umediacollection&scope=Cloquet+Forestry+Center+Records&search=arboretum
```

### WorldCat

The WorldCat search engine does not use scopes.

## Install

Install with npm. In package.json, include something like...

```json
  "dependencies": {
    "@nihiliad/janus-uri-factory-plugins": "^2.0.0"
  }
```

...where version based on the `version` value in this project's `package.json`. Then `npm install`.

### Missing Dependencies of Dev Dependencies

Sometimes `npm install` has not installed dependencies of packages in `devDependencies`, e.g., `eslint`, in `package.json`. If this happens, running `npm install --save-dev` should fix it.

## Use

```javascript
const janus = require('@nihiliad/janus');
const plugins = require('@nihiliad/janus-uri-factory-plugins');
const app = janus({
  uriFactoryPlugins: plugins,
});
```

## Test

To run the linter and all unit tests:

```
npm test
```

### Lint

We use [standardjs](https://standardjs.com/) for linting. To lint all files:

```
npx standard
```

To automatically fix any errors that can be fixed automatically:

```
npx standard --fix
```

To lint a single file, e.g., `index.js`:

```
npx standard index.js
```

### Integration Tests

Some unit tests make HTTP requests to real web services. To run those tests, set the `RUN_INTEGRATION_TESTS` environment variable to a true value. The default value is false. This works for `npm test` and all commands described below.

### Unit Tests

We use [tape](https://github.com/substack/tape) for unit tests. To run all unit tests:

```
npx tape test/*.js
```

To run a single unit test file, e.g., `test/factory.js`:

```
npx tape test/factory.js
```
