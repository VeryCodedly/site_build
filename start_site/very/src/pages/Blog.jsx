export default function Blog() {
  return (
    <div className="bg-white min-h-screen py-12 px-6 font-rale">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Tech Thoughts, Tutorials & Tangents</h1>
        <div className="grid gap-8 md:grid-cols-2">
          {[1,2,3].map(post => (
            <div key={post} className="bg-off-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h2 className="text-xl font-bold mb-2">Post Title {post}</h2>
              <p className="text-sm text-shadow-gray mb-3">Short teaser about what this post covers.</p>
              <button className="text-neon hover:underline">Read more →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
