'use strict'
import test from 'tape';
import plugins from '../index.js';
import factory from 'janus/uri-factory/index.js';

test('factory instantiation with all plugins', function (t) {
  t.doesNotThrow(
    function () { factory(plugins) },
    null,
    'instantiating a factory with all plugins is successful'
  )
  t.end()
})
