import type { NavItem } from '../types';
export declare const useContentHelpers: () => {
    navBottomLink: (link: NavItem) => string | undefined;
    navDirFromPath: (path: string, tree: NavItem[]) => NavItem[] | undefined;
    navPageFromPath: (path: string, tree: NavItem[]) => NavItem | undefined;
    navKeyFromPath: (path: string, key: string, tree: NavItem[]) => any;
};
