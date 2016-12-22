import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as crypto from "crypto";
import * as bluebird from "bluebird";

Promise = bluebird;

const openAsync = <Function>bluebird.promisify(fs.open) as
        (path: string, flags: string, mode: number) => number,
    writeAsync = <Function>bluebird.promisify(fs.write) as
        (fd: number, buffer: Buffer, offset: number, length: number, position: number | null) => number,
    closeAsync = <Function>bluebird.promisify(fs.close) as (fd: number) => undefined,
    tempDir = os.tmpdir(),
    OPEN_FOR_WRITING_BUT_FAIL_IF_PATH_EXISTS = 'wx',
    ANYONE_READWRITE_NOT_EXECUTE = 0o0666;


export async function emitTemporaryTsconfigJsonAsync(tsconfig: ITSConfigJsonFile, ctx: grunt.task.IMultiTask<IGruntTsGruntfileConfiguration>): Promise<string> {

    const tempFile = await openTempTsconfigAsync();

    const content = new Buffer(JSON.stringify(tsconfig), 'utf8');

    try {
        const writeResult = await writeAsync(tempFile.fileDescriptor,content,0, content.length, null);
    } catch(error) {
        throw `Error writing to ${tempFile.path}: ${error}`;
    }

    try {
        const closeResult = await closeAsync(tempFile.fileDescriptor);
    } catch(error) {
        throw `Error closing ${tempFile.path}: ${error}`;
    }
    
    return tempFile.path;
    
}

async function openTempTsconfigAsync(): Promise<{fileDescriptor: number, path: string}> {
    const maxTries = 20;
    let i = 0;
    const errors: string[] = [];

    while (i < maxTries) {
        const buffer = crypto.randomBytes(16);
        const temporaryTsConfigJsonPath = path.join(tempDir, buffer.toString('hex') + "-tsconfig.json");
        try {
            const openFileDescriptor = await openAsync(temporaryTsConfigJsonPath, OPEN_FOR_WRITING_BUT_FAIL_IF_PATH_EXISTS, ANYONE_READWRITE_NOT_EXECUTE);
            return {fileDescriptor: openFileDescriptor, path: temporaryTsConfigJsonPath};
        } catch(error) {
            if (errors.indexOf(error) === -1) {
                errors.push(error);
            }
        }
        i += 1;
    }

    throw `Could not obtain a valid temporary file in ${tempDir} in ${maxTries} tries.  Errors: ${errors.join(". ")}`;
}