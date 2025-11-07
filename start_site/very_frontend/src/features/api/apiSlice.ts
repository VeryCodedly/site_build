import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post, PostResponse, Category, Comment, PostImage, PostLink, Subcategory, Course, CourseResponse, Lessons, LessonsResponse } from '@/types/post';
import { PaginatedResponse } from '@/types/post';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),

  tagTypes: ['Post', 'Category', 'Subcategory', 'Comment', 
            'PostImage', 'PostLink', 'Course', 'CourseResponse', 'Lessons', 'LessonsResponse'],

  endpoints: (builder) => ({

    // 📰 POSTS
    getPosts: builder.query<PostResponse, { page?: number }>({
      // pass ?page=X
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

    getFeaturedPost: builder.query<Post | null, void>({
      query: () => '/posts/featured/',
      transformResponse: (res: { featured: Post | null }) => res.featured,
      providesTags: ['Post'],
    }),

    getTrendingPosts: builder.query<Post[], void>({
      query: () => '/posts/trending/',
      transformResponse: (res: { trending: Post[] }) => res.trending,
      providesTags: ['Post'],
    }),

    getSpotlightPosts: builder.query<Post[], void>({
      query: () => '/posts/spotlight/',
      transformResponse: (res: { spotlight: Post[] }) => res.spotlight,
      providesTags: ['Post'],
    }),

    getBigDealPosts: builder.query<Post[], void>({
      query: () => '/posts/bigDeal/',
      transformResponse: (res: { bigDeal: Post[] }) => res.bigDeal,
      providesTags: ['Post'],
    }),

    getSocialPost: builder.query<Post | null, void>({
      query: () => '/posts/social/',
      transformResponse: (res: { social: Post | null }) => res.social,
      providesTags: ['Post'],
    }),

    getGlobalLensPosts: builder.query<Post[], void>({
      query: () => '/posts/globalLens/',
      transformResponse: (res: { globalLens: Post[] }) => res.globalLens,
      providesTags: ['Post'],
    }),

    getAfricaRisingPosts: builder.query<Post[], void>({
      query: () => '/posts/africaRising/',
      transformResponse: (res: { africaRising: Post[] }) => res.africaRising,
      providesTags: ['Post'],
    }),

    getKeyPlayersPosts: builder.query<Post[], void>({
      query: () => '/posts/keyPlayers/',
      transformResponse: (res: { keyPlayers: Post[] }) => res.keyPlayers,
      providesTags: ['Post'],
    }),

    getHardwarePosts: builder.query<Post | null, void>({
      query: () => '/posts/hardware/',
      transformResponse: (res: { hardware: Post | null }) => res.hardware,
      providesTags: ['Post'],
    }),

    getDigitalMoneyPosts: builder.query<Post | null, void>({
      query: () => '/posts/digitalMoney/',
      transformResponse: (res: { digitalMoney: Post | null }) => res.digitalMoney,
      providesTags: ['Post'],
    }),

    getbchCryptoPosts: builder.query<Post[], void>({
      query: () => '/posts/bchCrypto/',
      transformResponse: (res: { bchCrypto: Post[] }) => res.bchCrypto,
      providesTags: ['Post'],
    }),

    getStartupsPosts: builder.query<Post[], void>({
      query: () => '/posts/startups/',
      transformResponse: (res: { startups: Post[] }) => res.startups,
      providesTags: ['Post'],
    }),

    getprvCompliancePosts: builder.query<Post[], void>({
      query: () => '/posts/prvCompliance/',
      transformResponse: (res: { prvCompliance: Post[] }) => res.prvCompliance,
      providesTags: ['Post'],
    }),

    getAIPosts: builder.query<Post[], void>({
      query: () => '/posts/AI/',
      transformResponse: (res: { AI: Post[] }) => res.AI,
      providesTags: ['Post'],
    }),

    getEmergingTechPosts: builder.query<Post[], void>({
      query: () => '/posts/emergingTech/',
      transformResponse: (res: { emergingTech: Post[] }) => res.emergingTech,
      providesTags: ['Post'],
    }),

    getTechCulturePosts: builder.query<Post[], void>({
      query: () => '/posts/techCulture/',
      transformResponse: (res: { techCulture: Post[] }) => res.techCulture,
      providesTags: ['Post'],
    }),

    getSecureHabitsPosts: builder.query<Post[], void>({
      query: () => '/posts/secureHabits/',
      transformResponse: (res: { secureHabits: Post[] }) => res.secureHabits,
      providesTags: ['Post'],
    }),

    // 🏷️ CATEGORIES
    getCategories: builder.query<Category[], void>({
      query: () => 'categories/',
      transformResponse: (res: PaginatedResponse<Category>) => res.results,
      providesTags: ['Category'],
    }),

    // 🏷️ SUBCATEGORIES
    getSubcategories: builder.query<Subcategory[], void>({
      query: () => 'subcategories/',
      transformResponse: (res: { results: Subcategory[] }) => res.results,
      providesTags: ['Subcategory'],
    }),

    getPostsBySubcategory: builder.query<Post[], string>({
      query: (slug) => `/subcategories/${slug}/posts/`,
      transformResponse: (res: { results: Post[] }) => res.results,      
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
  useGetPostsBySubcategoryQuery,
  useGetCommentsQuery,
  useAddCommentMutation,
  useGetPostImagesQuery,
  useGetPostLinksQuery,
  useGetCoursesQuery,
  useGetCourseQuery,
  useGetLessonsQuery,
  useGetLessonQuery,
  useGetFeaturedPostQuery,
  useGetTrendingPostsQuery,
  useGetSpotlightPostsQuery,
  useGetBigDealPostsQuery,
  useGetGlobalLensPostsQuery,
  useGetAfricaRisingPostsQuery,
  useGetDigitalMoneyPostsQuery,
  useGetEmergingTechPostsQuery,
  useGetHardwarePostsQuery,
  useGetSecureHabitsPostsQuery,
  useGetTechCulturePostsQuery,
  useGetKeyPlayersPostsQuery, 
  useGetAIPostsQuery, 
  useGetbchCryptoPostsQuery, 
  useGetStartupsPostsQuery, 
  useGetprvCompliancePostsQuery,
  useGetSocialPostQuery, } = apiSlice;
