
function gruntUtilSpawnAsync(grunt: IGrunt, options: grunt.util.ISpawnOptions): Promise<{error: Error, result: grunt.util.ISpawnResult, code: number}> {
  return new Promise((resolve, reject) => {
    const child = grunt.util.spawn(options, (error, result, code) => {
      resolve({error, result, code});
    });
  });
}

export interface ICompileResult {
  error?: Error;
  stdout?: string;
  /** code 0 = OK, 1 = errors detected - no emit, 2 = errors detected - emitted anyway */
  exitCode?: number;
  runtimeInMs?: number;
}

export async function compile(grunt: IGrunt, temporaryTsConfigJsonFileName: string) {
    const startTime = new Date();
    const result : ICompileResult = {error: undefined, stdout: undefined, exitCode: undefined, runtimeInMs: undefined};
    try {
      const tscArgs = ["node_modules/typescript/lib/tsc.js", "-p", temporaryTsConfigJsonFileName];
      {
        const executionResult = await gruntUtilSpawnAsync(grunt, {cmd: process.execPath, args: tscArgs});
        result.exitCode = executionResult.code;
        result.stdout = executionResult.result.stdout;
      }
      grunt.log.writeln(result.stdout);
      result.runtimeInMs = (new Date()).getTime() - startTime.getTime();
      grunt.log.verbose.writeln(`TypeScript exit code: ${result.exitCode}.  Took ${result.runtimeInMs} ms.`);
    } catch(error) {
      result.error = error;
    }
    return result;
}