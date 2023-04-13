import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'

const DEFAULT_LAYOUT = 'AuthorLayout'

export async function getStaticProps() {
  const authorDetails = await getFileBySlug('authors', ['default'])
  return { props: { authorDetails } }
}

export default function About({ authorDetails }) {
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
    <MDXLayoutRenderer
      layout={frontMatter.layout || DEFAULT_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
    />
  )
}
