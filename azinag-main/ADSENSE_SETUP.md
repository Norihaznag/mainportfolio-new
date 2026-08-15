# AdSense setup

AdSense Auto ads are loaded globally from the Next.js root layout.

Set these environment variables in production:

`NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX`
`NEXT_PUBLIC_ADSENSE_SLOT=XXXXXXXXXX`

The publisher ID and ad-unit slot ID are different values.

The reusable `<AdSenseAd />` component only renders a manual responsive unit when both
values are configured. Auto ads remain globally available.

## Policy considerations

Ads should be limited to pages with substantial, useful publisher content. Do not put ads
on 404/error screens, empty search states, login/account-only screens, or pages whose main
content is copied or automatically generated without meaningful added value.

Adding the AdSense script does not by itself make a page eligible for ads.
