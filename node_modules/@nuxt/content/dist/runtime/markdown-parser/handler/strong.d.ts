import type { H } from 'mdast-util-to-hast';
import { MdastContent } from 'mdast-util-to-hast/lib';
type Node = MdastContent & {
    attributes?: any;
};
export default function strong(h: H, node: Node): import("hast").Element;
export {};
