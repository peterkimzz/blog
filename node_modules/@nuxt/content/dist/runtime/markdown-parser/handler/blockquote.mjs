import { all } from "mdast-util-to-hast";
import { wrap } from "./utils.mjs";
export default function blockquote(h, node) {
  return h(node, "blockquote", wrap(all(h, node), true));
}
