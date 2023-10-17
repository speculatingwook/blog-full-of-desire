import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TocComponent from '@/components/TOC'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  TocComponent,
  pre: Pre,
  BlogNewsletterForm,
}
