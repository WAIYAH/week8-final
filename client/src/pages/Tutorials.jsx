import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Users } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Tutorials = () => {
  const [tutorials, setTutorials] = useState([]);
  const [filteredTutorials, setFilteredTutorials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    'all',
    'bleeding',
    'burns',
    'fractures',
    'choking',
    'cardiac',
    'poisoning',
    'other'
  ];

  useEffect(() => {
    fetchTutorials();
  }, []);

  useEffect(() => {
    filterTutorials();
  }, [tutorials, searchTerm, selectedCategory]);

  const fetchTutorials = async () => {
    try {
      const response = await axios.get(`${API_URL}/tutorials`);
      setTutorials(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tutorials:', error);
      toast.error('Failed to load tutorials');
      setLoading(false);
    }
  };

  const filterTutorials = () => {
    let filtered = tutorials;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tutorial => 
        tutorial.category.toLowerCase() === selectedCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(tutorial =>
        tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutorial.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTutorials(filtered);
  };

  const getCategoryColor = (category) => {
    const colors = {
      bleeding: 'bg-red-100 text-red-800',
      burns: 'bg-orange-100 text-orange-800',
      fractures: 'bg-blue-100 text-blue-800',
      choking: 'bg-purple-100 text-purple-800',
      cardiac: 'bg-pink-100 text-pink-800',
      poisoning: 'bg-green-100 text-green-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[category.toLowerCase()] || colors.other;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            First Aid Tutorials
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our comprehensive collection of first aid tutorials. 
            Each guide provides step-by-step instructions for emergency situations.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search tutorials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tutorials Grid */}
        {filteredTutorials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tutorials found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map(tutorial => (
              <Link
                key={tutorial._id}
                to={`/tutorials/${tutorial._id}`}
                className="card p-6 hover:scale-105 transition-transform duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(tutorial.category)}`}>
                    {tutorial.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>5-10 min</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {tutorial.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {tutorial.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-primary-600 font-medium">
                    {tutorial.steps?.length || 0} steps
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Users className="h-4 w-4 mr-1" />
                    <span>0 viewing</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tutorials;