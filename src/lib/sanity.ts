import type { PortableTextBlock } from '@portabletext/types'
import type { ClientConfig } from '@sanity/client'
import type { Locale } from '../i18n/config'
import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'
import groq from 'groq'

const config: ClientConfig = {
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
}

export const sanity = createClient(config)

const builder = createImageUrlBuilder(sanity)

export function imageUrl(source: LinkedImage | string) {
  return builder.image(typeof source === 'string' ? source : source._id)
}

export interface ImageDimensions {
  width: number
  height: number
  aspectRatio: number
}

export interface LinkedImage {
  _id: string
  altText: string | null
  lqip: string | null
  dimensions: ImageDimensions | null
}

export interface Slug {
  _type: 'slug'
  current: string
}

export interface Beat {
  _key: string
  content: PortableTextBlock[]
}

export interface Page {
  _id: string
  _createdAt: string
  _updatedAt: string
  title: string
  excerpt: string
  slug: Slug
  content: PortableTextBlock[]
  banner: LinkedImage | null
  beats: Beat[] | null
}

export interface Article {
  _id: string
  _createdAt: string
  _updatedAt: string
  title: string
  excerpt: string
  slug: Slug
  content: PortableTextBlock[]
  banner: LinkedImage | null
}

export interface Review {
  _id: string
  _createdAt: string
  reviewer: string
  comment: string
  picture: LinkedImage | null
}

export interface SkillGroup {
  _key: string
  category: string
  items: string[]
}

export interface ExperienceEntry {
  _key: string
  company: string
  title: string | null
  startDate: string | null
  endDate: string | null
  location: string | null
  note: string | null
  bullets: string[] | null
}

export interface EducationEntry {
  _key: string
  degree: string | null
  institution: string
  year: string | null
  note: string | null
}

export interface Resume {
  profile: string | null
  skills: SkillGroup[] | null
  experience: ExperienceEntry[] | null
  education: EducationEntry[] | null
  additionalSkills: string[] | null
}

const pageProjection = groq`{
  _id, _createdAt, _updatedAt, title, excerpt, slug, content, beats,
  "banner": banner.asset->{ _id, altText, "lqip": metadata.lqip, "dimensions": metadata.dimensions }
}`

export async function getPage(slug: string, lang: Locale): Promise<Page | null> {
  return sanity.fetch(
    groq`*[_type == "page" && slug.current == $slug && language == $lang][0] ${pageProjection}`,
    { slug, lang },
  )
}

export async function getArticles(): Promise<Article[]> {
  return sanity.fetch(
    groq`*[_type == "article"] | order(_createdAt desc) ${pageProjection}`,
  )
}

export async function getArticle(slug: string): Promise<Article | null> {
  return sanity.fetch(
    groq`*[_type == "article" && slug.current == $slug][0] ${pageProjection}`,
    { slug },
  )
}

export async function getReviews(): Promise<Review[]> {
  return sanity.fetch(
    groq`*[_type == "review"] | order(_createdAt desc){
      _id, _createdAt, reviewer, comment,
      "picture": picture.asset->{ _id, altText, "lqip": metadata.lqip, "dimensions": metadata.dimensions }
    }`,
  )
}

export async function getResume(lang: Locale): Promise<Resume | null> {
  return sanity.fetch(
    groq`*[_type == "resume" && language == $lang][0]{
      profile,
      skills[]{ _key, category, items },
      experience[]{ _key, company, title, startDate, endDate, location, note, bullets },
      education[]{ _key, degree, institution, year, note },
      additionalSkills
    }`,
    { lang },
  )
}
