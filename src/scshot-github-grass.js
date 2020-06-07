#!/usr/bin/env node
const GithubGrassCommand = require('./commands/github-grass-command.js')

const { program } = require('commander')
program.parse(process.argv)

if (program.args.length === 0) {
  console.log('error: username is required.')
  process.exit(-1)
}

const githubGrassCommand = new GithubGrassCommand(program.args[0])
githubGrassCommand.execute()
