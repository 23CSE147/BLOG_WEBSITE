'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import staticBlogs from '../blog/data/blog';
import AdminBlog from './AdminBlog';
import "./BlogList.css"

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [role, setRole] = useState('');
  const [hiddenStaticSlugs, setHiddenStaticSlugs] = useState([]);

useEffect(() => {
  const storedRole = localStorage.getItem('role') || '';
  setRole(storedRole);

  const localBlogs = JSON.parse(localStorage.getItem('blogs')) || [];

  const staticSlugs = staticBlogs.map((b) => b.slug);
  const filteredLocalBlogs = localBlogs.filter((b) => !staticSlugs.includes(b.slug));

  setBlogs([...staticBlogs, ...filteredLocalBlogs]);
}, []);

  const handleHideStatic = (slug) => {
    setHiddenStaticSlugs((prev) => [...prev, slug]);
  };

  if (role === 'admin') {
    return <AdminBlog 
      blogs={blogs} 
      hiddenStaticSlugs={hiddenStaticSlugs} 
      onHideStatic={handleHideStatic} 
      
    />
  }

  return (
    <div className="blog-list">
      {blogs
        .filter((b) => !(hiddenStaticSlugs.includes(b.slug) && staticBlogs.find((s) => s.slug === b.slug)))
        .map((blog) => (
          <div className="blog-card" key={blog.slug}>
            <Link href={`/blog/${blog.slug}`}>
              <div className="card-content">
                <img src={blog.image} alt={blog.title} />
                <h3>{blog.title}</h3>
                <p>{blog.content.slice(0, 90)}...</p>
              </div>
            </Link>
          </div>
      ))}
    </div>
  );
}
