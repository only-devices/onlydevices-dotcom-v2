// src/lib/notion.ts
import { Client } from '@notionhq/client'
import { cache } from 'react'
import {
  BlockObjectResponse,
  PageObjectResponse,
  RichTextItemResponse
} from '@notionhq/client/build/src/api-endpoints'

// Initialize the Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

// Define your database ID
const DATABASE_ID = process.env.NOTION_DATABASE_ID

// Define the shape of our blog posts
export interface Post {
  id: string
  title: string
  description: string
  slug: string
  publishedAt: Date
  author: string
  coverImage?: string
}

export interface BlogPost extends Post {
  content: string
}

// Helper type for extracting text from Notion rich text
type NotionPropertyValueMap = PageObjectResponse['properties']
type PropertyItemValue = NotionPropertyValueMap[string]

// Helper functions to safely extract values from Notion properties
function getTextFromProperty(property: PropertyItemValue): string {
  if (property?.type === 'title' && Array.isArray(property.title)) {
    return property.title[0]?.plain_text ?? ''
  } else if (property?.type === 'rich_text' && Array.isArray(property.rich_text)) {
    return property.rich_text[0]?.plain_text ?? ''
  }
  return ''
}

function getDateFromProperty(property: PropertyItemValue): Date {
  if (property?.type === 'date' && property.date?.start) {
    return new Date(property.date.start)
  }
  return new Date()
}

function getUrlFromProperty(property: PropertyItemValue): string | undefined {
  if (property?.type === 'url' && property.url) {
    return property.url
  }
  return undefined
}

// Get a list of all published posts
export const getNotionPosts = cache(async (): Promise<Post[]> => {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID!,
      filter: {
        property: 'Status',
        select: {
          equals: 'Published',
        },
      },
      sorts: [
        {
          property: 'Published',
          direction: 'descending',
        },
      ],
    })

    return response.results
      .filter((page): page is PageObjectResponse => 'properties' in page)
      .map((page) => {
        const props = page.properties
        
        return {
          id: page.id,
          title: getTextFromProperty(props.Title),
          description: getTextFromProperty(props.Description),
          slug: getTextFromProperty(props.Slug),
          publishedAt: getDateFromProperty(props.Published),
          author: getTextFromProperty(props.Author),
          coverImage: getUrlFromProperty(props.Cover),
        }
      })
  } catch (error) {
    console.error('Error fetching posts from Notion:', error)
    return []
  }
})

// Get a single post by its slug
export async function getPostBySlug(slug: string): Promise<BlogPost> {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID!,
      filter: {
        and: [
          {
            property: 'Slug',
            rich_text: {
              equals: slug,
            },
          },
          {
            property: 'Status',
            select: {
              equals: 'Published',
            },
          },
        ],
      },
    })

    if (!response.results.length) {
      throw new Error(`Post with slug '${slug}' not found`)
    }

    const page = response.results[0]
    
    if (!('properties' in page)) {
      throw new Error(`Invalid page format for slug '${slug}'`)
    }
    
    const props = (page as PageObjectResponse).properties

    // Get the page content
    const blocks = await notion.blocks.children.list({
      block_id: page.id,
    })

    // Convert blocks to text
    const content = blocks.results
      .filter((block): block is BlockObjectResponse => 'type' in block)
      .map((block) => {
        if (block.type === 'paragraph') {
          return block.paragraph.rich_text
            .map((text: RichTextItemResponse) => text.plain_text)
            .join('')
        }
        return ''
      })
      .join('\n\n')

    return {
      id: page.id,
      title: getTextFromProperty(props.Title),
      description: getTextFromProperty(props.Description),
      slug: getTextFromProperty(props.Slug),
      publishedAt: getDateFromProperty(props.Published),
      author: getTextFromProperty(props.Author),
      coverImage: getUrlFromProperty(props.Cover),
      content,
    }
  } catch (error) {
    console.error(`Error fetching post with slug '${slug}':`, error)
    throw error
  }
}