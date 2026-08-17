export interface KnowHomeResponse {
    featured: MediaCard[];
    latest: MediaCard[];
}

export interface KnowMainData {
    videos: MediaCard[];
    shorts: MediaCard[];
    skits: MediaCard[];
    episodes: MediaCard[];
}

export interface KnowMoreData {
    podcasts: MediaCard[];
    interviews: MediaCard[];
    livestreams: MediaCard[];
    talks: MediaCard[];
}

export interface Topic {
    title: string;
    slug: string;
    description: string;
    media_count: number;
}

export interface Format {
    title: string;
    slug: string;
}

export interface Series {
    id: number;
    title: string;
    slug: string;
    description: string;
}

export interface SeriesListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Series[];
};

export interface LookupItem {
    title: string;
    slug: string;
    description?: string;
}

export interface MediaListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: MediaCard[];
};

export interface MediaCard {
    title: string;
    slug: string;
    topic: LookupItem;
    media_format: LookupItem;
    series: LookupItem | null;
    length: "short" | "long";
    description: string;
    thumbnail: string;
    duration: number;
    youtube_url: string | null;
    instagram_url: string | null;
    tiktok_url: string | null;
    twitter_url: string | null;
    facebook_url: string | null;
    linkedin_url: string | null;
    spotify_url: string | null;
    apple_url: string | null;
    views: number;
    featured: boolean;
    tags: string[];
    transcript: string;
    published_at: string;
    related: MediaCard[];
    series_media: MediaCard[];
    // topic_media: MediaCard[];
}