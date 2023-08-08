import type { VNode } from 'vue';
import { MarkdownNode } from '../../types';
/**
 * List of text nodes
 */
export declare const TEXT_TAGS: string[];
/**
 * Check virtual node's tag
 * @param vnode Virtuel node from Vue virtual DOM
 * @param tag tag name
 * @returns `true` it the virtual node match the tag
 */
export declare function isTag(vnode: VNode | MarkdownNode, tag: string | symbol): boolean;
/**
 * Check if virtual node is text node
 */
export declare function isText(vnode: VNode | MarkdownNode): boolean;
/**
 * Find children of a virtual node
 * @param vnode Virtuel node from Vue virtual DOM
 * @returns Children of given node
 */
export declare function nodeChildren(node: VNode | MarkdownNode): any;
/**
 * Calculate text content of a virtual node
 * @param vnode Virtuel node from Vue virtual DOM
 * @returns text content of given node
 */
export declare function nodeTextContent(node: VNode | MarkdownNode): string;
/**
 * Unwrap tags within a virtual node
 * @param vnode Virtuel node from Vue virtual DOM
 * @param tags list of tags to unwrap
 * @returns
 */
export declare function unwrap(vnode: VNode, tags?: string[]): VNode | VNode[];
export declare function flatUnwrap(vnodes: VNode | VNode[], tags?: string[]): VNode[];
