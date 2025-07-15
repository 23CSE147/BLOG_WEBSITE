import BlogList from './Components/BlogList';
import Navbar from './Components/Navbar';

export default function Home() {
  return (
    <main>
      <Navbar/>
      <h1 style={{ textAlign: 'center', margin: '2rem 0' }}>Harry Potter Blog</h1>
      <BlogList />
      
    </main>
  );
}
