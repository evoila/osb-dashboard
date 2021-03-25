
/* tslint:disable:no-console */
const { ChildProcessManager } = require('./child-process-manager');
const { Command } = require('commander');

const {spawn} = require('cross-spawn')

const children = new ChildProcessManager();

function serve(buildTarget: string, cb) {
  const target = process.env['TARGET'] || 'development';
  const aot = process.env['AOT'] || 'false';
  const prod = target !== 'development';
  const c = {
    cmd: 'ng',
    args: [
      'serve',
      buildTarget,
      '--progress=true',
      '--prod=' + prod,
      '--configuration=' + buildTarget,
      '--aot=' + aot,
      '--port', '9101'
    ]
  };

  console.log(`Serving: ${JSON.stringify(c.args.slice(1))}`);
  const child = spawn.spawn(c.cmd, c.args);
  children.register(child);

  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);

  child.on('exit', (code) => {
    cb(code);
  });
}

const program = new Command();
program
  .version('0.0.1')
  .option('-t, --target <env>', 'Build Target (angular-cli environment)')
  .parse(process.argv);


serve(program.opts()['target'], (code) => {
  process.exit(code);
});
