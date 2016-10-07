const pluginFunction = (grunt: grunt.task.TaskModule) => {

  grunt.registerMultiTask('ts', 'TypeScript integration for Grunt', function (this: grunt.task.IMultiTask<any>) {
    const done = this.async();
  });

}

export default pluginFunction;
