import { ContentTransformer } from '../types';
export declare const defineTransformer: (transformer: ContentTransformer) => ContentTransformer;
export declare const createSingleton: <T, Params extends any[]>(fn: (...arg: Params) => T) => (...args: Params) => T;
