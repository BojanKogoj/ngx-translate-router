import { defineConfig, devices } from '@playwright/test';

const clientPort = Number(process.env['PLAYWRIGHT_CLIENT_PORT'] ?? 4200);
const ssrPort = Number(process.env['PLAYWRIGHT_SSR_PORT'] ?? 4201);
const clientBaseURL = process.env['PLAYWRIGHT_CLIENT_BASE_URL'] ?? `http://127.0.0.1:${clientPort}`;
const ssrBaseURL = process.env['PLAYWRIGHT_SSR_BASE_URL'] ?? `http://127.0.0.1:${ssrPort}`;

const selectedProjects = process.argv.flatMap((arg, index, args) => {
  if (arg === '--project' && args[index + 1]) {
    return [args[index + 1]];
  }
  if (arg.startsWith('--project=')) {
    return [arg.slice('--project='.length)];
  }
  return [];
});

const shouldRunProject = (name: string) => selectedProjects.length === 0 || selectedProjects.includes(name);
const serveCommand = (configuration: string, port: number) =>
  `npx ng serve ngx-translate-router-demo --configuration=${configuration} --host=127.0.0.1 --port=${port}`;

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env['CI'],
  /* Retry on CI only */
  retries: process.env['CI'] ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env['CI'] ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  webServer: [
    ...(shouldRunProject('client-chromium')
      ? [
          {
            command: serveCommand('e2e-client', clientPort),
            url: clientBaseURL,
            reuseExistingServer: !process.env['CI'],
            timeout: 120 * 1000,
          },
        ]
      : []),
    ...(shouldRunProject('ssr-chromium')
      ? [
          {
            command: serveCommand('e2e-ssr', ssrPort),
            url: ssrBaseURL,
            reuseExistingServer: !process.env['CI'],
            timeout: 120 * 1000,
          },
        ]
      : []),
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'client-chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: clientBaseURL,
      },
    },
    {
      name: 'ssr-chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: ssrBaseURL,
      },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});
