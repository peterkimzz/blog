import type { ParsedContent, QueryBuilder, QueryBuilderParams } from '../types';
/**
 * Query fetcher
 */
export declare const createQueryFetch: <T = ParsedContent>() => (query: QueryBuilder<T>) => Promise<unknown>;
/**
 * Query contents from path
 */
export declare function queryContent<T = ParsedContent>(): QueryBuilder<T>;
export declare function queryContent<T = ParsedContent>(query: string, ...pathParts: string[]): QueryBuilder<T>;
export declare function queryContent<T = ParsedContent>(query: QueryBuilderParams): QueryBuilder<T>;
