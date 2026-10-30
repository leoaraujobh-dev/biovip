import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Vendor libraries
            if (id.includes('node_modules')) {
              if (id.includes('firebase')) {
                return 'vendor-firebase';
              }
              if (id.includes('jszip')) {
                return 'vendor-jszip';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-lucide';
              }
              if (id.includes('motion')) {
                return 'vendor-motion';
              }
              if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
                return 'vendor-react';
              }
              return 'vendor-libs';
            }

            // Application Views
            if (id.includes('src/components/views/FullscreenClientsView')) {
              return 'view-fullscreen-clients';
            }

            // Editor Tab Chunks
            if (id.includes('src/components/editor/tabs/DashboardTab')) {
              return 'tab-dashboard';
            }
            if (id.includes('src/components/editor/tabs/ModulesTab')) {
              return 'tab-modules';
            }
            if (id.includes('src/components/editor/tabs/QuickCreateTab')) {
              return 'tab-quickcreate';
            }
            if (id.includes('src/components/editor/tabs/StylingTab')) {
              return 'tab-styling';
            }
            if (id.includes('src/components/editor/tabs/ServicesTab')) {
              return 'tab-services';
            }
            if (id.includes('src/components/editor/tabs/ButtonsTab')) {
              return 'tab-buttons';
            }
            if (id.includes('src/components/editor/tabs/IdentityTab')) {
              return 'tab-identity';
            }
            if (
              id.includes('src/components/editor/tabs/HighConversionTab') ||
              id.includes('src/components/editor/tabs/QualifierTab')
            ) {
              return 'tab-conversion';
            }
            if (
              id.includes('src/components/editor/tabs/SeoTab') ||
              id.includes('src/components/editor/tabs/TrackingTab')
            ) {
              return 'tab-seo-tracking';
            }
            if (id.includes('src/components/editor/tabs/ExportTab')) {
              return 'tab-export';
            }

            // Simulator Chassis & HTML Generation Engine
            if (id.includes('src/components/simulator/SimulatorChassis')) {
              return 'simulator-chassis';
            }
            if (id.includes('src/utils/htmlGenerators') || id.includes('src/utils/exportEngine')) {
              return 'export-engine';
            }
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
