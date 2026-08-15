'use client'

import { useState, useEffect } from 'react'

type TeamMemberCardProps = {
  member: {
    id: string
    name: string
    role: string
    description: string
    photoURL: string | null
  }
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  // Tracks both "no photoURL set" and "photoURL set but failed to load" —
  // both cases fall back to the same placeholder per the requirements doc.
  const [imageFailed, setImageFailed] = useState(false)

  useEffect(() => {
    if (!member.photoURL) return

    let cancelled = false

    fetch(member.photoURL, { method: 'GET' })
      .then((res) => {
        if (cancelled) return
        const contentType = res.headers.get('content-type') || ''
        // Only treat it as a real photo if the response succeeded AND is actually an image
        if (!res.ok || !contentType.startsWith('image/')) {
          setImageFailed(true)
        }
      })
      .catch(() => {
        if (!cancelled) setImageFailed(true)
      })

    return () => {
      cancelled = true
    }
  }, [member.photoURL])

  const showPlaceholder = !member.photoURL || imageFailed

  return (
    <div className="flex gap-4 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-800">
        {showPlaceholder ? (
          // eslint-disable-next-line @next/next/no-img-element -- static local asset, no remotePatterns needed
          <img
            src="/default-avatar.jpg"
            alt={`${member.name} (no photo available)`}
            className="h-full w-full object-cover"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element -- external/user-provided URLs, avoids next.config remotePatterns setup
          <img
            src={member.photoURL!}
            alt={member.name}
            className="h-full w-full object-cover"
            onError={() => setImageFailed(true)}
          />
        )}
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        <p className="font-semibold break-words">{member.name}</p>
        <p className="text-xs font-medium break-words text-zinc-500">{member.role}</p>
        <p className="text-sm break-words whitespace-pre-line text-zinc-600 dark:text-zinc-400">
          {member.description}
        </p>
      </div>
    </div>
  )
}