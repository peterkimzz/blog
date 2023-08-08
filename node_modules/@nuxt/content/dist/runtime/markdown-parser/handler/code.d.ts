import type { H } from 'mdast-util-to-hast';
import type { MdastContent } from 'mdast-util-to-hast/lib';
type Node = MdastContent & {
    lang: string;
    meta: string;
    value: string;
};
declare const _default: (h: H, node: Node) => import("hast").Element;
export default _default;
