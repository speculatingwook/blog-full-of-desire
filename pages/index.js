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
import { RoughNotation } from 'react-rough-notation'

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
  const typedRef = useRef(null)

  useEffect(() => {
    const options = {
      strings: ['Latest...'],
      typeSpeed: 200,
      backDelay: 1000,
      loop: true,
    }
    const typed = new Typed('.typed', options)
    typedRef.current = typed

    return () => {
      typed.destroy()
    }
  }, [])

  useEffect(() => {
    if (typedRef.current) {
      typedRef.current.reset()
    }
  })
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <div className="pt-6">
            <h1 className="pb-6 text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              Welcome! to my{' '}
              <RoughNotation
                type="underline"
                show={true}
                color="#C9184A"
                animationDelay={1500}
                animationDuration={3000}
                multiline={true}
              >
                Blog Full of Desire
              </RoughNotation>
            </h1>
            <p className="prose pt-5 text-lg text-gray-600 dark:text-gray-300">
              안녕하세요. 여러 욕망중에 지식에 대한 욕망이 가장 큰 주니어 개발자입니다. 최근 기술의
              급격한 발전으로 많은 변화가 생기고 있습니다. 그래서 배워야 하는 기술도 계속 바뀌고, 뭘
              어떻게 해야할지 모르는 사람들이 많습니다.
              <br />
              <br />
              <RoughNotation
                animate="true"
                type="highlight"
                show={true}
                color="#FF758F"
                animationDelay={1000}
                animationDuration={2500}
                className="text-slate-200"
              >
                하지만, 기술이 급격하게 변하더라도 본질적인 것은 변하지 않습니다.
              </RoughNotation>
              이곳에 제가 본질적으로 중요하다고 생각하는 것들을 글로 정리해두려고 합니다. 부족할
              수도 있는 제 글들을 읽고 도움이 되셨으면 좋겠습니다.
            </p>
            <p className="hidden pt-10 text-lg leading-7 text-slate-600 dark:text-slate-300 md:block">
              Hello. I am a junior developer who has a great desire for knowledge among many
              desires. Recently, there have been many changes due to the rapid development of
              technology.
              <br />
              <br />
              <RoughNotation
                animate="true"
                type="highlight"
                show={true}
                color="#FF758F"
                animationDelay={1000}
                animationDuration={2500}
                className="text-slate-200"
              >
                However, even if technology changes rapidly, the essential things do not
                change.&nbsp;
              </RoughNotation>
              I want to write down the things that I think are essential here. I may not be perfect,
              but I hope my writing can be helpful to you.
            </p>
          </div>
          <br />
          <br />
          <br />

          <h1 style={{ fontSize: '40px', color: 'white' }}>
            <span className="typed" style={{ fontSize: '40px', color: 'white' }}></span>{' '}
          </h1>
        </div>
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
                              className="text-gray-900 transition duration-500 ease-in-out hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-500"
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
                          className="special-underline-new text-primary-500 hover:text-gray-100 hover:no-underline dark:text-primary-500 hover:dark:text-gray-100"
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
            className="special-underline-new text-primary-500 hover:text-gray-100 hover:no-underline dark:text-primary-500 hover:dark:text-gray-100"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {/*{siteMetadata.newsletter.provider !== '' && (*/}
      {/*  <div className="flex items-center justify-center pt-4">*/}
      {/*    <NewsletterForm />*/}
      {/*  </div>*/}
      {/*)}*/}
    </>
  )
}
