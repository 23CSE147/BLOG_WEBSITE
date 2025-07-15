'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import staticBlogs from '../data/blog'; 
import "./card.css"

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

  if (!blog) return <p style={{ padding: '2rem' }}>Loading blog...</p>;

  return (
    <div className="blog-details">
      <h1>{blog.title}</h1>
      <img src={blog.image} alt={blog.title} />
      <p>{blog.content}</p>
    </div>
  );
}
