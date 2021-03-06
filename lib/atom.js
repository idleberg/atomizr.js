// https://github.com/idleberg/atom-atomizr/blob/v0.22.0/lib/includes/atom.coffee
// ---
// generated by coffee-script 1.9.2

const parseCson = require('cson-parser');
const shared = require('./shared');

module.exports = {
    read_cson: function(input, options) {
        let data, output;

        // Validate CSON
        try {
            data = parseCson.parse(input);
        } catch (error) {
            throw error;
        }

        output = {
            scope: null,
            completions: []
        };

        for (let k in data) {
            let v = data[k];

            if (options.scope !== null) {
                output.scope = options.scope;
            } else {
                // Get scope, convert if necessary
                let ref = shared.exceptions;
                for (let scopeSubl in ref) {
                    let scopeAtom = ref[scopeSubl];
                    if (k === scopeAtom) {
                        output.scope = scopeSubl;
                    } else if (k[0] === '.') {
                        output.scope = k.substring(1);
                    } else {
                        output.scope = k;
                    }
                }
            }

            for (let i in v) {
                let j = v[i];
                if (j.prefix != null) {
                    let completions = {};

                    // Create tab-separated description
                    if (i !== j.prefix) {
                        completions.trigger = j.prefix;
                        completions.description = i;
                    } else {
                        completions.trigger = j.prefix;
                    }
                    completions.contents = shared.removeTrailingTabstops(j.body);
                    output.completions.push(completions);
                }
            }
        }

        // Minimum requirements
        if (output.completions.length === 0) {
            throw 'Error: This doesn\'t seem to be a valid Atom snippet file';
        }
        return output;
    },

    write_cson: function(input) {
        let snippet, ref, output, scope, description, body;

        snippet = {};
        ref = shared.exceptions;

        for (let scopeSubl in ref) {
            let scopeAtom = ref[scopeSubl];
            if (input.scope === scopeSubl) {
                scope = scopeAtom;
                break;
            } else {
                if (input.scope[0] !== '.') {
                    scope = '.' + input.scope;
                } else {
                    scope = input.scope;
                }
            }
        }
        let ref1 = input.completions;
        for (let l = 0, len = ref1.length; l < len; l++) {
            let i = ref1[l];
            if (i.description) {
                description = i.description;
            } else {
                description = i.trigger;
            }
            body = shared.addTrailingTabstops(i.contents);
            snippet[description] = {
                prefix: i.trigger,
                body: body
            };
        }
        output = {};
        output[scope] = snippet;

        output =  parseCson.stringify(output, null, 2);

        return output;
    }
};
