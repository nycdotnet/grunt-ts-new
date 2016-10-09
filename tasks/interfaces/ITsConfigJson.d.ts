interface ITSConfigJsonFile {
    compilerOptions?: ITsConfigJsonCompilerOptions;
    files?: string[];
    exclude?: string[];
    include?: string[];
    filesGlob?: string[];
}

// originally sourced from atom-typescript
interface ITsConfigJsonCompilerOptions {
    allowNonTsExtensions?: boolean;
    charset?: string;
    codepage?: number;
    declaration?: boolean;
    diagnostics?: boolean;
    emitBOM?: boolean;
    experimentalAsyncFunctions?: boolean;
    experimentalDecorators?: boolean;
    emitDecoratorMetadata?: boolean;
    help?: boolean;
    isolatedModules?: boolean;
    inlineSourceMap?: boolean;
    inlineSources?: boolean;
    jsx?: string;
    locale?: string;
    mapRoot?: string;
    module?: string;
    moduleResolution: string;
    newLine?: string;
    noEmit?: boolean;
    noEmitHelpers?: boolean;
    noEmitOnError?: boolean;
    noErrorTruncation?: boolean;
    noImplicitAny?: boolean;
    noLib?: boolean;
    noLibCheck?: boolean;
    noResolve?: boolean;
    out?: string;
    outFile?: string;
    outDir?: string;
    preserveConstEnums?: boolean;
    removeComments?: boolean;
    rootDir?: string;
    sourceMap?: boolean;
    sourceRoot?: string;
    suppressImplicitAnyIndexErrors?: boolean;
    target?: string;
    version?: boolean;
    watch?: boolean;
}
