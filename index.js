const Atom = require('./lib/atom');
const SublimeText = require('./lib/sublime');
const TextMate = require('./lib/textmate');
const Vscode = require('./lib/vscode');

module.exports = {
    atom2sublime: function(input) {
        let data;

        try {
            data = Atom.read_cson(input);
        } catch (error) {
            throw error;
        }

        let output = SublimeText.write_json(data);

        return output;
    },

    atom2textmate: function(input) {
        let data;

        try {
            data = Atom.read_cson(input);
        } catch (error) {
            throw error;
        }

        let output = TextMate.write_plist(data);

        return output;
    },

    atom2vscode: function(input) {
        let data;

        try {
            data = Atom.read_cson(input);
        } catch (error) {
            throw error;
        }

        let output = Vscode.write_json(data);

        return output;
    },

    sublime2atom: function(input, isSnippet = false) {
        let data;

        try {
            if (isSnippet === true) {
                data = SublimeText.read_xml(input);
            } else {
                data = SublimeText.read_json(input);
            }
        } catch (error) {
            throw error;
        }

        let output = Atom.write_cson(data);

        return output;
    },

    sublime2textmate: function(input, isSnippet = false) {
        let data;

        try {
            if (isSnippet === true) {
                data = SublimeText.read_xml(input);
            } else {
                data = SublimeText.read_json(input);
            }
        } catch (error) {
            throw error;
        }

        let output = TextMate.write_plist(data);

        return output;
    },

    sublime2vscode: function(input, isSnippet = false) {
        let data;

        try {
            if (isSnippet === true) {
                data = SublimeText.read_xml(input);
            } else {
                data = SublimeText.read_json(input);
            }
        } catch (error) {
            throw error;
        }

        let output = Vscode.write_json(data);

        return output;
    },

    textmate2atom: function(input) {
        let data, output;

        try {
            data = TextMate.read_plist(input);
        } catch (error) {
            throw error;
        }

        output = Atom.write_cson(data);

        return output;
    },

    textmate2sublime: function(input) {
        let data, output;

        try {
            data = TextMate.read_plist(input);
        } catch (error) {
            throw error;
        }

        output = SublimeText.write_json(data);

        return output;
    },

    textmate2vscode: function(input) {
        let data, output;

        try {
            data = TextMate.read_plist(input);
        } catch (error) {
            throw error;
        }

        output = Vscode.write_json(data);

        return output;
    },

    vscode2atom: function(input, scope = 'source') {
        let data, output;

        try {
            data = Vscode.read_json(input, scope);
        } catch (error) {
            throw error;
        }

        output = Atom.write_cson(data);

        return output;
    },

    vscode2sublime: function(input, scope = 'source') {
        let data, output;

        try {
            data = Vscode.read_json(input, scope);
        } catch (error) {
            throw error;
        }

        output = SublimeText.write_json(data);

        return output;
    },

    vscode2textmate: function(input, scope = 'source') {
        let data, output;

        try {
            data = Vscode.read_json(input, scope);
        } catch (error) {
            throw error;
        }

        output = TextMate.write_plist(data);

        return output;
    }
};
