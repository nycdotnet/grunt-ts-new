import "grunt";

const pluginFunction = (grunt: grunt.task.TaskModule) => {

  grunt.registerMultiTask('ts', 'TypeScript integration for Grunt', function (this: grunt.task.IMultiTask<IGruntTsGruntfileConfiguration>) {
    const gruntDone = this.async();
    console.log(`This is what I got: ${JSON.stringify(this)}`);
    console.log(`declaration is : ${this.data.options.declaration}`);

    gruntDone();
  });

}

export = pluginFunction;
