'use strict'
import test from 'tape';
//const plugin = require('../').mncatdiscovery();
import plugin from '../lib/mncatdiscovery.js';
import testerFactory from 'janus/uri-factory/plugin-tester.js';
const tester = testerFactory({ runIntegrationTests: false });

test('setup', async function (t) {
  await tester.setup()
})

// Simply validate that a primo (to which mncatdiscovery is aliased) test runs
test('mncatdiscovery baseUri()', function (t) {
  tester.baseUri(t, plugin, 'https://primo.lib.umn.edu/discovery/search?vid=01UMN_INST%3ATWINCITIES&lang=en')
})

test('mncatdiscovery emptySearchUri()', function (t) {
  tester.emptySearchUri(t, plugin, 'https://primo.lib.umn.edu/discovery/search?vid=01UMN_INST%3ATWINCITIES&lang=en')
})

test('teardown', async function (t) {
  await tester.teardown()
})
