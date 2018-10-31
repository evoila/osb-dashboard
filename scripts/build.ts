/* tslint:disable:no-console */
import * as spawn from 'cross-spawn';
import * as program from 'commander';
import * as fs from 'fs';

import { ChildProcessManager } from './child-process-manager';

const children = new ChildProcessManager();
const isRunningInCi = !!process.env['TARGET'];

function resetPath(path: string) {
  const fullPath = path + "/index.html";
  fs.readFile(fullPath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    //data = data.replace(/href="/g, 'href="/');
    //data = data.replace(/src="/g, 'src="/');

    fs.writeFile (fullPath, data, function(err) {
        if (err) throw err;
        console.log('Changed path imports successfully...');
    });
  });
}

function compile(buildTarget: string, analyze: boolean, cb) {
  const target = process.env['TARGET'] || 'production';
  const aot = process.env['AOT'] || 'true';
  const prod = target !== 'development';
  const outFolder = './dist/' + buildTarget;

  // these settings make the ng.cli output more amenable to webpack-bundle-anlayzer and source-map-explorer
  // however, they increase build time by 2x, so they're meant for local consumption only
  const analyzeArgs = analyze
    ? [
      '--named-chunks=true',
      '--sourcemaps=true',
      '--output-hashing=none'
    ]
    : [];

  const c = {
    cmd: 'ng',
    args: [
      'build',
      buildTarget,
      '--prod=' + prod,
      '--configuration=' + buildTarget,
      '--aot=' + aot,
      '--progress=' + !isRunningInCi,
      '--output-path=' + outFolder,
      '--delete-output-path=true', // delete before build
      '--stats-json=true',
      ...analyzeArgs
    ]
  };

  console.log(`Building: ${JSON.stringify(c.args.slice(1))}`);
  const child = spawn.spawn(c.cmd, c.args);
  children.register(child);

  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);

  child.on('exit', (code) => {
    if (code !== 0) {
      console.log(`premature exit, exiting with code ${code}`);
      cb(code);
      return;
    }

    resetPath(outFolder);
  });
}

function main(target: string, analyze: boolean) {
  compile(target, analyze, process.exit);
}

program
  .version('0.0.1')
  .option('-t, --target <target>', 'Build Target (angular-cli environment)')
  .option('--analyze', 'generate analyzable output')
  .parse(process.argv);

main(program['target'], program['analyze']);
