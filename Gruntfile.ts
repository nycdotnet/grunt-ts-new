
const gruntTsConfig : {[index: string] : IGruntTsGruntfileConfiguration} = {
  default: {
    options: {
      declaration: false
    }
  }
};

const gruntFunction = function (grunt: IGrunt) {
  grunt.initConfig({
    ts : gruntTsConfig
  });
  grunt.loadTasks('tasks');
  grunt.registerTask('default', ['ts']);
};

export = gruntFunction;
