import { exec } from 'child_process';
import os from 'os';

class PythonEnv {
    setupAndRunScript() {
        const platform = os.platform();
        let setupCommand;

        if (platform === 'win32') {
            setupCommand = 'python_scripts/windows.bat';
            
        } else if (platform === 'darwin' || platform === 'linux') {
            setupCommand = './python_scripts/unix.sh';
        } else {
            throw new Error('Unsupported OS');
        }

        return exec(setupCommand);
    }

    printOutput(process) {
        process.stdout.on('data', (data) => {
            console.log(`stdout: ${data.toString()}`);
        });

        process.stderr.on('data', (data) => {
            console.error(`stderr: ${data.toString()}`);
        });

        process.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    }
}

const pythonRunner = new PythonEnv();
const process = pythonRunner.setupAndRunScript();
pythonRunner.printOutput(process);
