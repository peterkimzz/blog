import type { H } from 'mdast-util-to-hast';
import { MdastContent } from 'mdast-util-to-hast/lib';
type Node = MdastContent & {
    children: any[];
};
export default function paragraph(h: H, node: Node): import("hast").Element | import("hast").ElementContent[];
export {};
