import type { QueryBuilder } from '../../types';
export declare function createPipelineFetcher<T>(getContentsList: () => Promise<T[]>): (query: QueryBuilder<T>) => Promise<T | T[]>;
