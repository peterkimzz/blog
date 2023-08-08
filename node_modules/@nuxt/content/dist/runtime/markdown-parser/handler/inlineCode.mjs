import { u } from "unist-builder";
export default function inlineCode(h, node) {
  return h(node, "code-inline", node.attributes, [
    // @ts-ignore
    u("text", node.value.replace(/\r?\n|\r/g, " "))
  ]);
}
