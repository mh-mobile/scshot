const AmeshCommand = require('./commands/amesh-command.js')

const { program } = require('commander')
program.parse(process.argv)

const ameshCommand = new AmeshCommand()
ameshCommand.execute()
