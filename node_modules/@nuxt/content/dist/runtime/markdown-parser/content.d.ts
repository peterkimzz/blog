import { MarkdownOptions, MarkdownRoot } from '../types';
/**
 * Generate text excerpt summary
 * @param {string} excerptContent - JSON AST generated from excerpt markdown.
 * @returns {string} concatinated excerpt
 */
export declare function generateDescription(excerptContent: MarkdownRoot): string;
/**
 * Generate json body
 * @param {string} content - file content
 * @param {object} data - document data
 * @returns {object} JSON AST body
 */
export declare function generateBody(content: string, options: MarkdownOptions & {
    data: any;
}): Promise<MarkdownRoot>;
export declare function contentHeading(body: MarkdownRoot): {
    title: string;
    description: string;
};
