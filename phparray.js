/**
 * php-like associative array (object) operations
 *
 * Copyright (C) 2015,2017 Andras Radics
 * Licensed under the Apache License, Version 2.0
 */

/*
 * Notes:
 *
 *      - php arrays are hashes, not objects
 *      - in php, only objects can have inheritance
 *      - our implementation presumes hashes, and ignores inheritance
 */

'use strict';

module.exports = {

    array_keys:
    function array_keys( a ) {
        var ret = new Array();
        for (var i in a) ret.push(i);
        return ret;
    },

    array_values:
    function array_values( a ) {
        var ret = new Array();
        for (var i in a) ret.push(a[i]);
        return ret;
    },

    array_key_exists:
    function array_key_exists( name, hash ) {
        return hash[name] || (typeof hash === 'object' && name in hash);
    },

    array_merge:
    function array_merge( /* VARARGS */ ) {
        // TODO: we only merge objects, but php array_merge merges [] arrays by value
        var c = {};
        for (var k=0; k<arguments.length; k++) {
            var a = arguments[k];
            if (typeof a !== 'object') continue;
            for (var i in a) c[i] = a[i];
        }
        return c;
    },

    array_diff:
    function array_diff( a /* VARARGS */ ) {
        var c = [];
        if (a && a.length > 0 && a[0]) {
            // TODO: this is primitive, for short arrays only!
            var idx, k = new Array(a.length);
            for (var i=0; i<a.length; i++) k[i] = a[i];
            for (var i=1; i<arguments.length; i++) {
                var b = arguments[i];
                for (var j=0; j<b.length; j++) {
                    while ((idx = k.indexOf(b[j])) >= 0) {
                        k[idx] = undefined;
                    }
                }
            }
            for (var i=0; i<k.length; i++) if (k[i] !== undefined) c.push(k[i]);
        }
        return c;
    },

    array_diff_key:
    function array_diff_key( a /* VARARGS */ ) {
        var c = {};
        if (typeof a === 'object') {
            for (var i in a) c[i] = a[i];
            for (var k=1; k<arguments.length; k++) {
                var b = arguments[k];
                if (typeof b !== 'object') continue;
                for (var i in b) delete c[i];
            }
        }
        return c;
    },

    array_intersect_key:
    function array_intersect_key( a /* VARARGS */ ) {
        var c = {};
        if (a) for (var i in a) c[i] = a[i];
        for (var k=1; k<arguments.length; k++) {
            var b = arguments[k];
            if (typeof b !== 'object') continue;
            for (var i in c) if (!b[i] && !(i in b)) delete c[i];
        }
        return c;
    },

    array_flip:
    function array_flip( a ) {
        // flips keys and values on arrays and objects, always returns an object
        var c = {};
        for (var i in a) c[a[i]] = i;
        return c;
    },

    array_fill:
    function array_fill( base, count, value ) {
        var c = [];
        for (var i=base; i<base+count; i++) c[i] = value;
        return c;
    },

    array_fill_keys:
    function array_fill_keys( keys, value ) {
        var c = {};
        for (var i in keys) {
            c[keys[i]] = value;
        }
        return c;
    },
}
