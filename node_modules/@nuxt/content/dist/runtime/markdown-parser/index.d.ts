import { MarkdownOptions, MarkdownParsedContent } from '../types';
export declare const useDefaultOptions: () => MarkdownOptions;
export declare function parse(file: string, userOptions?: Partial<MarkdownOptions>): Promise<{
    meta: Partial<MarkdownParsedContent>;
    body: MarkdownParsedContent['body'];
}>;
