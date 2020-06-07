const { program } = require('commander')

class ScshotCLI {
  run(argv) {
    try {
      program
        .name('scshot')
        .usage('[command]')
        .command(
          'github-grass [username]',
          'Display the GitHub grass image for a given user'
        )
        .command(
          'yahoo-weather [address/zip]',
          'Display Yahoo weather image of given address/zip code'
        )
        .command('amesh', 'Display the images of Tokyo Amesh')
        .parse(argv)
    } catch (e) {
      console.log(e)
    }
  }
}

new ScshotCLI().run(process.argv)
