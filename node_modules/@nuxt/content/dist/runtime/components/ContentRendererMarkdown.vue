<script>
import { h, resolveComponent, Text, defineComponent, toRaw } from "vue";
import destr from "destr";
import { pascalCase } from "scule";
import { find, html } from "property-information";
import { useRuntimeConfig, useRoute } from "#app";
import htmlTags from "../utils/html-tags";
import { useContentPreview } from "../composables/preview";
const DEFAULT_SLOT = "default";
const rxOn = /^@|^v-on:/;
const rxBind = /^:|^v-bind:/;
const rxModel = /^v-model/;
const nativeInputs = ["select", "textarea", "input"];
export default defineComponent({
  name: "ContentRendererMarkdown",
  props: {
    /**
     * Content to render
     */
    value: {
      type: Object,
      required: true
    },
    /**
     * Render only the excerpt
     */
    excerpt: {
      type: Boolean,
      default: false
    },
    /**
     * Root tag to use for rendering
     */
    tag: {
      type: String,
      default: "div"
    },
    /**
     * The map of custom components to use for rendering.
     */
    components: {
      type: Object,
      default: () => ({})
    }
  },
  async setup(props) {
    const { content: { tags = {} } } = useRuntimeConfig().public;
    const debug = process.dev || useContentPreview().isEnabled();
    let body = props.value?.body || props.value;
    if (props.excerpt && props.value?.excerpt) {
      body = props.value.excerpt;
    }
    if (body) {
      await resolveContentComponents(body, {
        tags: {
          ...tags,
          ...toRaw(props.value?._components || {}),
          ...props.components
        }
      });
    }
    return { debug, tags };
  },
  render(ctx) {
    const { tags, tag, value, excerpt, components, debug } = ctx;
    if (!value) {
      return null;
    }
    let body = value?.body || value;
    if (excerpt && value?.excerpt) {
      body = value.excerpt;
    }
    const meta = {
      ...value,
      tags: {
        ...tags,
        ...toRaw(value?._components || {}),
        ...components
      }
    };
    let component = meta.component || tag;
    if (typeof meta.component === "object") {
      component = meta.component.name;
    }
    component = resolveVueComponent(component);
    return h(
      component,
      {
        ...meta.component?.props,
        ...this.$attrs,
        "data-content-id": debug ? value._id : void 0
      },
      renderSlots(body, h, meta, meta)
    );
  }
});
function renderNode(node, h2, documentMeta, parentScope = {}) {
  if (node.type === "text") {
    return h2(Text, node.value);
  }
  if (node.tag === "script") {
    return h2(Text, renderToText(node));
  }
  const originalTag = node.tag;
  const renderTag = typeof node.props?.__ignoreMap === "undefined" && documentMeta.tags[originalTag] || originalTag;
  if (node.tag === "binding") {
    return renderBinding(node, h2, documentMeta, parentScope);
  }
  const component = resolveVueComponent(renderTag);
  if (typeof component === "object") {
    component.tag = originalTag;
  }
  const props = propsToData(node, documentMeta);
  return h2(
    component,
    props,
    renderSlots(node, h2, documentMeta, { ...parentScope, ...props })
  );
}
function renderToText(node) {
  if (node.type === "text") {
    return node.value;
  }
  if (!node.children?.length) {
    return `<${node.tag}>`;
  }
  return `<${node.tag}>${node.children?.map(renderToText).join("") || ""}</${node.tag}>`;
}
function renderBinding(node, h2, documentMeta, parentScope = {}) {
  const data = {
    ...parentScope,
    $route: () => useRoute(),
    $document: documentMeta,
    $doc: documentMeta
  };
  const splitter = /\.|\[(\d+)\]/;
  const keys = node.props?.value.trim().split(splitter).filter(Boolean);
  const value = keys.reduce((data2, key) => {
    if (key in data2) {
      if (typeof data2[key] === "function") {
        return data2[key]();
      } else {
        return data2[key];
      }
    }
    return {};
  }, data);
  return h2(Text, value);
}
function renderSlots(node, h2, documentMeta, parentProps) {
  const children = node.children || [];
  const slotNodes = children.reduce((data, node2) => {
    if (!isTemplate(node2)) {
      data[DEFAULT_SLOT].push(node2);
      return data;
    }
    const slotName = getSlotName(node2);
    data[slotName] = data[slotName] || [];
    data[slotName].push(...node2.children || []);
    return data;
  }, {
    [DEFAULT_SLOT]: []
  });
  const slots = Object.entries(slotNodes).reduce((slots2, [name, children2]) => {
    if (!children2.length) {
      return slots2;
    }
    slots2[name] = () => {
      const vNodes = children2.map((child) => renderNode(child, h2, documentMeta, parentProps));
      return mergeTextNodes(vNodes);
    };
    return slots2;
  }, {});
  return slots;
}
function propsToData(node, documentMeta) {
  const { tag = "", props = {} } = node;
  return Object.keys(props).reduce(function(data, key) {
    if (key === "__ignoreMap") {
      return data;
    }
    const value = props[key];
    if (rxModel.test(key) && !nativeInputs.includes(tag)) {
      return propsToDataRxModel(key, value, data, documentMeta);
    }
    if (key === "v-bind") {
      return propsToDataVBind(key, value, data, documentMeta);
    }
    if (rxOn.test(key)) {
      return propsToDataRxOn(key, value, data, documentMeta);
    }
    if (rxBind.test(key)) {
      return propsToDataRxBind(key, value, data, documentMeta);
    }
    const { attribute } = find(html, key);
    if (Array.isArray(value) && value.every((v) => typeof v === "string")) {
      data[attribute] = value.join(" ");
      return data;
    }
    data[attribute] = value;
    return data;
  }, {});
}
function propsToDataRxModel(key, value, data, documentMeta) {
  const number = (d) => +d;
  const trim = (d) => d.trim();
  const noop = (d) => d;
  const mods = key.replace(rxModel, "").split(".").filter((d) => d).reduce((d, k) => {
    d[k] = true;
    return d;
  }, {});
  const field = "value";
  const event = mods.lazy ? "change" : "input";
  const processor = mods.number ? number : mods.trim ? trim : noop;
  data[field] = evalInContext(value, documentMeta);
  data.on = data.on || {};
  data.on[event] = (e) => documentMeta[value] = processor(e);
  return data;
}
function propsToDataVBind(_key, value, data, documentMeta) {
  const val = evalInContext(value, documentMeta);
  data = Object.assign(data, val);
  return data;
}
function propsToDataRxOn(key, value, data, documentMeta) {
  key = key.replace(rxOn, "");
  data.on = data.on || {};
  data.on[key] = () => evalInContext(value, documentMeta);
  return data;
}
function propsToDataRxBind(key, value, data, documentMeta) {
  key = key.replace(rxBind, "");
  data[key] = evalInContext(value, documentMeta);
  return data;
}
const resolveVueComponent = (component) => {
  if (!htmlTags.includes(component) && !component?.render) {
    const componentFn = resolveComponent(pascalCase(component), false);
    if (typeof componentFn === "object") {
      return componentFn;
    }
  }
  return component;
};
function evalInContext(code, context) {
  const result = code.split(".").reduce((o, k) => typeof o === "object" ? o[k] : void 0, context);
  return typeof result === "undefined" ? destr(code) : result;
}
function getSlotName(node) {
  let name = "";
  for (const propName of Object.keys(node.props || {})) {
    if (!propName.startsWith("#") && !propName.startsWith("v-slot:")) {
      continue;
    }
    name = propName.split(/[:#]/, 2)[1];
    break;
  }
  return name || DEFAULT_SLOT;
}
function isTemplate(node) {
  return node.tag === "template";
}
function mergeTextNodes(nodes) {
  const mergedNodes = [];
  for (const node of nodes) {
    const previousNode = mergedNodes[mergedNodes.length - 1];
    if (node.type === Text && previousNode?.type === Text) {
      previousNode.children = previousNode.children + node.children;
    } else {
      mergedNodes.push(node);
    }
  }
  return mergedNodes;
}
async function resolveContentComponents(body, meta) {
  const components = Array.from(new Set(loadComponents(body, meta)));
  await Promise.all(components.map(async (c) => {
    if (c?.render) {
      return;
    }
    const resolvedComponent = resolveComponent(c);
    if (resolvedComponent?.__asyncLoader && !resolvedComponent.__asyncResolved) {
      await resolvedComponent.__asyncLoader();
    }
  }));
  function loadComponents(node, documentMeta) {
    if (node.type === "text" || node.tag === "binding") {
      return [];
    }
    const renderTag = typeof node.props?.__ignoreMap === "undefined" && documentMeta.tags[node.tag] || node.tag;
    const components2 = [];
    if (node.type !== "root" && !htmlTags.includes(renderTag)) {
      components2.push(renderTag);
    }
    for (const child of node.children || []) {
      components2.push(...loadComponents(child, documentMeta));
    }
    return components2;
  }
}
</script>
