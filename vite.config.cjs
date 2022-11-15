import { resolve } from "path";
import { defineConfig } from "vite";
import glob from "glob";
import handlebars from "vite-plugin-handlebars";
import viteImagemin from "vite-plugin-imagemin";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

function handlebarsOverride(options) {
  const plugin = handlebars(options);
  delete plugin.handleHotUpdate;
  return plugin;
}

export default defineConfig({
  root,
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: glob.sync(resolve(__dirname, "src", "*.html")),
      output: {
        entryFileNames: "js/[name].js",
        chunkFileNames: "js/[name].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
  plugins: [
    handlebarsOverride({
      partialDirectory: resolve(root, "partials"),
      reloadOnPartialChange: true,
    }),
    // viteImagemin({
    //   gifsicle: {
    //     optimizationLevel: 3,
    //     interlaced: false,
    //   },
    //   optipng: {
    //     optimizationLevel: 7,
    //   },
    //   mozjpeg: {
    //     quality: 90,
    //   },
    //   pngquant: {
    //     quality: [0.8, 0.9],
    //     speed: 4,
    //   },
    //   svgo: {
    //     plugins: [
    //       {
    //         name: "removeViewBox",
    //       },
    //       {
    //         name: "removeEmptyAttrs",
    //         active: false,
    //       },
    //     ],
    //   },
    // }),
  ],
});
