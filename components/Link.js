/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'

const CustomLink = ({ href, isImage, ...rest }) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')
  if (isImage) {
    return (
      <Link href={href}>
        <a
          className=" no-underline hover:text-gray-100 dark:hover:text-gray-100"
          href={href}
          {...rest}
        />
      </Link>
    )
  }

  if (isInternalLink) {
    return (
      <Link href={href}>
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
