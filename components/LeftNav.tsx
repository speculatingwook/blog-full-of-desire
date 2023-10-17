'use client'
import React, { useRef, useEffect, useState } from 'react'
import TocComponent from '@/components/TOC'

interface LeftNavProps {
  toc: never // 실제로 사용되는 데이터 타입에 맞게 수정하세요.
}

const LeftNav: React.FC<LeftNavProps> = ({ toc }) => {
  const [isSticky, setIsSticky] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx =
        document.documentElement.scrollHeight - document.documentElement.clientHeight
      document.documentElement.style.scrollBehavior = 'smooth'
      const scrolled = scrollPx / winHeightPx
      if (scrolled > 0.07) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [isSticky])

  return (
    <div className={isSticky ? 'leftNav isSticky' : 'leftNav'} ref={ref}>
      <TocComponent toc={toc} />
    </div>
  )
}

export default LeftNav
