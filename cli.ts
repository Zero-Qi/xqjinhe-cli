#!/usr/bin/env_node

const program = require('commander')

program
  .option('-j | --join','Join IMWeb now!');
program.parse()
console.log(program.opts()) // {join: true}
console.log(program.getOptionValue('join')) // true