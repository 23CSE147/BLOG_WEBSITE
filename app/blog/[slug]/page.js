'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import staticBlogs from '../data/blog';
import './card.css';

export default function BlogDetails() {
  const [blog, setBlog] = useState(null);
  const params = useParams();

  useEffect(() => {
    const localBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const allBlogs = [...staticBlogs, ...localBlogs];
    const found = allBlogs.find((b) => b.slug === params.slug);
    if (!found) return notFound();
    setBlog(found);
  }, [params.slug]);

  if (!blog) return <p className="loading-msg">Loading blog...</p>;

  return (
    <section className="blog-detail-wrapper">
      <article className="blog-card-new">
        <h2 className="blog-title">{blog.title}</h2>
        <img src={blog.image} alt={blog.title} className="blog-image" />
        <div className="blog-content">{blog.content}</div>
        <Link href="/" className="back-link">← Back to Blogs</Link>
      </article>
    </section>
  );
}
