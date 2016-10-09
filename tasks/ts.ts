import * as Promise from "bluebird";
import * as optionsResolver from "./modules/optionsResolver";

const gruntPlugin = (grunt: IGrunt) => {
  grunt.registerMultiTask('ts', 'TypeScript integration for Grunt', function (this: grunt.task.IMultiTask<IGruntTsGruntfileConfiguration>) {
    const gruntDone = this.async();

    // run hook for integration tests, if available.
    if (this.data.options && this.data.options.__integrationTestFunction) {
      try {
        const testResult = this.data.options.__integrationTestFunction(this, grunt);
        if (testResult) {
          return gruntDone();
        }
      } catch (ex) {
        grunt.log.error(ex);
        grunt.log.writeln(JSON.stringify(this));
        return gruntDone(false);
      }
      grunt.log.error("Current test failed, but did not throw exception.");
      grunt.log.writeln(JSON.stringify(this));
      return gruntDone(false);
    }

    // run grunt-ts as a promise.
    runGruntTsAsync(this).then(() => {
       gruntDone();
    }).catch((error) => {
      grunt.log.error(`failed with error: ${error}`);
      gruntDone(false);
    });
  });
};


const runGruntTsAsync = (ctx: grunt.task.IMultiTask<IGruntTsGruntfileConfiguration>) => {
  return new Promise((resolve, reject) => {
    runGruntTs(ctx, resolve, reject);
  });
};

/**
*  Within this function, call gruntTsCompletedSuccessfully() to complete
*   grunt-ts with success.  Call gruntTsFailedWithError(errorString) with the
*   error to fail the component.
*/
const runGruntTs = (ctx: grunt.task.IMultiTask<IGruntTsGruntfileConfiguration>,
    gruntTsCompletedSuccessfully : () => void,
    gruntTsFailedWithError: (error?: string) => void) => {

  //console.log(JSON.stringify(ctx));

  // // this is nonsense just to prove it works.
  // if (ctx.data.options.declaration === true) {
  //   console.log("I see declaration, therefore we are going to resolve.");
  //   gruntTsCompletedSuccessfully();
  // } else {
  //   console.log("I see declaration as false, therefore we are going to reject.");
  //   gruntTsFailedWithError("declaration is false");
  // }

  let resultingTsConfigObject: Object;

  try {
    resultingTsConfigObject = optionsResolver.convertGruntTsContextToTsConfig(ctx);
  } catch (ex) {
    gruntTsFailedWithError(ex);
  }

  gruntTsCompletedSuccessfully();
};


export = gruntPlugin;
