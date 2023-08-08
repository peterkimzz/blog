import type { H } from 'mdast-util-to-hast';
import type { MdastContent } from 'mdast-util-to-hast/lib';
type Node = MdastContent & {
    title: string;
    url: string;
    attributes?: any;
    tagName: string;
    children?: Node[];
};
export default function link(h: H, node: Node): import("hast").Element;
export {};
