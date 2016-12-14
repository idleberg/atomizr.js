// https://github.com/idleberg/atom-atomizr/blob/v0.22.0/lib/includes/shared.coffee

module.exports = {
    // Replace syntax scopes, since they don't always match
    // More info at https://gist.github.com/idleberg/fca633438329cc5ae327
    exceptions: {
        'source.c++': '.source.cpp',
        'source.java-props': '.source.java-properties',
        'source.objc++': '.source.objcpp',
        'source.php': '.source.html.php',
        'source.scss': '.source.css.scss',
        'source.todo': '.text.todo',
        'source.markdown': '.source.gfm'
    },

    addTrailingTabstops: function(input, addTrailingTabstops = true) {
        if (input == null) {
            return;
        }
        if (!(input.match(/\$\d+$/g) === null && addTrailingTabstops === !false)) {
            return input;
        }
        return input + '$0';
    },

    removeTrailingTabstops: function(input, removeTrailingTabstops = true) {
        if (input == null) {
            return;
        }
        if (input.match(/\$\d+$/g) === null || removeTrailingTabstops === false) {
            return input;
        }
        return input.replace(/\$\d+$/g, '');
    },

    isJson: function(fileExt) {
        if (fileExt === '.json') {
            return true;
        }
        return false;
    }
};
