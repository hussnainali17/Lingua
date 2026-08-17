// PostHog analytics utility
// For production, integrate with PostHog API

export const posthog = {
  capture: (event: string, properties?: Record<string, any>) => {
    // TODO: Integrate with PostHog
    console.log(`Analytics event: ${event}`, properties);
  },
};
