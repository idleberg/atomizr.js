#!/usr/bin/env node

const meta = require('../package.json');
const Atomizr = require('../index.js');
const program = require('commander');
const fs = require('fs');
const path = require('path');

program
    .version(meta.version)
    .arguments('<file>')
    .usage('<file> [options]')
    .option('-s, --source [source]', 'Specify conversion source')
    .option('-t, --target [target]', 'Specify conversion target', 'atom')
    .option('-A, --addtabs', 'Add trailing tab-stops')
    .option('-I, --ignoretab', 'Ignore tab-stop separator')
    .option('-R, --removetabs', 'Remove trailing tab-stops')
    .option('-S, --scope [scope]', 'Specify scope for Visual Studio Code source')
    .action(function(file) {

        readFile(file, program);
        
    })
 .parse(process.argv);

if (program.args.length === 0) program.help();

function readFile(input, opts) {
    fs.readFile(input, (error, data) => {
        if (error) throw error;

        let inputFile = data.toString();
        let fileExt = path.extname(input);


        let isSnippet;
        if (fileExt === '.sublime-completions') {
            isSnippet = false;
        } else if (fileExt === '.sublime-snippet') {
            isSnippet = true;
        }

        let output;
        if ((fileExt === '.cson' || fileExt === '.json') && opts.source !== 'vscode') {
            if (opts.target === 'sublime') {
                output = Atomizr.atom2textmate(inputFile);
            } else if (opts.target === 'vscode') {
                output = Atomizr.atom2vscode(inputFile);
            } else {
                output = Atomizr.atom2sublime(inputFile);
            }
        } else if (fileExt === '.sublime-completions' || fileExt === '.sublime-snippet' || opts.source === 'sublime') {
            if (opts.target === 'textmate') {
                output = Atomizr.sublime2textmate(inputFile, isSnippet);
            } else if (opts.target === 'vscode') {
                output = Atomizr.sublime2vscode(inputFile, isSnippet);
            } else {
                output = Atomizr.sublime2atom(inputFile, isSnippet);
            }
        } else if (fileExt === '.tmSnippet' || opts.source === 'textmate') {
            if (opts.target === 'sublime') {
                output = Atomizr.textmate2sublime(inputFile, opts.scope);
            } else if (opts.target === 'vscode') {
                output = Atomizr.textmate2vscode(inputFile, opts.scope);
            } else {
                output = Atomizr.textmate2atom(inputFile, opts.scope);
            }
        } else if (fileExt === '.json' || opts.source === 'vscode') {
            if (opts.target === 'sublime') {
                output = Atomizr.vscode2sublime(inputFile, opts.scope);
            } else if (opts.target === 'textmate') {
                output = Atomizr.vscode2textmate(inputFile, opts.scope);
            } else {
                output = Atomizr.vscode2atom(inputFile, opts.scope);
            }
        } else {
            return console.error('Error: Unsupported file-type');
        }

        console.log(output);
    });
}