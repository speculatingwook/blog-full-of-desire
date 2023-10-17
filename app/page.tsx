import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { ScrollProvider } from '@/components/Providers/ScrollProvider'
import { allBlogs } from 'contentlayer/generated'
import Hero from '@/components/Hero'
import Intro from '@/components/Intro'
import SectionContainer from '@/components/SectionContainer'
import Works from '@/components/Work/Works'
import LenisProvider from '@/components/Providers/LenisProvider'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return (
    <ScrollProvider>
      <LenisProvider>
        <Hero />
        <Intro />
        <Works />
        {/*<SectionContainer>*/}
        {/*  /!*<RecentPosts posts={posts} />*!/*/}
        {/*  /!*<Suspense fallback="loading..">*!/*/}
        {/*  /!*  <TopTracks />*!/*/}
        {/*  /!*</Suspense>*!/*/}
        {/*</SectionContainer>*/}
      </LenisProvider>
    </ScrollProvider>
  )
}
