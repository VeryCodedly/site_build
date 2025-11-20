export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content_plain_text: string;
  content_JSON: Record<string, unknown>; // flexible JSON blocks
  author: string;
  image?: string;
  caption?: string;
  alt?: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  status: "draft" | "scheduled" | "published" | "archived";
  category?: Category
  subcategory?: Subcategory
  comments?: Comment[]
  images?: PostImage[]
  links?: PostLink[]
}

export interface PostResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
}

export interface Category {
  id: number
  name: string
  slug: string
  created_at: string
  subcategories?: Subcategory[]
  posts?: Post[]
}

export interface CategoryWithPostsResponse {
  category: Category;
  posts: Post[];  // not paginated for category page (all posts)
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Subcategory {
  id: number
  name: string
  slug: string
  about?: string
  created_at: string
  category: string
}

export interface PostImage {
  id: number
  image: string
  alt: string
  caption: string
  url?: string
  position: number
}

export interface PostLink {
  id: number
  label: string
  external_url?: string
  type: "affiliate" | "reference"
  target_post?: Post
  position: number
}

export interface Comment {
  id: number
  name: string
  body: string
  created_at: string
  post: number
  count: number
  // add count field
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  meta: string;
  language: string;
  prerequisites: string;
  sort: number;
  level: string;
  image: string;
  alt?: string;
  tags?: string[];
  description?: string;
  created_at: string;
  updated_at: string;
  lessons?: Lessons[]; // can be paginated or full list
}

export interface CourseResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Course[];
}

export interface Lessons {
  id: number;
  title: string;
  slug: string;
  level: string; // e.g. "beginner", "intermediate", "advanced"
  duration: string;
  video_url?: string;
  order: number; // order of lesson in course
  content_plain_text: string;
  content_JSON: Record<string, unknown>; // flexible JSON blocks
  course: string; 
  created_at: string;
  updated_at: string;
  count: number;
  previous_lesson: LessonLink | null;
  next_lesson: LessonLink | null;
}

export interface LessonLink {
  slug: string;
  // title: string;
}

export interface LessonsResponse {
  count?: number;
  next: string | null;
  previous: string | null;
  results: Lessons[];
}
