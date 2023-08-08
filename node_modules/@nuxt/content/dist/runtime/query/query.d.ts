import type { DatabaseFetcher, QueryBuilder, QueryBuilderParams } from '../types';
import { ParsedContent } from '../types';
export declare const createQuery: <T = ParsedContent>(fetcher: DatabaseFetcher<T>, intitialParams?: QueryBuilderParams) => QueryBuilder<T>;
