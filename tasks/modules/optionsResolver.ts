import * as _ from "lodash";

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

const gruntTSExtensionProperties = ["compile", "compiler", "emitGruntEvents", "failOnTypeErrors"];


export function convertGruntTsContextToTsConfig(ctx: grunt.task.IMultiTask<IGruntTsGruntfileConfiguration>): ITSConfigJsonFile {

    if (ctx == undefined || ctx.data == undefined) {
        throw "Grunt task context or data is undefined."
    }

    if (ctx.data.options == undefined) {
      throw "Task options are undefined.";
    }

    const result: ITSConfigJsonFile = {
        compilerOptions: {},
        gruntTsExtensions: {
            compile: true,
            compiler: "node_modules/typescript/lib/tsc.js",
            emitGruntEvents: false,
            failOnTypeErrors: false
        }
    };
    const co = ctx.data.options;

    sameNameInTSConfigAndGruntTS.forEach(propertyName => {
        if ((propertyName in co) && !(propertyName in result)) {
            result.compilerOptions![propertyName] = co[propertyName];
        }
    });

    gruntTSExtensionProperties.forEach(propertyName => {
        if ((propertyName in co) && !(propertyName in result)) {
            result.gruntTsExtensions![propertyName] = co[propertyName];
        }
    });

    // grunt-ts supports 'comments' which is the inverse of removeComments.
    if ("comments" in co && co.comments != undefined) {
        result.compilerOptions!.removeComments = !co.comments;
    }

    if ("additionalTsConfigOptions" in co && co.additionalTsConfigOptions != undefined) {
        _.merge(result, co.additionalTsConfigOptions);
    }

    return result;
}
