const { program } = require('commander')

class ScshotCLI {
  run(argv) {
    try {
      program
        .name('scshot')
        .usage('[command]')
        .command('github [username]', 'fetch github grapph')
        .command('yahoo-weather [keyword]', 'search weather with query')
        .command('amesh', 'fetch amesh')
        .parse(argv)
    } catch (e) {
      console.log(`${e}`)
    }
  }
}

new ScshotCLI().run(process.argv)
