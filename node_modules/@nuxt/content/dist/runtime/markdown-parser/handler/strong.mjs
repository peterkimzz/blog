import { all } from "mdast-util-to-hast";
export default function strong(h, node) {
  return h(node, "strong", node.attributes, all(h, node));
}
