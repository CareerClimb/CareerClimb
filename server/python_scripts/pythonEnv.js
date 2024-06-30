import { spawn } from 'child_process';

// Create an environment to run python scripts

class pythonEnv {
    runScript(pythonScript) {
        /* Input: String representing script name
           ex. "python_launched_from_nodejs.py"

           Returns: process that runs ur python script
        */

        // create subprocess to run new code
        var process = spawn('python',[pythonScript, '--version'])
        process.stdout.on('data', (version)=> {
            console.log('stdout: ${version}');
        });

        return process
    }

    printOutput(process) {
        // prints std output from python
        process.stdout.on('data', (chunk) => {
            const textChunk = chunk.toString('utf8'); // buffer to string
            console.log(textChunk); // print output
        });

        process.stderr.on('data', (chunk) => {
            const errorChunk = chunk.toString('utf8'); // buffer to string
            console.error(errorChunk); // print error output if needed
        });

        process.on('close', (code) => {
            console.log(`Python process exited with code ${code}`);
        });

        process.on('error', (err) => {
            console.error('Failed to start Python process:', err);
        });
    }

    


}








export default pythonEnv;