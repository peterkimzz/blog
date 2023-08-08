import { all } from "mdast-util-to-hast";
export default function emphasis(h, node) {
  return h(node, "em", node.attributes, all(h, node));
}
