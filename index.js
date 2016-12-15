const Atom = require('./lib/atom');
const SublimeText = require('./lib/sublime');
const TextMate = require('./lib/textmate');
const Vscode = require('./lib/vscode');

module.exports = {
    atom2sublime: function(input) {
        let data, output;

        try {
            data = Atom.read_cson(input);
            output = SublimeText.write_json(data);
        } catch (error) {
            throw error;
        }

        return output;
    },

    atom2textmate: function(input) {
        let data, output;

        try {
            data = Atom.read_cson(input);
            output = TextMate.write_plist(data);
        } catch (error) {
            throw error;
        }

        return output;
    },

    atom2vscode: function(input) {
        let data, output;

        try {
            data = Atom.read_cson(input);
            output = Vscode.write_json(data);
        } catch (error) {
            throw error;
        }

        return output;
    },

    sublime2atom: function(input, isSnippet = false) {
        let data, output;

        try {
            if (isSnippet === true) {
                data = SublimeText.read_xml(input);
            } else {
                data = SublimeText.read_json(input);
            }
            output = Atom.write_cson(data);
        } catch (error) {
            throw error;
        }

        return output;
    },

    sublime2textmate: function(input, isSnippet = false) {
        let data, output;

        try {
            if (isSnippet === true) {
                data = SublimeText.read_xml(input);
            } else {
                data = SublimeText.read_json(input);
            }
            output = TextMate.write_plist(data);
        } catch (error) {
            throw error;
        }

        return output;
    },

    sublime2vscode: function(input, isSnippet = false) {
        let data, output;

        try {
            if (isSnippet === true) {
                data = SublimeText.read_xml(input);
            } else {
                data = SublimeText.read_json(input);
            }
            output = Vscode.write_json(data);
        } catch (error) {
            throw error;
        }

        return output;
    },

    textmate2atom: function(input) {
        let data, output;

        try {
            data = TextMate.read_plist(input);
            output = Atom.write_cson(data);
        } catch (error) {
            throw error;
        }

        return output;
    },

    textmate2sublime: function(input) {
        let data, output;

        try {
            data = TextMate.read_plist(input);
            output = SublimeText.write_json(data);
        } catch (error) {
            throw error;
        }

        return output;
    },

    textmate2vscode: function(input) {
        let data, output;

        try {
            data = TextMate.read_plist(input);
            output = Vscode.write_json(data);
        } catch (error) {
            throw error;
        }

        return output;
    },

    vscode2atom: function(input, scope = 'source') {
        let data, output;

        try {
            data = Vscode.read_json(input, scope);
            output = Atom.write_cson(data);
        } catch (error) {
            throw error;
        }

        return output;
    },

    vscode2sublime: function(input, scope = 'source') {
        let data, output;

        try {
            data = Vscode.read_json(input, scope);
            output = SublimeText.write_json(data);
        } catch (error) {
            throw error;
        }

        return output;
    },

    vscode2textmate: function(input, scope = 'source') {
        let data, output;

        try {
            data = Vscode.read_json(input, scope);
            output = TextMate.write_plist(data);
        } catch (error) {
            throw error;
        }

        return output;
    }
};
