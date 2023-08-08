import type { H } from 'mdast-util-to-hast';
import type { MdastContent } from 'mdast-util-to-hast/lib';
type Node = MdastContent & {
    url: string;
    alt: string;
    title: string;
    attributes?: any;
};
export default function image(h: H, node: Node): import("hast").Element;
export {};
