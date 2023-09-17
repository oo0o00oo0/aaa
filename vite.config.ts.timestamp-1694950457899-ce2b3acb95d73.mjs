// vite.config.ts
import { defineConfig } from "file:///C:/cWeb/projects/a-a-a/node_modules/vite/dist/node/index.js";
import react from "file:///C:/cWeb/projects/a-a-a/node_modules/@vitejs/plugin-react/dist/index.mjs";
import macrosPlugin from "file:///C:/cWeb/projects/a-a-a/node_modules/vite-plugin-babel-macros/dist/plugin.js";
import glsl from "file:///C:/cWeb/projects/a-a-a/node_modules/vite-plugin-glsl/src/index.js";
var vite_config_default = defineConfig({
  plugins: [react(), macrosPlugin(), glsl()],
  server: { port: 1111 },
  resolve: {
    alias: [
      { find: "@src", replacement: "/src" },
      { find: "@lib", replacement: "/src/lib" },
      { find: "@utils", replacement: "/src/utils" },
      { find: "@canvas", replacement: "/src/components/canvas" },
      { find: "@dom", replacement: "/src/components/dom" },
      { find: "@state", replacement: "/src/state" },
      { find: "@data", replacement: "/src/data" },
      { find: "@layout", replacement: "/src/layout" },
      { find: "@routing", replacement: "/src/routing" }
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxjV2ViXFxcXHByb2plY3RzXFxcXGEtYS1hXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxjV2ViXFxcXHByb2plY3RzXFxcXGEtYS1hXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9jV2ViL3Byb2plY3RzL2EtYS1hL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIlxyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCJcclxuaW1wb3J0IG1hY3Jvc1BsdWdpbiBmcm9tIFwidml0ZS1wbHVnaW4tYmFiZWwtbWFjcm9zXCJcclxuaW1wb3J0IGdsc2wgZnJvbSBcInZpdGUtcGx1Z2luLWdsc2xcIlxyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICAgcGx1Z2luczogW3JlYWN0KCksIG1hY3Jvc1BsdWdpbigpLCBnbHNsKCldLFxyXG4gICBzZXJ2ZXI6IHsgcG9ydDogMTExMSB9LFxyXG4gICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiBbXHJcbiAgICAgICAgIHsgZmluZDogXCJAc3JjXCIsIHJlcGxhY2VtZW50OiBcIi9zcmNcIiB9LFxyXG4gICAgICAgICB7IGZpbmQ6IFwiQGxpYlwiLCByZXBsYWNlbWVudDogXCIvc3JjL2xpYlwiIH0sXHJcbiAgICAgICAgIHsgZmluZDogXCJAdXRpbHNcIiwgcmVwbGFjZW1lbnQ6IFwiL3NyYy91dGlsc1wiIH0sXHJcbiAgICAgICAgIHsgZmluZDogXCJAY2FudmFzXCIsIHJlcGxhY2VtZW50OiBcIi9zcmMvY29tcG9uZW50cy9jYW52YXNcIiB9LFxyXG4gICAgICAgICB7IGZpbmQ6IFwiQGRvbVwiLCByZXBsYWNlbWVudDogXCIvc3JjL2NvbXBvbmVudHMvZG9tXCIgfSxcclxuICAgICAgICAgeyBmaW5kOiBcIkBzdGF0ZVwiLCByZXBsYWNlbWVudDogXCIvc3JjL3N0YXRlXCIgfSxcclxuICAgICAgICAgeyBmaW5kOiBcIkBkYXRhXCIsIHJlcGxhY2VtZW50OiBcIi9zcmMvZGF0YVwiIH0sXHJcbiAgICAgICAgIHsgZmluZDogXCJAbGF5b3V0XCIsIHJlcGxhY2VtZW50OiBcIi9zcmMvbGF5b3V0XCIgfSxcclxuICAgICAgICAgeyBmaW5kOiBcIkByb3V0aW5nXCIsIHJlcGxhY2VtZW50OiBcIi9zcmMvcm91dGluZ1wiIH1cclxuICAgICAgXVxyXG4gICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFAsU0FBUyxvQkFBb0I7QUFDelIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sa0JBQWtCO0FBQ3pCLE9BQU8sVUFBVTtBQUdqQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN6QixTQUFTLENBQUMsTUFBTSxHQUFHLGFBQWEsR0FBRyxLQUFLLENBQUM7QUFBQSxFQUN6QyxRQUFRLEVBQUUsTUFBTSxLQUFLO0FBQUEsRUFDckIsU0FBUztBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0osRUFBRSxNQUFNLFFBQVEsYUFBYSxPQUFPO0FBQUEsTUFDcEMsRUFBRSxNQUFNLFFBQVEsYUFBYSxXQUFXO0FBQUEsTUFDeEMsRUFBRSxNQUFNLFVBQVUsYUFBYSxhQUFhO0FBQUEsTUFDNUMsRUFBRSxNQUFNLFdBQVcsYUFBYSx5QkFBeUI7QUFBQSxNQUN6RCxFQUFFLE1BQU0sUUFBUSxhQUFhLHNCQUFzQjtBQUFBLE1BQ25ELEVBQUUsTUFBTSxVQUFVLGFBQWEsYUFBYTtBQUFBLE1BQzVDLEVBQUUsTUFBTSxTQUFTLGFBQWEsWUFBWTtBQUFBLE1BQzFDLEVBQUUsTUFBTSxXQUFXLGFBQWEsY0FBYztBQUFBLE1BQzlDLEVBQUUsTUFBTSxZQUFZLGFBQWEsZUFBZTtBQUFBLElBQ25EO0FBQUEsRUFDSDtBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
