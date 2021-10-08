const translate = require('node-google-translate-skidz');
const readlineSync = require('readline-sync');
const chalk = require('chalk');
const inquirer = require('inquirer');

console.log(chalk.green(`view the supported language list, check ${chalk.bold.white('https://cloud.google.com/translate/docs/languages')}`))
let sourceText = readlineSync.question('Enter sentence : ')
let sourceLang = readlineSync.question('from lang code : ')
let targetLang = readlineSync.question('to Lang code : ').toLowerCase();

function useTranslate(scText, scLang, tgLang) {
    console.log(`woi ${scText}`)
    translate({
        text: scText,
        source: scLang,
        target: tgLang
    }, function (result) {
        // console.log(result)
        console.log(chalk.green('\n========'))
        console.log(`Translation ${chalk.bold.green(result.src)} => ${chalk.bold.yellow(tgLang)}`)
        console.log(chalk.green('========'))
        console.log(`From language ${chalk.bold.green(result.src)}\n${chalk.bold.white(scText)}\n`)
        console.log(`To language ${chalk.bold.yellow(tgLang)}\n${chalk.bold.white(result.sentences[0].trans)}\n`)
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
        else if (result.ld_result.srclangs[0] !== result.src) {
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'choiceTrue',
                        message: `Translate from ${chalk.bold.blue(result.ld_result.srclangs[0])} ?`,
                        choices: [
                            'Yes',
                            'No'
                        ]
                    }
                ])
                .then(answers => {
                    // console.log(answers)
                    if (answers.choiceTrue == 'Yes') {
                        if (tgLang == result.ld_result.srclangs[0]) {
                            useTranslate(result.sentences[0].orig, result.ld_result.srclangs[0], result.src)
                        } else {
                            useTranslate(result.sentences[0].orig, result.ld_result.srclangs[0], tgLang)
                        }

                    }
                    else {
                        return
                    }

                })
                .catch((err) => {
                    if (err.isTtyError) {
                        console.log(err)
                        // Prompt couldn't be rendered in the current environment
                    } else {
                        // Something else went wrong
                    }
                });
        }
    });
}

useTranslate(sourceText, sourceLang, targetLang)