const translate = require('node-google-translate-skidz');
const readlineSync = require('readline-sync');
const chalk = require('chalk');
const inquirer = require('inquirer');

console.log(chalk.green(`view the supported language list, check ${chalk.bold.white('https://cloud.google.com/translate/docs/languages')}`))
let sourceText = readlineSync.question('Enter sentence : ')
let sourceLang = readlineSync.question('from lang code : ')
let targetLang = readlineSync.question('to Lang code : ').toLowerCase();

function useTranslate(scText, scLang, tgLang) {
    translate({
        text: scText,
        source: scLang,
        target: tgLang
    }, function mangan(result) {
        console.log(`${chalk.green('========')}\nTranslation ${chalk.bold.green(result.src)} => ${chalk.bold.yellow(tgLang)}\n${chalk.green('========')}`)
        console.log(`From language ${chalk.bold.green(result.src)}\n${chalk.bold.white(scText)}\n\nTo language ${chalk.bold.yellow(tgLang)}\n${chalk.bold.white(result.translation)}\n`)
        console.log(result)
        if (result.spell.spell_res) {
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'choiceTrue',
                        message: `did you mean ${chalk.bold.blue(result.spell.spell_res)} ?`,
                        choices: [
                            'Yes',
                            'No'
                        ]
                    }
                ])
                .then(answers => {
                    if (answers.choiceTrue === 'Yes') {
                        useTranslate(result.spell.spell_res, scLang, tgLang)
                        return;
                    }
                })
                .catch((error) => {
                    if (error.isTtyError) {
                        console.log(error)
                        // Prompt couldn't be rendered in the current environment
                    } else {
                        // Something else went wrong
                    }
                });
        }
    });
}

useTranslate(sourceText, sourceLang, targetLang)
// translate({
//     text: sourceText,
//     source: sourceLang,
//     target: targetLang
// }, function mangan(result) {
//     console.log(`Translation ${chalk.green(result.src)} => ${chalk.yellow(targetLang)}\n${chalk.bold.white(result.translation)}\n`)

//     // console.log(result);
// });