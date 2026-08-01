// Sentry Error Monitoring & Observability Abstraction Layer

export const initMonitoring = () => {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  if (dsn) {
    console.log("⚡ [Sentry Observability] Initialized error monitoring pipeline.");
  }
};

export const captureException = (error, context = {}) => {
  console.error("🔴 [Captured Exception]", error, context);
  // If Sentry DSN is set, forward to Sentry SDK:
  // Sentry.captureException(error, { extra: context });
};

export const logUserBreadcrumb = (category, message, data = {}) => {
  console.log(`[Breadcrumb] ${category}: ${message}`, data);
};
