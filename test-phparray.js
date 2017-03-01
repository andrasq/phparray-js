/**
 * php-like associative array (object) operations
 *
 * Copyright (C) 2015,2017 Andras Radics
 * Licensed under the Apache License, Version 2.0
 */

'use strict';

var assert = require('assert');
var ops = require('./phparray');

module.exports = {
    'package.json': {
        'should be valid': function(t) {
            var json = require('./package.json');
            t.done();
        },
    },

    'array_keys': {
        'should return keys': function(t) {
            var data = [
                [ {}, [] ],
                [ {a:1}, ['a'] ],
                [ {a:1, b:2}, ['a', 'b'] ],
                [ {b:2, a:1}, ['b', 'a'] ],
                [ 3, [] ],
            ];
            for (var i in data) {
                var row = data[i];
                assert.deepEqual(ops.array_keys(row[0]), row[1]);
            }
            t.done();
        },
    },

    'array_values': {
        'should return values': function(t) {
            var data = [
                [ {}, [] ],
                [ {a:1}, [1] ],
                [ {a:1, b:2}, [1, 2] ],
                [ {b:2, a:1}, [2, 1] ],
                [ 3, [] ],
            ];
            for (var i in data) {
                var row = data[i];
                assert.deepEqual(ops.array_values(row[0]), row[1]);
            }
            t.done();
        },
    },

    'array_key_exists': {
        'should test for field': function(t) {
            var data = [
                [ 'a', {}, false ],
                [ '', {}, false ],
                [ 'a', {a:1}, true ],
                [ 'a', {a:null}, true ],
                [ 'a', {a:undefined}, true ],
                [ 'a', {}, false ],
                [ 'a', {b:2}, false ],
                [ 'a', {b:2, a:1}, true ],
                [ 'a', 3, false ],
            ];
            for (var i in data) {
                var row = data[i];
                assert.deepEqual(ops.array_key_exists(row[0], row[1]), row[2]);
            }
            t.done();
        },
    },

    'array_merge': {
        'should merge objects': function(t) {
            var data = [
                [ {}, {}, {} ],
                [ {a:1}, {}, {a:1} ],
                [ {}, {b:2}, {b:2} ],
                [ {a:1}, {b:2}, {a:1, b:2} ],                   // combine
                [ {a:1, b:22}, {b:2, c:3}, {a:1, b:2, c:3} ],   // overlap
                [ {a:1}, {a:2}, {a:2} ],                        // overwrite
                [ 3, {a:1}, {a:1} ],
            ];
            for (var i in data) {
                var row = data[i];
                assert.deepEqual(ops.array_merge(row[0], row[1]), row[2]);
            }
            t.done();
        },

        'should merge multiple objects': function(t) {
            assert.deepEqual(
                ops.array_merge({a:111}, {b:2, c:333}, {c:3, a:1, d:4}),
                {a:1, b:2, c:3, d:4}
            );
            t.done();
        },
    },

    'array_diff': {
        'should diff arrays': function(t) {
            var data = [
                [ [1, 2], [2, 3], [1] ],
                [ [1, 2, 2], [2], [1] ],
                [ [1, 2], [4, 3], [1, 2] ],
                [ [1, 2], [1, 2, 3], [ ] ],
            ];
            for (var i=0; i<data.length; i++) {
                var row = data[i];
                assert.deepEqual(ops.array_diff(row[0], row[1]), row[2]);
            }
            t.done();
        },

        'should diff multiple arrays': function(t) {
            assert.deepEqual(ops.array_diff([1, 2, "b", 3, 4], [1, 2], [2, 4], [1, 2, 2, "b"]), [3]);
            assert.deepEqual(ops.array_diff([1, "b"], [3, 4], [5, 6]), [1, "b"]);
            t.done();
        },

        'should ignore non-arrays': function(t) {
            assert.deepEqual(ops.array_diff(1, 2), []);
            assert.deepEqual(ops.array_diff(null, [1]), []);
            // TODO: right now array_diff("test", "t") => "es" -- is that good?
            t.done();
        },
    },

    'array_diff_key': {
        'should remove present fields': function(t) {
            var data = [
                [ {}, {a: 1}, {} ],
                [ {a: 1}, {}, {a: 1} ],
                [ {a: 1, b: "b"}, {c: {}}, {a: 1, b: "b"} ],
                [ {a: 1, b: "b", c: {}}, {c: {}}, {a: 1, b: "b"} ],
                [ {a: 1}, {a: {}}, {} ],
            ];
            for (var i in data) {
                var row = data[i];
                assert.deepEqual(ops.array_diff_key(row[0], row[1]), row[2]);
            }
            t.done();
        },

        'should diff multiple hashes': function(t) {
            assert.deepEqual(
                ops.array_diff_key({a:1, b:2, c:3}, {b:22}, {c:33}),
                {a:1}
            );
            t.done();
        },

        'should diff no hashes': function(t) {
            assert.deepEqual(ops.array_diff_key(), {});
            assert.deepEqual(ops.array_diff_key({a:1}), {a:1});
            assert.deepEqual(ops.array_diff_key({a:1}, {}), {a:1});
            assert.deepEqual(ops.array_diff_key({a:1}, "a"), {a:1});
            t.done();
        },
    },

    'array_intersect_key': {
        'should remove missing fields': function(t) {
            var data = [
                [ 3, {}, {} ],
                [ {}, {a:1}, {} ],
                [ {a:1}, {}, {a:1} ],
                [ {a:1}, {a:2}, {} ],
                [ {a:1, b:2}, {b:99}, {a:1} ],
            ];
            for (var i in data) {
                var row = data[i];
                assert.deepEqual(ops.array_diff_key(row[0], row[1]), row[2]);
            }
            t.done();
        },

        'should intersect multiple hashes': function(t) {
            assert.deepEqual(
                ops.array_intersect_key({a:1, b:2, c:3}, {a:2, b:3}, {b:4, c:5}),
                {b:2}
            );
            t.done();
        },

        'should intersect no hashes': function(t) {
            assert.deepEqual(ops.array_intersect_key(), {});
            assert.deepEqual(ops.array_intersect_key({a:1}), {a:1});
            assert.deepEqual(ops.array_intersect_key({a:1}, {}), {});
            assert.deepEqual(ops.array_intersect_key({a:1}, "a"), {a:1});
            t.done();
        },
    },

    'array_flip': {
        'should flip keys and values': function(t) {
            var data = [
                [ {}, {} ],
                [ {a:1}, {1:'a'} ],
                [ {a:1,b:1}, {1:'b'} ],
                [ {a:1, a:2}, {2:'a'} ],
                [ 3, {} ],
                [ [], {} ],
                [ ['a', 'b', 'b'], {a:0, b:2} ],
            ];
            for (var i in data) {
                var row = data[i];
                assert.deepEqual(ops.array_flip(row[0]), row[1]);
            }
            t.done();
        },
    },

    'array_fill': {
        'should fill array with values': function(t) {
            var data = [
                [ 0, 0, 123, [] ],
                [ 0, 1, 123, [123] ],
                [ 2, 2, 456, [,,456,456] ],
            ];
            for (var i in data) {
                var row = data[i];
                assert.deepEqual(ops.array_fill(row[0], row[1], row[2]), row[3]);
            }
            t.done();
        },
    },

    'array_fill_keys': {
        'should create hash with keys': function(t) {
            var data = [
                [ [], 123, {} ],
                [ ['a'], 123, {a:123} ],
                [ ['a', 'b', 'c'], 456, {a:456, b:456, c:456} ],
            ];
            for (var i in data) {
                var row = data[i];
                assert.deepEqual(ops.array_fill_keys(row[0], row[1]), row[2]);
            }
            t.done();
        },
    },
}
