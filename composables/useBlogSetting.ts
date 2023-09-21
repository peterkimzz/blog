import { Constants } from "~/utils/constants";

export function useBlogSetting() {
  const { $gtag } = useNuxtApp();

  const contentPosition = useState<"left" | "right" | string>();

  function toggleContentPosition() {
    switch (contentPosition.value) {
      case "left":
        contentPosition.value = "right";
        break;
      case "right":
        contentPosition.value = "left";
        break;
      default:
        console.error("invalid toggle contentPosition", contentPosition.value);
        break;
    }
    localStorage.setItem(
      Constants.LOCAL_STORAGE.CONTENT_POSITION,
      contentPosition.value
    );
    $gtag.setEvent(Constants.EVENT_TRACKING.CLICK_SWITCH_POSITION, {
      changedPosition: contentPosition.value,
    });
  }

  // Sync Local Storage Values
  onMounted(() => {
    contentPosition.value =
      localStorage.getItem(Constants.LOCAL_STORAGE.CONTENT_POSITION) ?? "right";
  });

  return { contentPosition, toggleContentPosition };
}
