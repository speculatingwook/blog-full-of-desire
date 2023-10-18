'use client'
import { useEffect, useRef, useState } from 'react'
import Link from '@/components/Link'
const TocComponent = ({ toc }) => {
  console.log('toc', toc)
  // @ts-ignore
  const [activeId, setActiveId] = useState()
  useIntersectionObserver(setActiveId)
  // @ts-ignore
  const [TOC, setTOC] = useState([])
  useEffect(() => {
    const etoc = toc.map((e) => ({ ...e, children: [] }))
    for (let i = etoc.length - 1; i >= 0; i--) {
      if (etoc[i].depth === 1) continue
      for (let j = i; j >= 0; j--) {
        if (etoc[i].depth - etoc[j].depth === 1) {
          etoc[j].children.unshift(etoc[i])
          break
        }
      }
    }
    const modifiedETOC = etoc.filter((e) => e.depth == 2)
    setTOC(modifiedETOC)
  }, [toc])

  const RenderToc = ({ item, activeId }) => {
    const isActive = (e): boolean => {
      if (`#${activeId}` === e.url) return true
      for (const child of e.children) {
        if (isActive(child)) return true
      }
      return false
    }

    return (
      <div>
        {item.map((e, i) => (
          <div key={i}>
            <Link href={e.url}>
              <p
                className={`border-l-[3px] pl-2 ${
                  isActive(e) ? 'border-primary-500 text-primary-600' : ''
                }`}
              >
                {e.value}
              </p>
            </Link>
            {isActive(e) && e.children.length > 0 && (
              <div className="mt-1 ml-4 space-y-1">
                <RenderToc item={e.children} activeId={activeId} />
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="mt-5 space-y-1 text-sm">
      <p className="text-lg font-bold">Table of content</p>
      <RenderToc item={TOC} activeId={activeId} />
    </div>
  )
}

// IntersectionObserver 훅의 타입 정의
type HeadingElementsRef = { [key: string]: IntersectionObserverEntry }

const useIntersectionObserver = (setActiveId) => {
  const headingElementsRef = useRef<HeadingElementsRef>({})

  useEffect(() => {
    const callback: IntersectionObserverCallback = (headings) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement
        return map
      }, headingElementsRef.current)

      const visibleHeadings: IntersectionObserverEntry[] = []
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key]
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement)
      })

      const getIndexFromId = (id: string) =>
        Object.keys(headingElementsRef.current).findIndex((heading) => heading === id)

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id)
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id)
        )
        setActiveId(sortedVisibleHeadings[0].target.id)
      }
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: '0px 0px -40% 0px',
    })

    const headingElements = Array.from(document.querySelectorAll('h1, h2, h3'))

    headingElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [setActiveId])
}

export default TocComponent
