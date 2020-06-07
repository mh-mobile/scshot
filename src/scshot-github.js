#!/usr/bin/env node
const GithubCommand = require('./commands/github-command.js')

const { program } = require('commander')
program.parse(process.argv)

if (program.args.length === 0) {
  console.log('error: username is required.')
  process.exit(-1)
}

const githubCommand = new GithubCommand(program.args[0])
githubCommand.execute()
