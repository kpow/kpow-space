import Analytics from 'analytics'
import googleAnalytics from 'analytics-plugin-ga'

const analytics = Analytics({
  app: 'kpow-wow',
  version: 100,
  plugins: [
    // GA integration
    googleAnalytics({
      trackingId: 'UA-107823022-2'
    }),
  ]
})

/* Track a page view */
// analytics.page()

/* Track a custom event */
// analytics.track('playedVideo', {
//   category: 'Videos',
//   label: 'Fall Campaign',
//   value: 42
// })

/* Identify a visitor */
// analytics.identify('user-id-xyz')

export default analytics