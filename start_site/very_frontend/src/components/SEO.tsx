'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import seoConfig from '@/utils/seoConfig';

export default function SEO() {
  const pathname = usePathname() || '/';

  useEffect(() => {
    const matchKey =
      Object.keys(seoConfig).find((key) => pathname.startsWith(key)) || 'default';
    const seo = seoConfig[matchKey as keyof typeof seoConfig] || seoConfig.default;
    document.title = seo.title;
  }, [pathname]);

  return null;
}
