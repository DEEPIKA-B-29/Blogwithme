import React from "react";

const categories = [
  "Tech",
  "Health",
  "Travel",
  "Food",
  "Education",
  "Music",
  "Movie",
  "Finance",
  "Lifestyle",
];

const BlogFilter = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}) => {
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
  };

  return (
    <section className="max-w-5xl mx-auto px-4 mt-8">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search for blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border p-3 rounded-md pr-10"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              setSelectedCategory(cat === selectedCategory ? "" : cat)
            }
            className={`px-4 py-2 rounded-full border ${
              cat === selectedCategory
                ? "bg-blue-600 text-white border-blue-600"
                : "border-black hover:bg-blue-200"
            } text-sm`}
          >
            {cat}
          </button>
        ))}
      </div>

      {(searchQuery || selectedCategory) && (
        <button
          onClick={handleClearFilters}
          className="text-sm text-blue-600 underline"
        >
          Clear Filters
        </button>
      )}
    </section>
  );
};

export default BlogFilter;
