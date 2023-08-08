import { NavItem, ParsedContentMeta } from '../types';
type PrivateNavItem = NavItem & {
    path?: string;
};
/**
 * Create NavItem array to be consumed from runtime plugin.
 */
export declare function createNav(contents: ParsedContentMeta[], configs: Record<string, ParsedContentMeta>): PrivateNavItem[];
export {};
