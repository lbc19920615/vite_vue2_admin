import ZGrid from "./ZGrid.vue";
import ZGridItem from "./ZGridItem.vue";

export function installZlayout(app) {
  app.component(ZGrid.name, ZGrid)
  app.component(ZGridItem.name, ZGridItem)
}
