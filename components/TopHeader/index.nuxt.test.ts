import { renderSuspended } from "@nuxt/test-utils/runtime";
import { screen } from "@testing-library/vue";
import { it, expect } from "vitest";

import TopHeader from "./index.vue";

// it("is a Vue instance", () => {
//   const wrapper = mount(TopHeader);
//   expect(wrapper.vm).toBeTruthy();
// });

it("can render a page logo.", async () => {
  await renderSuspended(TopHeader);
  expect(screen.getByText(/peterkim/gi)).toBeDefined();
});
