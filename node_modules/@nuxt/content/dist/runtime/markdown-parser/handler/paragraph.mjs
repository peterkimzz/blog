import { all } from "mdast-util-to-hast";
import { kebabCase } from "scule";
import htmlTags from "../../utils/html-tags.mjs";
import { getTagName } from "./utils.mjs";
export default function paragraph(h, node) {
  if (node.children && node.children[0] && node.children[0].type === "html") {
    const tagName = kebabCase(getTagName(node.children[0].value) || "div");
    if (!htmlTags.includes(tagName)) {
      return all(h, node);
    }
  }
  return h(node, "p", all(h, node));
}
