require('shelljs/global')
const ora = require('ora')

const spinner = ora('building for production...')
spinner.start()

rm('-rf', 'public')
mkdir('public')

// cp('-R', 'src', conf.output.path)

module.exports = spinner
