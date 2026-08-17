# Effective CPM Ads Integration

Implemented on the public Azinag site:

- Popunder: loaded once from the root layout before interactive execution, excluded from `/adminos`.
- Social Bar: loaded from the root layout after interactive execution, excluded from `/adminos`.
- Native Banner: placed on the homepage in a dedicated sponsored section.
- Sponsored hyperlink: added below the Native Banner with `nofollow sponsored noopener noreferrer`.
- Existing Google AdSense integration was preserved.

The supplied Effective CPM Network snippets were kept unchanged.
