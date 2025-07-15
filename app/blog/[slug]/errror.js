'use client';

export default function BlogError({ error, reset }) {
  return (
    <div className="blog-error-container">
      <h2>⚠️ Something went wrong loading this blog!</h2>
      <p className="blog-error-message">{error.message}</p>
      <button onClick={reset} className="retry-button">
        Try again
      </button>
    </div>
  );
}
