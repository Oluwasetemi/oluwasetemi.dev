import * as Sentry from "@sentry/gatsby";

Sentry.init({
  dsn: "https://f2c0fe9439ecab29ce29fc76399e1247@o252554.ingest.us.sentry.io/4507900590882816",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/oluwasetemi\.dev/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  org: "personal-dfp",
  project: "oluwasetemidev",
  telemetry: false,
});
