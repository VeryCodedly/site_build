import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post, PostResponse, Category, Comment, PostImage, PostLink, Subcategory, Course, CourseResponse, Lessons, LessonsResponse } from '@/types/post';


export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),

  tagTypes: ['Post', 'Category', 'Subcategory', 'Comment', 
            'PostImage', 'PostLink', 'Course', 'CourseResponse', 'Lessons', 'LessonsResponse'],

endpoints: (builder) => ({

    // 📰 POSTS
    getPosts: builder.query<PostResponse, { page?: number }>({
      // you can pass ?page=X
      query: ({page = 1}) => `posts/?page=${page}`,
      providesTags: ['Post'],
    }),

    getPostById: builder.query<Post, string>({
      query: (id) => `posts/${id}/`,
      providesTags: ['Post'],
    }),

    getPostBySlug: builder.query<Post, string>({
      query: (slug) => `posts/${slug}/`,
      providesTags: ['Post'],
    }),

    // 🏷️ CATEGORIES
    getCategories: builder.query<Category[], void>({
      query: () => 'categories/',
      providesTags: ['Category'],
    }),

    // 🏷️ SUBCATEGORIES
    getSubcategories: builder.query<Subcategory[], void>({
      query: () => 'subcategories/',
      providesTags: ['Subcategory'],
    }),

    // 💬 COMMENTS
    getComments: builder.query<Comment[], number>({
      query: (postId) => `posts/${postId}/comments/`,
      providesTags: ['Comment'],
    }),

    addComment: builder.mutation<Comment, Partial<Comment>>({
      query: (comment) => ({
        url: 'comments/',
        method: 'POST',
        body: comment,
      }),
      invalidatesTags: ['Comment'],
    }),

    // 🖼️ POST IMAGES
    getPostImages: builder.query<PostImage[], number>({
      query: (postId) => `posts/${postId}/images/`,
      providesTags: ['PostImage'],
    }),

    // 🔗 POST LINKS
    getPostLinks: builder.query<PostLink[], number>({
      query: (postId) => `posts/${postId}/links/`,
      providesTags: ['PostLink'],
    }),

    // 🎓 COURSES (Paginated)
    getCourses: builder.query<CourseResponse, number | void>({
      query: (page = 1) => `courses/?page=${page}`,
      providesTags: ['Course'],
    }),

    getCourse: builder.query<Course, string>({
      query: (slug) => `courses/${slug}/`,
      providesTags: ['Course'],
    }),

    // 📚 LESSONS (Paginated)
    getLessons: builder.query<LessonsResponse, { courseSlug: string; page?: number }>({
      query: ({ courseSlug, page = 1 }) => `courses/${courseSlug}/lessons/?page=${page}`,
      providesTags: ['Lessons'],
    }),

    getLesson: builder.query<Lessons, { courseSlug: string; lessonSlug: string }>({
      query: ({ courseSlug, lessonSlug }) =>
        `courses/${courseSlug}/lessons/${lessonSlug}/`,
      providesTags: ['Lessons'],
    }),
  }),
});

export const { 
  useGetPostByIdQuery,
  useGetPostsQuery, 
  useGetPostBySlugQuery, 
  useGetCategoriesQuery,
  useGetSubcategoriesQuery,
  useGetCommentsQuery,
  useAddCommentMutation,
  useGetPostImagesQuery,
  useGetPostLinksQuery,
  useGetCoursesQuery,
  useGetCourseQuery,
  useGetLessonsQuery,
  useGetLessonQuery, } = apiSlice;
