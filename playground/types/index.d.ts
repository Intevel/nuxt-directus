export interface Global {
  title: string
  description: string
}

export interface Post {
  id: string | number
  title: string
  slug: string
  content: string
  status: string
}

export interface Schema {
  global: Global
  posts: Post[]
}
