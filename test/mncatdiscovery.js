'use strict'
const test = require('tape')
const plugin = require('../').mncatdiscovery()
const tester = require('@nihiliad/janus/uri-factory/plugin-tester')({ runIntegrationTests: false })

test('setup', async function (t) {
  await tester.setup()
})

// Simply validate that a primo (to which mncatdiscovery is aliased) test runs
test('mncatdiscovery baseUri()', function (t) {
  tester.baseUri(t, plugin, 'https://primo.lib.umn.edu/primo-explore/search?institution=TWINCITIES&vid=TWINCITIES&dum=true&highlight=true&lang=en_US')
})

test('mncatdiscovery emptySearchUri()', function (t) {
  tester.emptySearchUri(t, plugin, 'https://primo.lib.umn.edu/primo-explore/search?institution=TWINCITIES&vid=TWINCITIES&dum=true&highlight=true&lang=en_US')
})

test('teardown', async function (t) {
  await tester.teardown()
})
