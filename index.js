const translate = require('node-google-translate-skidz');
const readlineSync = require('readline-sync');
const chalk = require('chalk');

let sourceText = readlineSync.question('Enter sentence : ')
console.log(chalk.bold(`view the supported language list, check ${chalk.bgGreen('https://cloud.google.com/translate/docs/languages')}`))
let sourceLang = readlineSync.question('from lang : ').toUpperCase()
let targetLang = readlineSync.question('to Lang : ').toUpperCase()
console.log(chalk.green('========'))
translate({
    text: sourceText,
    source: sourceLang,
    target: targetLang
}, function (result) {
    console.log(`Translation ${chalk.green(sourceLang)} => ${chalk.yellow(targetLang)}\n${chalk.bold.white(result.translation)}\n`)
    console.log(`Mungkin maksud anda ${chalk.bold.blue(result.spell.spell_res)}`)
    // console.log(result);
});