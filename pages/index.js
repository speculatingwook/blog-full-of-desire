import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter, getFileBySlug } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import NewsletterForm from '@/components/NewsletterForm'
import { getPage } from '@/lib/notion'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

const MAX_DISPLAY = 5
const DEFAULT_LAYOUT = 'AuthorLayout'

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')
  const page = await getPage('b66d2b6d15544a34a75028a36f84f3c6')
  const authorDetails = await getFileBySlug('authors', ['portfolio'])
  if (!page) {
    // page가 undefined이거나 null인 경우 모두 처리
    return { props: { posts, page: {}, authorDetails } }
  }

  return { props: { posts, page, authorDetails } }
}

export default function Home({ posts, authorDetails }) {
  const { mdxSource, frontMatter } = authorDetails
  /**
   * 타이핑 효과 로직
   */
  // const typedRef = useRef(null)
  //
  // useEffect(() => {
  //   const options = {
  //     strings: ['Backend Developer', 'Amateur Philosopher', 'Amateur psychologist'],
  //     typeSpeed: 50,
  //     backDelay: 1000,
  //     loop: true,
  //   }
  //   const typed = new Typed('.typed', options)
  //   typedRef.current = typed
  //
  //   return () => {
  //     typed.destroy()
  //   }
  // }, [])
  //
  // useEffect(() => {
  //   if (typedRef.current) {
  //     typedRef.current.reset()
  //   }
  // })
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            hi
          </h1>
          {/*<p style={{ fontSize: '24px', color: 'white' }}>I'm a <span className="typed" style={{ fontSize: '24px', color: 'white' }}></span> </p>*/}
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        {/*<MDXLayoutRenderer*/}
        {/*  layout={frontMatter.layout || DEFAULT_LAYOUT}*/}
        {/*  mdxSource={mdxSource}*/}
        {/*  frontMatter={frontMatter}*/}
        {/*/>*/}
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
