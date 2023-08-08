import type { H3Event } from 'h3';
import type { ParsedContent, QueryBuilder } from '../types';
export declare function getContentIndex(event: H3Event): Promise<Record<string, string[]>>;
export declare function getIndexedContentsList<T = ParsedContent>(event: H3Event, query: QueryBuilder<T>): Promise<T[]>;
