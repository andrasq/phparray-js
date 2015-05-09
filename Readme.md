phparray
========

PHP-like associative array operations.

This implementation works on pure data hashes (ie, ignoring inheritance).


##

        npm install phparray
        npm test phparray

        var array_diff_key = require('phparray').array_diff_key;


## Functions

### array_keys( a )

Returns an array with the field names from the object `a`.

### array_values( a )

Returns an array with the values from the object `a`.

### array_key_exists( name, a )

Returns true if the field `name` is defined on object `a`, ie if `a[name]`
exists, false otherwise.

### array_merge( a, [b, ...] )

Returns an object containing all fields from all the arguments.
If a field occurs in more than one of the objects, the value from the
rightmost object is returned.

### array_diff_key( a, [b, ...] )

Returns an object containing those values from `a` whose fields do not
occur in any of the other objects `b`, `c` etc.

### array_intersect_key( a, [b, ...] )

Returns an object containing those values from `a` whose fields occur
in every other object `b`, `c`, etc.
