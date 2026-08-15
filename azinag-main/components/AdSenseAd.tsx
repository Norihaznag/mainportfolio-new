'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

export default function AdSenseAd() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_ID
  const slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT

  useEffect(() => {
    if (!client || !slot) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // AdSense can fail harmlessly when blocked by an extension or network policy.
    }
  }, [client, slot])

  if (!client || !slot) return null

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}
