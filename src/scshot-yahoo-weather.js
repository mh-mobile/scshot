const YahooWeatherCommand = require('./commands/yahoo-weather-command.js')

const { program } = require('commander')
program.parse(process.argv)

if (program.args.length === 0) {
  console.log('error: keyword is required.')
  process.exit(-1)
}

const yahooWeatherCommand = new YahooWeatherCommand(program.args[0])
yahooWeatherCommand.execute()
