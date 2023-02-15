import { helpersPath } from './helpersPath';

export function getFilePath(fileName: string): string {
    return `${helpersPath}${fileName}`;
}
