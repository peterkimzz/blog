import { all } from "mdast-util-to-hast";
export default function heading(h, node) {
  return h(node, "h" + node.depth, all(h, node));
}
