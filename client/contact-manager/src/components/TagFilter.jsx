import React from 'react';

import { useContacts } from '../context/ContactContext';

const TagFilter = () => {
  const { allTags, selectedTag, setSelectedTag } = useContacts();

  return (
    <div className="flex gap-2 flex-wrap">
      {allTags.map((tag) => (
        <button
          key={tag}
          onClick={() => setSelectedTag(tag)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedTag === tag
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;