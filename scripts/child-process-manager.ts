
import { ChildProcess } from 'child_process';

enum signals {
  SIGINT = "SIGINT",
  SIGTERM = "SIGTERM"
}


/**
 * Keeps track of spawned child processes and forwards parent process signals
 * received by the parent process.
 */
class ChildProcessManager {
  private readonly childs: ChildProcess[] = [];

  constructor() {
    // cleanup when parent process exts
    process.on('exit', () => this.cleanup());
    process.on('SIGINT', () => this.cleanup(signals.SIGINT)); // catch ctrl-c
    process.on('SIGTERM', () => this.cleanup(signals.SIGTERM)); // catch kill
  }

  register(child: ChildProcess) {
    this.childs.push(child);

    child.on('exit', () => {
      this.removeChild(child);
    });
  }

  private removeChild(child: ChildProcess) {
    // Note: this is a common "JS hack" to remove an element, see also http://stackoverflow.com/a/5767357/125407
    const index = this.childs.indexOf(child);
    if (index > -1) {
      this.childs.splice(index, 1);
    }
  }

  cleanup(signal = signals.SIGTERM) {
    this.childs.forEach(x => x.kill(signal));
  }
}

module.exports.ChildProcessManager = ChildProcessManager;


