import type { H } from 'mdast-util-to-hast';
import type { MdastContent } from 'mdast-util-to-hast/lib';
type Node = MdastContent & {
    align?: any;
    children: MdastContent[];
};
export default function table(h: H, node: Node): import("hast").Element;
export {};
