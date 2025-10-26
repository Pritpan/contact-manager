import React from 'react';
import { Search, X } from 'lucide-react';
import { useContacts } from '../context/ContactContext';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useContacts();

  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search contacts by name, email, or phone..."
        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-400"
      />
    </div>
  );
};

export default SearchBar;