/* tslint:disable:no-console */
import * as spawn from 'cross-spawn';
import * as program from 'commander';

import { ChildProcessManager } from './child-process-manager';

const children = new ChildProcessManager();
const isRunningInCi = !!process.env['TARGET'];

function compile(buildTarget: string, analyze: boolean, cb) {
  const target = process.env['TARGET'] || 'production';
  const aot = process.env['AOT'] || 'true';

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
      '--target=' + target,
      '--environment=' + buildTarget,
      '--app=' + buildTarget,
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