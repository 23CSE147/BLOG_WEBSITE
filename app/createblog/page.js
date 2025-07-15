'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './createblog.css';

export default function CreateBlog() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    slug: '',
    content: '',
    image: null,
    previewUrl: ''
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        setForm((prev) => ({
          ...prev,
          image: file,
          previewUrl: URL.createObjectURL(file),
        }));
      } else {
        alert('Please upload a valid image file.');
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.slug || !form.content || !form.image) {
      alert('All fields including image are required.');
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const newBlog = {
        title: form.title,
        slug: form.slug,
        content: form.content,
        image: reader.result, 
      };

      const existingBlogs = JSON.parse(localStorage.getItem('blogs')) || [];

      const isDuplicate = existingBlogs.some((blog) => blog.slug === newBlog.slug);
      if (isDuplicate) {
        alert('Slug must be unique.');
        return;
      }

      const updatedBlogs = [...existingBlogs, newBlog];
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
      console.log("Blog saved to localStorage:", updatedBlogs);

      alert('Blog created successfully!');
      router.push('/');
    };

    reader.readAsDataURL(form.image); 
  };

  return (
    <div className="blog-form">
      <h2>Create New Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="slug"
          placeholder="Unique Slug"
          value={form.slug}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Blog Content"
          rows="6"
          value={form.content}
          onChange={handleChange}
          required
        ></textarea>

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />

        {form.previewUrl && (
          <img
            src={form.previewUrl}
            alt="Preview"
            style={{ width: '200px', marginTop: '1rem', borderRadius: '8px' }}
          />
        )}

        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
}
