import { defineConfig } from "tsdown";
import vuePlugin from "unplugin-vue/rolldown";

export default defineConfig({
  entry: "src/index.ts",
  format: "esm",
  target: "node20",
  plugins: [vuePlugin()],
});
