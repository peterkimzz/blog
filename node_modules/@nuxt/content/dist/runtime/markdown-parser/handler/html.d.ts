import type { H } from 'mdast-util-to-hast';
import type { MdastContent } from 'mdast-util-to-hast/lib';
type Node = MdastContent & {
    value: string;
};
export default function html(h: H, node: Node): import("hast").ElementContent | null;
export {};
