import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import TocComponent from '@/components/TOC'

const LeftNav = ({ toc }) => {
  const [isSticky, setIsSticky] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const onScroll = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx =
        document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = scrollPx / winHeightPx
      if (scrolled > 0.07) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [isSticky])

  return (
    <div className={isSticky ? 'leftNav isSticky' : 'leftNav'} ref={ref}>
      <TocComponent toc={toc} />
    </div>
  )
}
export default LeftNav
