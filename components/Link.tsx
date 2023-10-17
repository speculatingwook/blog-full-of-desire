'use client'
/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'
import type { LinkProps } from 'next/link'
import { AnchorHTMLAttributes } from 'react'
import { LinkButton } from '@dlarroder/playground'

const CustomLink = ({ href, ...rest }: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return (
      <Link href={href} legacyBehavior>
        <a
          className="special-underline-new no-underline hover:text-gray-100 dark:hover:text-gray-100"
          href={href}
          {...rest}
        />
      </Link>
    )
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />
  }

  return (
    <a
      className="special-underline-new no-underline hover:text-gray-100 dark:hover:text-gray-100"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      {...rest}
    />
  )
}

export default CustomLink
