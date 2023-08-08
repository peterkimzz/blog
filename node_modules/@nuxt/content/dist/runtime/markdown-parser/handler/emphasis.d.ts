import type { H } from 'mdast-util-to-hast';
import type { MdastContent } from 'mdast-util-to-hast/lib';
type Node = MdastContent & {
    attributes?: any;
};
export default function emphasis(h: H, node: Node): import("hast").Element;
export {};
