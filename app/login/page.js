'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import './login.css'; 

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState('user');
  const [form, setForm] = useState({ username: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();

    if (role === 'admin') {
      if (form.username === 'admin' && form.password === 'admin123') {
        localStorage.setItem('role', 'admin');
        router.push('/');
      } else {
        alert('Invalid admin credentials');
      }
    } else {
      if (form.username && form.password) {
        localStorage.setItem('role', 'user');
        router.push('/');
      } else {
        alert('Enter valid user credentials');
      }
    }
  };

 

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>

      <div className="role-toggle">
        <button
          className={role === 'user' ? 'role-btn active' : 'role-btn'}
          onClick={() => setRole('user')}
          type="button"
        >
          User
        </button>
        <button
          className={role === 'admin' ? 'role-btn active' : 'role-btn'}
          onClick={() => setRole('admin')}
          type="button"
        >
          Admin
        </button>
      </div>

      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Username"
          className="login-input"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className="login-button" >Login as {role}</button>
      </form>
    </div>
  );
}
