'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import "./Navbar.css";

export default function Navbar() {
  const [role, setRole] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('role');
    setRole('');
    router.push('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link href="/" className="nav-link">Home</Link>
      </div>

      <div className="nav-right">
     
     
        {role ? (
          <button className="logout-btn" onClick={handleLogout}>
            Logout ({role})
          </button>
        ) : (
          <Link href="/login" className="nav-link">Login</Link>
        )}
      </div>
    </nav>
  );
}
