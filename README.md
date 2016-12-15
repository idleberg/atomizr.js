# atomizr

[![npm](https://img.shields.io/npm/l/atomizr.svg?style=flat-square)](https://www.npmjs.org/package/atomizr)
[![npm](https://img.shields.io/npm/v/atomizr.svg?style=flat-square)](https://www.npmjs.org/package/atomizr)
[![Travis](https://img.shields.io/travis/idleberg/node-atomizr.svg?style=flat-square)](https://travis-ci.org/idleberg/node-atomizr)
[![David](https://img.shields.io/david/idleberg/node-atomizr.svg?style=flat-square)](https://david-dm.org/idleberg/node-atomizr)
[![David](https://img.shields.io/david/dev/idleberg/node-atomizr.svg?style=flat-square)](https://david-dm.org/idleberg/node-atomizr?type=dev)

Converts snippets for Atom, Sublime Text, TextMate, and Visual Studio Code. Based on the [Atom package](https://github.com/idleberg/atom-atomizr) of the same name.

## Installation

`npm install -g atomizr`

## Usage

### CLI

See `atomizr -h` for a list of all options

```bash
# Convert Sublime Text completions into Atom snippets
$ atomizr example.sublime-completions --target atom >> example.cson
```

Specifying `--source` is optional. However, sometimes it's necessary to determine whether the source is for Atom or Visual Studio Code (both use `.json`!) When converting a Visual Studio Code snippet, the scope for the target should be supplied (e.g. `--scope .source.haskell`) – otherwise `.source` will be used.

### Node Module

```js
const Atomizr = require('atomizr');
const fs = require('fs');

fs.readFile('./example.sublime-completions', (error, data) => {
    if (error) throw error;

    let output = Atomizr.atom2sublime(data);
    console.log(output);
});
```

#### Methods

* Atom
    * `atom2sublime(data)`
    * `atom2textmate(data)`
    * `atom2vscode(data)`
* Sublime Text
    * `sublime2atom(data, bool:is_snippet)`
    * `sublime2textmate(data, bool:is_snippet)`
    * `sublime2vscode(data, bool:is_snippet)`
* TextMate
    * `textmate2atom(data)`
    * `textmate2sublime(data)`
    * `textmate2vscode(data)`
* Visual Studio Code
    * `vscode2atom(data)`
    * `vscode2sublime(data)`
    * `vscode2textmate(data)`

## License

This work is licensed under [The MIT License](https://opensource.org/licenses/MIT)

## Donate

You are welcome support this project using [Flattr](https://flattr.com/submit/auto?user_id=idleberg&url=https://github.com/idleberg/node-atomizr) or Bitcoin `17CXJuPsmhuTzFV2k4RKYwpEHVjskJktRd`