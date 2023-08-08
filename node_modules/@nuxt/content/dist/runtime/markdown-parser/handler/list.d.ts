import type { H } from 'mdast-util-to-hast';
import type { MdastContent } from 'mdast-util-to-hast/lib';
type Node = MdastContent & {
    ordered?: boolean;
    start?: number;
    checked?: boolean;
    children: Node[];
};
export default function list(h: H, node: Node): import("hast").Element;
export {};
