/**
 * e2e task
 * 
 * You should have the server up and running before executing this task. e.g. run `au run`, otherwise the
 * protractor calls will fail.
 */
import * as project from '../aurelia.json';
import * as gulp from 'gulp';
import * as del from 'del';
import * as typescript from 'gulp-typescript';
import * as tsConfig from '../../tsconfig.json';
import {CLIOptions} from 'aurelia-cli';
import * as child_process from 'child_process';
import * as os from 'os';

import { webdriver_update, protractor } from 'gulp-protractor';

function clean() {
  
  return del(project.e2eTestRunner.dist + '*');
  
}

function build() {
  
  var typescriptCompiler = typescriptCompiler || null;
  
  if ( !typescriptCompiler ) {

    delete tsConfig.compilerOptions.lib;
    
    typescriptCompiler = typescript.createProject(Object.assign({}, tsConfig.compilerOptions, {
      // Add any special overrides for the compiler here
      module: 'commonjs'
    }));
    
  }

  return gulp.src(project.e2eTestRunner.typingsSource.concat(project.e2eTestRunner.source))
    .pipe(typescript(typescriptCompiler))
    .pipe(gulp.dest(project.e2eTestRunner.dist));
  
}

// runs build-e2e task
// then runs end to end tasks
// using Protractor: http://angular.github.io/protractor/
function e2e() {
  let siteProcess = launchSite(); // Start the website

  setTimeout(() => {              // Wait a few moments for the website to finish starting
    runTests(siteProcess);          // Run the tests
  }, project.e2eTestRunner.waitToRunTests);
}

// Kill the requested process and any child processes it may have spawned
function killProcess(victim) {
  if (os.platform() === 'win32') {
    return child_process.exec('taskkill /F /T /PID ' + victim.pid); // process.kill is unreliable on Windows; This is the most reliable way to kill a process and any child processes it may have spawned
  } else {
    process.kill(-victim.pid);                                      // This has not been tested; Based on http://azimi.me/2014/12/31/kill-child_process-node-js.html
  }
}

// Start the website by spawning a new process
function launchSite() {
  return child_process.spawn('au', ['run'], { shell: true }); // This wil spawn a new process which executes 'au run' which in turn spawns a new process to host the site
}

// Run the tests
function runTests(siteProcess) {
  gulp
    .src(project.e2eTestRunner.dist + '**/*.js')
    .pipe(protractor({
      configFile: 'protractor.conf.js',
      args: ['--baseUrl', 'http://127.0.0.1:9000']
    }))
    .on('end', function() { killProcess(siteProcess); setTimeout(() => { process.exit(); }, 2000) })
    .on('error', function(e) { killProcess(siteProcess); setTimeout((e) => { throw e; }, 2000); } )
}

export default gulp.series(
  webdriver_update,
  clean,
  build,
  e2e
);