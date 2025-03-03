import React from "react";

const CategorySelection = ({ categories, onCategorySelect }) => {
  return (
    <div className="flex justify-center mt-4">
      <div className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg rounded-md overflow-hidden">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategorySelect(category)}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors duration-150 ease-in-out first:rounded-l-md last:rounded-r-md focus:outline-none focus:shadow-outline"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelection;
