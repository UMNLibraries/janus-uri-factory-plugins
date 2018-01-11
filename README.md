# janus-uri-factory-plugins

[![Build Status](https://secure.travis-ci.org/UMNLibraries/janus-uri-factory-plugins.png)](http://travis-ci.org/UMNLibraries/janus-uri-factory-plugins)

Plugins for the [Janus URI factory](https://github.com/UMNLibraries/janus#uri-factory-plugins).

## Contents

- [Scopes and Formats](#scopes)
	- [ArchiveSpace](#archivespace)
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

Plugins may also define a list of valid `format` values, implemented only by
MncatDiscovery.

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

### GoogleSearchAppliance

Because the Google Search Appliance can be used to search many UMN websites, this
plugin requires a scope, which specifies which website to search. If scope is 
missing, it will default to `main`.

Description | Value
------|------------
UMN Libraries Main Website | main
UMN Health Sciences Libraries Website | hsl

### MncatDiscovery
#### MncatDiscovery Scopes

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
MNCAT Discovery | mncat_discovery
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

#### MncatDiscovery Formats

Name/Description | Value
-----------------|------
Archival/MSS Mtls | archive
Audio | audio
Books | books
Journals | journals
Maps | maps
Scores | scores
Video | video


### PubMed

The PubMed search engine does not use scopes.

### UMedia

We now support both collections, implemented with Drupal Organic Groups, and
sub-collections, implemented with Drupal Taxonomy terms. In the table below,
collection names are highlighted, to make them easier to find and to help
distinguish them from their sub-collections.

**Deprecation Notice**: Notice that collection scope values all include a
`im_og_gid:` prefix (og_gid refers to Drupal Organic Groups group ID), while
sub-collection scope values all include a `tid:` prefix (tid refers to Drupal
Taxonomy term ID). Previously we supported only collection IDs, and excluded 
the `im_og_gid:` prefixes. For backward-compatibility, any scopes without a
prefix will be assumed to be collection IDs. However, this functionality is
deprecated and will disappear in a future version. All new search forms should
use prefixed scopes, and all old search forms should be updated to use them.

Name/Description | Value
-----------------|-------
**All Collections** | im_og_gid:0
**Ames Library of South Asia** | im_og_gid:3588
Classical Urdu Poetry | tid:871
General Collection | tid:690
Introduction to Punjabi | tid:869
Introduction to Pushto | tid:870
Journal of Indian Art | tid:799
Stereoscopic Images of India | tid:768
**Andersen Horticultural Library** | im_og_gid:88869
Agnes Williams Collection | tid:915
Emma Roberts Collection | tid:914
Minneapolis Seedswomen Catalogs | tid:760
Minnesota Seed and Nursery Catalogs | tid:940
Vintage Seed and Nursery Catalog Covers | tid:840
**Bell Museum of Natural History** | im_og_gid:4760
Francis Lee Jaques Collection | tid:692
General Collection | tid:742
**Botanical Images** | im_og_gid:69341
Botanical Images from the Collections of the University Libraries | tid:693
**Business Library** | im_og_gid:88870
Historical Annual Reports | tid:761
**Center for Holocaust and Genocide Studies** | im_og_gid:949530
Artifact Collection | tid:939
Betty Mittleman: Silence is Golden | tid:941
Betty Mittleman: Silence is Golden and the Warsaw Ghetto Series | tid:923
Felix de la Concha: Portraying Memories: Portraits &amp; Conversations with Survivors of the Shoah | tid:922
Fritz Hirschberger: The Fifth Horseman | tid:917
Fritz Hirschberger: The Sur-Rational Holocaust Paintings | tid:916
Jordan Krimstein: Water Colors of Auschwitz | tid:921
Life Under Nazism | tid:938
Lucien Philippe Moretti: “Un sac de Billes” Lithographs | tid:919
Maxine Rude: Displaced Europe 1945-1946 | tid:918
Oscar Arredondo: Welcome to Cleveland, Home of the… | tid:920
**Charles Babbage Institute** | im_og_gid:781
Association for Computing Machinery | tid:771
Burroughs Corporation | tid:694
Control Data Corporation | tid:695
Fragile Publications | tid:744
Oral History Collections | tid:743
The COOK Report on Internet | tid:930
**Children's Literature Research Collections** | im_og_gid:88871
Beadle's Weekly | tid:762
Hess Collection | tid:881
Kerlan Collection Artwork | tid:872
Kerlan Collection Manuscripts | tid:873
Pulp Novel Covers | tid:882
The Illustrated Police News | tid:883
The Oz Collection | tid:800
**Department of American Indian Studies** | im_og_gid:271097
Image Collection | tid:805
**Department of Psychology** | im_og_gid:988559
Philosophical Psychology Lectures | tid:932
**East Asian Library** | im_og_gid:69340
Manzanar Free Press | tid:745
Ming Gazetteer Images | tid:725
**Entomology, Fisheries and Wildlife Library** | im_og_gid:68641
**First Flights** | im_og_gid:69342
High Altitude Plastic Balloon Project | tid:726
Images of Ballooning from the Piccard, Scholl, and Winzen Collections | tid:727
**Givens Collection of African American Literature** | im_og_gid:5299
African American Literature | tid:696
E. Ethelbert Miller Collection | tid:868
Federal Writers' Project Narratives by Formerly Enslaved Peoples Collection | tid:942
Givens Collection Ephemera | tid:864
Givens Collection Pamphlets | tid:865
Givens Collection Playbills and Programs | tid:866
Lou Bellamy Rare Book Collection | tid:863
Penumbra Theatre Company Records | tid:862
Penumbra Theatre Playbills | tid:801
Sara Roberson Collection | tid:867
**Humphrey School of Public Affairs** | im_og_gid:700489
Audio Collection | tid:835
Video Collection | tid:834
**Immigration History Research Center Archives** | im_og_gid:5494
Arab American Collection | tid:697
Armenian American Collection | tid:698
Belarusan American Collection | tid:699
Carpatho-Rusin American Collection | tid:929
Croatian American Collection | tid:700
Czech/Bohemian American Collection | tid:600
Daughters of Penelope Oral History Project | tid:927
Digitizing Immigrant Letters | tid:688
E Aletheia (Newspaper) | tid:899
Estonian American Collection | tid:701
Finnish American Collection | tid:724
Foundational Collection of Immigration Oral Histories | tid:824
General Collection | tid:702
Greek American Collection | tid:703
Hugo Skrastins Papers | tid:748
Hungarian American Collection | tid:704
Il Grido Del Popolo (Newspaper) | tid:937
Il Messaggero (Newspaper) | tid:907
Il Nuovo Vessillo (Newspaper) | tid:900
Il Paese (Newspaper) | tid:901
Italian American Collection | tid:705
Italians in Duluth Oral History Project | tid:926
La Stampa Liebera (Newspaper) | tid:905
Latvian American Collection | tid:706
Nomotages (Newspaper) | tid:904
O Scugnizzo (Newspaper) | tid:903
Polish American Collection | tid:707
Rev. Kenneth Dexter Miller Papers, 1887-1968 | tid:746
Roma (Newspaper) | tid:902
Romanian American Collection | tid:708
Slovak American Collection | tid:709
Slovenian American Collection | tid:710
Twin Cities Ukrainian Folk Ballet and Chorus Collection | tid:811
Ukrainian American Collection | tid:711
Uusi Kotimaa (Newspaper) | tid:906
Vita Nuova (Newspaper) | tid:933
Zdenka Rypka Papers | tid:747
**Institute for Advanced Study** | im_og_gid:700472
Bat of Minerva | tid:839
IAS Programming | tid:841
Intellectual and Cultural Leaders of Minnesota | tid:858
Small-scale Food Initiatives in Southwest Minnesota | tid:845
**Institute for Mathematics and its Applications** | im_og_gid:946949
Video Collection | tid:895
**James Ford Bell Library** | im_og_gid:88351
Atlantic World Collection | tid:925
Historical Map Project | tid:892
Historical Maps | tid:712
Images Collection | tid:795
John Gabriel Stedman Archive and Book Manuscript | tid:826
Spanish American Political Texts | tid:818
**Jean-Nickolaus Tretter Collection in GLBT Studies** | im_og_gid:88868
AIDS Poster Collection | tid:750
GAZE TV Collection | tid:931
GLBT Pride Poster Collection | tid:751
**John R. Borchert Map Library** | im_og_gid:69339
Ames Library of South Asia Maps | tid:830
City Maps | tid:815
General Map Collection | tid:831
General Minnesota Maps | tid:713
Historical Atlases | tid:913
Minneapolis / St. Paul Maps &amp; Atlases | tid:833
Minnesota County Maps, Plat Books and Atlases | tid:749
Minnesota Transportation Maps | tid:877
United States Geological Survey Polar Maps | tid:891
**Kautz Family YMCA Archives** | im_og_gid:21602
Emma Young Dickson Papers | tid:820
Foreign Secretary Reports from China | tid:759
Image Collection | tid:714
New York YMCA Annual Reports | tid:836
Records of YMCA International work in China, 1890-1991 | tid:934
Records of YMCA International Work in Palestine and Israel | tid:928
Trench and Camp Newspaper | tid:758
Video and Audio Collection | tid:770
YMCA of the USA Yearbooks and Directories, 1854-2002 | tid:757
**Learning Resources Center** | im_og_gid:11644
Chinese Opera Performances | tid:715
EngL 1301W Introduction to Multicultural American Literature | tid:793
EngL 3001W Textual Interpretation, Analysis, and Investigation | tid:785
EngL 3003W Historical Survey of British Literatures I | tid:784
EngL 3007 Shakespeare: Rehearsing the Imagination | tid:790
EngW 3102 Intermediate Fiction Writing: The Short Story | tid:783
EngW 5606 / Jour 5606W Literary Aspects of Journalism | tid:791
Independent and Distance Learning | tid:732
Mus 1001 Fundamentals of Music | tid:792
PubH 3040 Dying and Death in Contemporary Society | tid:786
South Asia Language Archive | tid:731
**Literary Manuscripts Collections** | im_og_gid:88967
**Magrath Library** | im_og_gid:88872
Minnesota Rivers, United States Parks Service | tid:812
Minnesota Soil Survey Collection | tid:763
Mountain Plover Research Collection | tid:924
**Minnesota Agricultural Experiment Station** | im_og_gid:1229
Image Collection | tid:728
**Minnesota Geological Survey** | im_og_gid:88873
Minnesota Geological Survey Maps | tid:764
**Music Library** | im_og_gid:88874
Hymnal and Tune Book Collection | tid:765
**Nathan and Theresa Berman Upper Midwest Jewish Archives** | im_og_gid:752030
Adath Jeshurun Congregation Records, 1884-2014 | tid:861
Frank and Arthur Eisenberg Papers | tid:847
Hillel of the University of Minnesota Records | tid:896
Jack Pink Papers | tid:878
Mount Zion Temple Oral History records | tid:880
Sharron and Oren Steinfeldt Photography Collection | tid:856
Sidney Cohen Papers | tid:879
Temple Israel Records, 1880-2014 | tid:911
Urban Exodus: The St. Louis Park Oral History Project records, 2011-2012 | tid:935
**Northwest Architectural Archives** | im_og_gid:11943
American Terra Cotta Company | tid:716
Edwin H. Lundie Papers | tid:796
Ellerbe Architects Papers Collection | tid:779
Forecast Public Art Archives | tid:809
John H. Howe Papers | tid:717
Larson and McLaren Papers | tid:817
Leroy S. Buffington Papers | tid:718
Liebenberg and Kaplan Papers | tid:780
Minneapolis Architecture 1848-1908 | tid:719
Pioneer-Endicott Building Plans | tid:885
Toltz, King and Day Papers | tid:782
William Channing Whitney Collection | tid:816
William Gray Purcell Papers | tid:720
**Performing Arts Archives** | im_og_gid:13949
Ballet Arts Minnesota Records | tid:898
Guthrie Theater Archives | tid:804
James Sewell Ballet Records | tid:837
John Munger Papers | tid:889
Judith Brin Ingber Papers | tid:890
Katherine Goodale Publications | tid:908
Minnesota Dance Alliance Records | tid:909
Minnesota Dance Pioneer Oral History Project | tid:825
Minnesota Dance Theatre Records | tid:838
Minnesota Orchestra | tid:721
Nancy Hauser Dance Company Records | tid:887
Performing Arts Publications Collection | tid:888
Scenic Collections | tid:730
Stephen Rueff Papers | tid:886
**Polar Geospatial Center** | im_og_gid:895347
United States Geological Survey - Polar Maps Collection | tid:876
**School of Journalism and Mass Communication** | im_og_gid:11433
Image Collection | tid:722
**School of Public Health** | im_og_gid:271239
James A. Hamilton Collection | tid:807
**Social Welfare History Archives** | im_og_gid:100
The Job is Never Done: 50 Years of Documenting Social Welfare History | tid:884
Addict in the Street | tid:753
American Social Health Association Records 1905-1990 | tid:723
Minneapolis YWCA Records | tid:910
National Conference of Social Work Portraits | tid:802
Social Work Yearbooks, 1929-1960 | tid:754
**Special Collections and Rare Books** | im_og_gid:88856
Arthur Kleiner Collection | tid:772
Cuneiform Inscriptions | tid:794
Eugene J. McCarthy Collection | tid:734
Fifty Original Leave from Medieval Manuscripts - Otto Ege Collection | tid:735
Friedrich Wachtsmuth Archive, 1929-1938 | tid:752
Individual Medieval Manuscript Leaves | tid:736
Joseph S. Mertle Collection on the History of Photomechanics | tid:781
Papyri and Ostraka Collection | tid:738
Photochrom Collection | tid:852
Placeholder | tid:893
Postcard Collection | tid:739
Rare Books and Manuscripts | tid:806
Sherlock Holmes Collections | tid:740
**University of Minnesota Archives** | im_og_gid:15575
Bell Museum of Natural History Negatives, 1898-1940s | tid:859
Bell Museum of Natural History Records, 1849-2006 | tid:860
Campus Maps and Blueprints | tid:756
Cass Gilbert Collection - Campus Plans | tid:755
Cereal Rust Laboratory Records, 1823, 1946-2007 | tid:798
Christopher Webber Hall papers, 1880-1906 | tid:855
Department of Botany Print Photograph Collection, 1898-1903 | tid:848
Department of Botany Records, 1893-1989 | tid:874
Department of Geology and Mineralogy Records, 1915-1960 | tid:854
Department of Plant Pathology and Physiology Records, 1918-2007 | tid:773
Elvin C. Stakman papers, 1918-1973 | tid:776
Helen Hart Papers, 1917-1953 | tid:774
Henry Francis Nachtrieb papers, 1886-1929 | tid:853
Inventory of the Christopher Webber Hall papers, 1880-1906 | tid:851
Inventory of the Minnesota Geological and Natural History Survey papers, 1872-1906 | tid:842
John Gibler Papers, 1890-2006 | tid:777
Junior F. Hayden Botanical Photograph Collection | tid:823
Minnesota Geological Survey Field Notebooks, 1877-1990 | tid:844
Minnesota Geological Survey Papers, 1912-1978 | tid:846
Moses Barron Papers, 1911-1978 | tid:803
Ned L. Huff Lantern Slide Collection, 1900-1952 | tid:857
Newton Horace Winchell Papers, 1872-1908 | tid:843
Norman E. Borlaug Papers, 1930-2006 | tid:775
Photograph Collection | tid:622
Richard Maurice Elliott Papers | tid:943
Stephen Farnum Peckham Papers, 1874-1880 | tid:850
University of Minnesota Gopher Yearbooks | tid:819
Video and Audio Collection | tid:684
**University of Minnesota Extension Service** | im_og_gid:5040
Image Collection | tid:729
**University of Minnesota Law Library** | im_og_gid:271243
Photograph Collection | tid:808
**Wangensteen Historical Library of Biology and Medicine** | im_og_gid:88875
Clara Barton Diaries | tid:894
History and Development of Caesarean Section, Dr. Robert Patterson Harris (1822-1899) | tid:821
James H. Stuart Letters | tid:822
Medical Receipt Books | tid:766
**War Posters and Postcards** | im_og_gid:22163
Propagnada | tid:525
Rationing and conservation | tid:497
Recreation | tid:514
Religion | tid:521
Views | tid:527
War finance | tid:493
War Posters and Postcards | tid:494
Wochenspruch | tid:509
**Wilson Library** | im_og_gid:88876
Journal Humoristique | tid:767

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
node_modules/.bin/eslint index.js
```

If `npm run lint` fails, invoking ESLint directly may be necessary to see the error messages.
