'use strict';
const test = require('tape');
const plugins = require('../');
const factory = require('janus/uri-factory');

test('factory instantiation with all plugins', function (t) {
  t.doesNotThrow(
    function () { factory(plugins); },
    null,
    'instantiating a factory with all plugins is successful'
  );
  t.end();
});
