const sameNameInTSConfigAndGruntTS = [
    'allowJs',
    'allowSyntheticDefaultImports',
    'allowUnreachableCode',
    'allowUnusedLabels',
    'baseUrl',
    'charset',
    'declaration',
    'declarationDir',
    'diagnostics',
    'emitBOM',
    'emitDecoratorMetadata',
    'experimentalAsyncFunctions',
    'experimentalDecorators',
    'forceConsistentCasingInFileNames',
    'isolatedModules',
    'inlineSourceMap',
    'inlineSources',
    'jsx',
    'lib',
    'listEmittedFiles',
    'listFiles',
    'locale',
    'mapRoot',
    'maxNodeModuleJsDepth',
    'module',
    'moduleResolution',
    'newLine',
    'noEmit',
    'noEmitHelpers',
    'noEmitOnError',
    'noErrorTruncation',
    'noFallthroughCasesInSwitch',
    'noImplicitAny',
    'noImplicitReturns',
    'noImplicitThis',
    'noImplicitUseStrict',
    'noLib',
    'noLibCheck',
    'noResolve',
    'noUnusedLocals',
    'noUnusedParameters',
    'out',
    //'outFile', // outFile is handled below.
    'outDir',
    'paths',
    'preserveConstEnums',
    'pretty',
    'reactNamespace',
    'removeComments',
    'rootDir',
    'rootDirs',
    'skipLibCheck',
    'skipDefaultLibCheck',
    'sourceMap',
    'sourceRoot',
    'stripInternal',
    'suppressExcessPropertyErrors',
    'suppressImplicitAnyIndexErrors',
    'target',
    'traceResolution',
    'types',
    'typeRoots'
];


export function convertGruntTsContextToTsConfig(ctx: grunt.task.IMultiTask<IGruntTsGruntfileConfiguration>) {

    const result = {},
      co = ctx.data.options;

    if (co == undefined) {
      throw "Unable to read options object.";
    }

    sameNameInTSConfigAndGruntTS.forEach(propertyName => {
        if ((propertyName in co) && !(propertyName in result)) {
            result[propertyName] = co[propertyName];
        }
    });

    console.log(JSON.stringify(co, null, 2));
    return result;
}
