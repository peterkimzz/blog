import type { H } from 'mdast-util-to-hast';
import type { MdastContent } from 'mdast-util-to-hast/lib';
type Node = MdastContent & {
    value: string;
    attributes?: any;
};
export default function inlineCode(h: H, node: Node): import("hast").Element;
export {};
