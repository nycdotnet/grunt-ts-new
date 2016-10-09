import "grunt";
import * as Promise from "bluebird";

const gruntPlugin = (grunt: grunt.task.TaskModule) => {
  grunt.registerMultiTask('ts', 'TypeScript integration for Grunt', function (this: grunt.task.IMultiTask<IGruntTsGruntfileConfiguration>) {
    const gruntDone = this.async();
    console.log(`declaration is : ${this.data.options.declaration}`);
    runGruntTsAsync(this).then(() => {
      console.log("success.");
      gruntDone();
    }).catch((error) => {
      console.log("failed with error: " + error);
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

  // this is nonsense just to prove it works.
  if (ctx.data.options.declaration === true) {
    console.log("I see declaration, therefore we are going to resolve.");
    gruntTsCompletedSuccessfully();
  } else {
    console.log("I see declaration as false, therefore we are going to reject.");
    gruntTsFailedWithError("declaration is false");
  }

};


export = gruntPlugin;
