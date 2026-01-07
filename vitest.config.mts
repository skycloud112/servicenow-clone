import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      './apps/admin/vitest.config.mts',
      './apps/user/vitest.config.mts',
      './packages/gateways/vitest.config.mts',
    ],
  },
});
