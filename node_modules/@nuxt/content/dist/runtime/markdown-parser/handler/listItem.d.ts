import type { H } from 'mdast-util-to-hast';
import type { MdastContent } from 'mdast-util-to-hast/lib';
type Node = MdastContent & {
    tagName: string;
    checked?: boolean;
    spread?: boolean;
    children?: Node[];
};
export default function listItem(h: H, node: Node, parent: Node): import("hast").Element;
export {};
