import mediumZoom from "medium-zoom";

export function useClickToImageZoom() {
  onMounted(() => {
    mediumZoom("[data-zoomable]", {
      background: "#000000e6",
    });
  });
}