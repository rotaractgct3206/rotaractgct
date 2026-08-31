// ============================================================
// BLOGS DATA
// ============================================================

export const blogs = [
  {
    id: 1,
    slug: 'reclaim-the-night',
    title: 'Reclaim the night!',
    author: 'Rtr. Abdul Subahan',
    date: '2024-09-25',
    readTime: '1 min read',
    image: '/images/blogs/blog1.avif',
    excerpt: '"Reclaim the Night" shines a light on the fear many women face while navigating public spaces after dark. It advocates for a world where...',
    content: `This should be the question ringing in everyone's head, right?`,
    views: 43,
    comments: 0,
    likes: 4,
  },
  {
    id: 2,
    slug: 'unemployment-in-india',
    title: 'Unemployment in India',
    author: 'Rtr. Abdul Subahan',
    date: '2024-09-01',
    readTime: '1 min read',
    image: '/images/blogs/blog2.avif',
    excerpt: '"The issue of unemployment in India poses a significant threat to the nation\'s development. Explore the root causes and learn how they...',
    content: `Unemployment in India...`,
    views: 111,
    comments: 0,
    likes: 5,
  }
];

export const getBlogBySlug = (slug) => blogs.find((b) => b.slug === slug);

export const getLatestBlogs = (count = 3) =>
  [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, count);
