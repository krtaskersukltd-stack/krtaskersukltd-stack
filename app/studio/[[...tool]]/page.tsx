'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export default function StudioPage() {
  return (
    <div
      data-lenis-prevent="true"
      style={{
        height: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        touchAction: 'auto',
      }}
    >
      <NextStudio config={config} />
    </div>
  )
}
