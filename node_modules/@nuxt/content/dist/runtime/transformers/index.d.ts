import type { StorageValue } from 'unstorage';
import type { TransformContentOptions } from '../types';
/**
 * Parse content file using registered plugins
 */
export declare function transformContent(id: string, content: StorageValue, options?: TransformContentOptions): Promise<import("../types").ParsedContent | {
    _id: string;
    body: StorageValue;
}>;
export { defineTransformer } from './utils';
