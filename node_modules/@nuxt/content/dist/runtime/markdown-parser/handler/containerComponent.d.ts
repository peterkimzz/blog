import type { H } from 'mdast-util-to-hast';
import type { MdastContent } from 'mdast-util-to-hast/lib';
type Node = MdastContent & {
    tagName: string;
    attributes?: any;
    fmAttributes?: any;
};
export default function containerComponent(h: H, node: Node): any;
export {};
