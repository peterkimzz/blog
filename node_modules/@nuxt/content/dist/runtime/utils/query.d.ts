import { H3Event } from 'h3';
import { QueryBuilderParams } from '../types';
export declare const encodeQueryParams: (params: QueryBuilderParams) => string;
export declare const decodeQueryParams: (encoded: string) => any;
export declare const getContentQuery: (event: H3Event) => QueryBuilderParams;
