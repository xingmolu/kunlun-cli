#!/usr/bin/env node

const { Command } = require('commander');
const packageJson = require('../package.json');
const print = require('../dist/print');
const inquirer = require('inquirer');
const program = new Command();

const { validate, getProjectPath, createAppWithTemplate } = require('../dist/app');


const { TEMPLATE_LIST } = require('../dist/templateList');

program
  .command('init', { isDefault: true })
  .description('Init a project from template')
  .usage('[options] <project-name>')
  .version(packageJson.version)
  .option('--list', 'display all template')
  .arguments('[project-name]', 'your new project name')
  .action(function doGenerate(projectName, options) {
    console.log(projectName, options);
    
    if (options.list) {
      print.default.divider();
      print.default.info('Template List:');
      TEMPLATE_LIST.forEach((item) => {
        console.log(item);
        print.default.info(`${item.name}: ${item.repoURL}`);
      });
      return;
    }
    inquirer.prompt([{
      type: 'list',
      name: 'templateName',
      message: 'which template do you want to use?',
      choices: TEMPLATE_LIST.map(item => item.name)
    }, {
      type: 'input',
      name: 'appName',
      message: "what is your app's name?",
      default: projectName,
      validate: validate
    }, {
      type: 'input',
      name: 'version',
      message: "what is your app's version?",
      default: 'daily/0.0.1',
      validate: (value) => {
        if (!value) return 'Place input your app version';
        return true;
      }
    }, {
      type: 'input',
      name: 'description',
      message: "what is your app's description?",
      default: 'A new project',
    }]).then( async (answers) => {
      
      const template = TEMPLATE_LIST.find(item => item.name === answers.templateName);
      
      await createAppWithTemplate({
        ...answers,
        repoURL: template.repoURL,
        useage: template.useage,
      });
      // console.log(answers)
      // // getProjectPath()
      // console.log(getProjectPath(answers.name))
    });
  });
  
program.parse();