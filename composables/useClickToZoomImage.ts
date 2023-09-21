import mediumZoom from "medium-zoom";

export function useClickToZoomImage() {
  onMounted(() => {
    mediumZoom("[data-zoomable]", {
      background: "#000000e6",
    });
  });
}
