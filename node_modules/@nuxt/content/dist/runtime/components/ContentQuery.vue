<script>
import { hash } from "ohash";
import { toRefs, defineComponent, h, useSlots, watch } from "vue";
import { computed, useAsyncData, queryContent } from "#imports";
export default defineComponent({
  name: "ContentQuery",
  props: {
    /**
     * The path of the content to load from content source.
     */
    path: {
      type: String,
      required: false,
      default: void 0
    },
    /**
     * Select a subset of fields
     */
    only: {
      type: Array,
      required: false,
      default: void 0
    },
    /**
     * Remove a subset of fields
     */
    without: {
      type: Array,
      required: false,
      default: void 0
    },
    /**
     * Filter results
     */
    where: {
      type: Object,
      required: false,
      default: void 0
    },
    /**
     * Sort results
     */
    sort: {
      type: Object,
      required: false,
      default: void 0
    },
    /**
     * Limit number of results
     */
    limit: {
      type: Number,
      required: false,
      default: void 0
    },
    /**
     * Skip number of results
     */
    skip: {
      type: Number,
      required: false,
      default: void 0
    },
    /**
     * Filter contents based on locale
     */
    locale: {
      type: String,
      required: false,
      default: void 0
    },
    /**
     * A type of query to be made.
     */
    find: {
      type: String,
      required: false,
      default: void 0
    }
  },
  async setup(props) {
    const {
      path,
      only,
      without,
      where,
      sort,
      limit,
      skip,
      locale,
      find
    } = toRefs(props);
    const isPartial = computed(() => path.value?.includes("/_"));
    watch(() => props, () => refresh(), { deep: true });
    const { data, refresh } = await useAsyncData(
      `content-query-${hash(props)}`,
      () => {
        let queryBuilder;
        if (path.value) {
          queryBuilder = queryContent(path.value);
        } else {
          queryBuilder = queryContent();
        }
        if (only.value) {
          queryBuilder = queryBuilder.only(only.value);
        }
        if (without.value) {
          queryBuilder = queryBuilder.without(without.value);
        }
        if (where.value) {
          queryBuilder = queryBuilder.where(where.value);
        }
        if (sort.value) {
          queryBuilder = queryBuilder.sort(sort.value);
        }
        if (limit.value) {
          queryBuilder = queryBuilder.limit(limit.value);
        }
        if (skip.value) {
          queryBuilder = queryBuilder.skip(skip.value);
        }
        if (locale.value) {
          queryBuilder = queryBuilder.where({ _locale: locale.value });
        }
        if (find.value === "one") {
          return queryBuilder.findOne();
        }
        if (find.value === "surround") {
          if (!path.value) {
            console.warn("[Content] Surround queries requires `path` prop to be set.");
            console.warn("[Content] Query without `path` will return regular `find()` results.");
            return queryBuilder.find();
          }
          return queryBuilder.findSurround(path.value);
        }
        return queryBuilder.find();
      }
    );
    return {
      isPartial,
      data,
      refresh
    };
  },
  /**
   * Content not found fallback
   * @slot not-found
   */
  render(ctx) {
    const slots = useSlots();
    const {
      // Setup
      data,
      refresh,
      isPartial,
      // Props
      path,
      only,
      without,
      where,
      sort,
      limit,
      skip,
      locale,
      find
    } = ctx;
    const props = {
      path,
      only,
      without,
      where,
      sort,
      limit,
      skip,
      locale,
      find
    };
    if (props.find === "one") {
      if (!data && slots?.["not-found"]) {
        return slots["not-found"]({ props, ...this.$attrs });
      }
      if (slots?.empty && data?._type === "markdown" && !data?.body?.children.length) {
        return slots.empty({ props, ...this.$attrs });
      }
    } else if (!data || !data.length) {
      if (slots?.["not-found"]) {
        return slots["not-found"]({ props, ...this.$attrs });
      }
    }
    if (slots?.default) {
      return slots.default({ data, refresh, isPartial, props, ...this.$attrs });
    }
    const emptyNode = (slot, data2) => h("pre", null, JSON.stringify({ message: "You should use slots with <ContentQuery>!", slot, data: data2 }, null, 2));
    return emptyNode("default", { data, props, isPartial });
  }
});
</script>
