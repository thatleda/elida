import { createClient, type ClientConfig } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { PortableTextBlock } from '@portabletext/types';
import type { Locale } from '../i18n/config';

const config: ClientConfig = {
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
};

export const sanity = createClient(config);

const builder = createImageUrlBuilder(sanity);

export function imageUrl(source: LinkedImage | string) {
  return builder.image(source);
}

export interface LinkedImage {
  _id: string;
  _type: 'sanity.imageAsset';
  altText: string | null;
}

export interface Slug {
  _type: 'slug';
  current: string;
}

export interface Page {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  excerpt: string;
  slug: Slug;
  content: PortableTextBlock[];
  banner: LinkedImage | null;
}

export interface Article {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  excerpt: string;
  slug: Slug;
  content: PortableTextBlock[];
  banner: LinkedImage | null;
}

export interface Review {
  _id: string;
  _createdAt: string;
  reviewer: string;
  comment: string;
  picture: LinkedImage | null;
}

const pageProjection = /* groq */ `{
  _id, _createdAt, _updatedAt, title, excerpt, slug, content,
  "banner": banner.asset->{ _id, _type, altText }
}`;

export async function getPage(slug: string, lang: Locale): Promise<Page | null> {
  return sanity.fetch(
    /* groq */ `*[_type == "page" && slug.current == $slug && language == $lang][0] ${pageProjection}`,
    { slug, lang },
  );
}

// Articles ("ramblings") are English-only by design — they are not localised,
// so the locale never filters them.
export async function getArticles(): Promise<Article[]> {
  return sanity.fetch(
    /* groq */ `*[_type == "article"] | order(_createdAt desc) ${pageProjection}`,
  );
}

export async function getArticle(slug: string): Promise<Article | null> {
  return sanity.fetch(
    /* groq */ `*[_type == "article" && slug.current == $slug][0] ${pageProjection}`,
    { slug },
  );
}

export async function getReviews(): Promise<Review[]> {
  return sanity.fetch(
    /* groq */ `*[_type == "review"] | order(_createdAt desc){
      _id, _createdAt, reviewer, comment,
      "picture": picture.asset->{ _id, _type, altText }
    }`,
  );
}
