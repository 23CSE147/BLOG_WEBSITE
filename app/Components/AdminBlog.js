'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './Admin.css';

export default function AdminBlog({ blogs, hiddenStaticSlugs, onHideStatic }) {
  const router = useRouter();

  const handleDelete = (blog) => {
    const isStatic = !JSON.parse(localStorage.getItem('blogs') || '[]').some((b) => b.slug === blog.slug);

    if (isStatic) {
      onHideStatic(blog.slug);  
    } else {
      const localBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
      const updated = localBlogs.filter((b) => b.slug !== blog.slug);
      localStorage.setItem('blogs', JSON.stringify(updated));
      window.location.reload();
    }
  };

  const handleView = (slug) => {
    router.push(`/blog/${slug}`);
  };

  return (
    <div className="admin-table-container">
      <h2 className="admin-title">Admin Blog Management</h2>
      <Link href="/createblog" className="create-btn">➕ Create Blog</Link>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Slug</th>
            <th>Preview</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs
            .filter((b) => !hiddenStaticSlugs.includes(b.slug))
            .map((blog) => (
              <tr key={blog.slug}>
                <td>{blog.title}</td>
                <td>{blog.slug}</td>
                <td>{blog.content.slice(0, 60)}...</td>
                <td>
                  <Link href={`/updateblogs?slug=${blog.slug}`} className="edit-btn">Edit</Link>
                  <button className="delete-btn" onClick={() => handleDelete(blog)}>Delete</button>
                  <button className="view-btn" onClick={() => handleView(blog.slug)}>View</button>
                </td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
