'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import staticBlogs from '../blog/data/blog';
import './updateblogs.css';

export default function EditBlogForm() {
  const router = useRouter();
  const params = useSearchParams();
  const slug = params.get('slug');

  const [form, setForm] = useState({ title: '', slug: '', content: '', image: '' });
  const [existingSlug, setExistingSlug] = useState(slug);

  useEffect(() => {
    const localBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const all = [...staticBlogs, ...localBlogs];
    const blog = all.find((b) => b.slug === slug);
    if (blog) setForm(blog);
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let localBlogs = JSON.parse(localStorage.getItem('blogs')) || [];

    const index = localBlogs.findIndex((b) => b.slug === existingSlug);
    const duplicate = form.slug !== existingSlug && localBlogs.some((b) => b.slug === form.slug);
    if (duplicate) {
      alert('Slug must be unique');
      return;
    }

    if (index !== -1) {
      localBlogs[index] = form;
    } else {
      localBlogs.push(form);
    }

    localStorage.setItem('blogs', JSON.stringify(localBlogs));
    alert('Blog updated!');
    router.push('/');
  };

  return (
    <div className="form-container">
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit} className="blog-form">
        <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Blog Title" required />
        <input type="text" name="slug" value={form.slug} onChange={handleChange} placeholder="Slug" required />
        <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" rows={6} required />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {form.image && <img src={form.image} alt="Preview" className="image-preview" />}
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
}
