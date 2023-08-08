import { MarkdownNode } from '../../types';
export declare function flattenNodeText(node: MarkdownNode): string;
export declare function flattenNode(node: MarkdownNode, maxDepth?: number, _depth?: number): Array<MarkdownNode>;
export declare function setNodeData(node: MarkdownNode & {
    data: any;
}, name: string, value: any, pageData: any): void;
