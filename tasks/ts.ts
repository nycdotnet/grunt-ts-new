import * as optionsResolver from "./modules/optionsResolver";
import * as tsconfigEmitter from "./modules/tsconfigEmitter";
import * as compilerRunner from "./modules/compilerRunner";
import * as bluebird from "bluebird";

const fail_event = 'grunt-ts.failure';

Promise = bluebird;
let startTime: Date;

const processIntegrationTest = (ctx: grunt.task.IMultiTask<IGruntTsGruntfileConfiguration>, grunt: IGrunt) : false | undefined => {
  try {
      const testResult = ctx.data.options!.__integrationTestFunction!(ctx, grunt);
      if (testResult) {
        return undefined;
      }
  } catch (ex) {
      grunt.log.error(ex);
      grunt.log.writeln(JSON.stringify(ctx,null,2));
      return false;
  }
    grunt.log.error(`${ctx.target ? "Test attached to " + ctx.target : "Current test"} failed, but did not throw exception.`);
    grunt.log.writeln(JSON.stringify(ctx,null,2));
    return false;
}


async function gruntPlugin(grunt: IGrunt) {
  grunt.registerMultiTask('ts', 'TypeScript integration for Grunt', async function (this: grunt.task.IMultiTask<IGruntTsGruntfileConfiguration>) {
    startTime = new Date();
    const gruntDone = this.async();

    if (this.data.options && this.data.options.__integrationTestFunction) {
      return gruntDone(processIntegrationTest(this, grunt));
    }

    try {
      await runGruntTsAsync(grunt, this);
      gruntDone();
    } catch(error) {
      gruntDone(grunt.util.error(`failed with error: ${error}`, error));
    }
  });
}

async function runGruntTsAsync(grunt: IGrunt, ctx: grunt.task.IMultiTask<IGruntTsGruntfileConfiguration>) {
  
  const sharedTsConfigObject = await optionsResolver.convertGruntTsContextToTsConfigAsync(grunt, ctx);
  const compileResults: compilerRunner.ICompileResult[] = [];

  for (let filesIndex = 0; filesIndex < ctx.files.length; filesIndex += 1) {
    const compilationSpecificTsConfig = optionsResolver.addFiles(sharedTsConfigObject, ctx.files[filesIndex].src || []);
    const temporaryTsConfigJsonFileName = await tsconfigEmitter.emitTemporaryTsconfigJsonAsync(compilationSpecificTsConfig, ctx);
    const result = await compilerRunner.compile(grunt, temporaryTsConfigJsonFileName);
    compileResults.push(result);
    
    if (result.exitCode !== 0) {
      if (result.exitCode === 1) {
        failGruntTs(`TypeScript compilation failure prevented emit.`, grunt, compilationSpecificTsConfig);
      } else if (result.exitCode === 2) {
        grunt.log.writeln(`TypeScript compilation completed with non-emit-preventing errors.`);
        if (compilationSpecificTsConfig.gruntTsExtensions!.failOnTypeErrors) {
          failGruntTs(`Aborting due to grunt-ts failOnTypeErrors setting.`, grunt, compilationSpecificTsConfig);
        }
      } else {
        failGruntTs(`Unknown TypeScript exit code of ${result.exitCode}.`, grunt, compilationSpecificTsConfig);
      }
    }
  }
  
  const totalRuntimeInMs = (new Date()).getTime() - startTime.getTime();
  grunt.log.writeln(`Grunt-ts complete.  Took ${totalRuntimeInMs} ms.`);

}

function failGruntTs(message: string, grunt: IGrunt, tsconfig: ITSConfigJsonFile) {
  if (tsconfig.gruntTsExtensions!.emitGruntEventInsteadOfFailing) {
    grunt.log.error(`${message} {{emitting Grunt fail event instead of failing}}`);
    grunt.event.emit(fail_event);
  } else {
    grunt.fail.warn(message);
  }
}

export = gruntPlugin;
