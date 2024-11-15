'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface FaviconImageProps {
  url: string
  alt: string
  className?: string
  fallbackIcon?: string
}

export function FaviconImage({ url, alt, className, fallbackIcon }: FaviconImageProps) {
  const [faviconUrl, setFaviconUrl] = useState<string>('')

  useEffect(() => {
    const getFavicon = () => {
      // First check if we have a project-specific icon
      if (fallbackIcon && fallbackIcon !== '/placeholder.svg?height=40&width=40') {
        setFaviconUrl(fallbackIcon)
        return
      }

      // If no project icon, try to get favicon
      try {
        const domain = new URL(url).origin
        setFaviconUrl(`https://www.google.com/s2/favicons?domain=${domain}&sz=64`)
      } catch (error) {
        console.error('Error getting favicon:', error)
        setFaviconUrl('/placeholder.svg?height=40&width=40')
      }
    }

    getFavicon()
  }, [url, fallbackIcon])

  return (
    <Image
      src={faviconUrl}
      alt={alt}
      width={40}
      height={40}
      className={className}
      onError={() => setFaviconUrl('/placeholder.svg?height=40&width=40')}
      unoptimized={true}
    />
  )
} 