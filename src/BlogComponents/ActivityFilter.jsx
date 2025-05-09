export const ActivityCategoryFilter = ({
  categories,
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-10">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`px-4 py-2 text-sm rounded-full transition-all ${
            activeCategory === category
              ? "bg-amber-400 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
