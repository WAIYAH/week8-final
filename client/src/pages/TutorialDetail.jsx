import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Play } from 'lucide-react';
import axios from 'axios';
import io from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

const TutorialDetail = () => {
  const { id } = useParams();
  const [tutorial, setTutorial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewerCount, setViewerCount] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    fetchTutorial();
    
    // Initialize socket connection
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    // Join tutorial room
    newSocket.emit('join-tutorial', id);

    // Listen for viewer count updates
    newSocket.on('viewer-count', (count) => {
      setViewerCount(count);
    });

    return () => {
      newSocket.emit('leave-tutorial', id);
      newSocket.disconnect();
    };
  }, [id]);

  const fetchTutorial = async () => {
    try {
      const response = await axios.get(`${API_URL}/tutorials/${id}`);
      setTutorial(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tutorial:', error);
      setLoading(false);
    }
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
    return colors[category?.toLowerCase()] || colors.other;
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!tutorial) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tutorial Not Found</h2>
          <Link to="/tutorials" className="btn-primary">
            Back to Tutorials
          </Link>
        </div>
      </div>
    );
  }

  const embedUrl = getYouTubeEmbedUrl(tutorial.videoUrl);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          to="/tutorials" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Tutorials
        </Link>

        {/* Tutorial Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(tutorial.category)}`}>
              {tutorial.category}
            </span>
            <div className="flex items-center space-x-4 text-gray-500">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-1" />
                <span>5-10 min read</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-1" />
                <span>{viewerCount} viewing now</span>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {tutorial.title}
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            {tutorial.description}
          </p>
        </div>

        {/* Video Section */}
        {embedUrl && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center mb-4">
              <Play className="h-6 w-6 text-primary-600 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Video Tutorial
              </h2>
            </div>
            <div className="aspect-video">
              <iframe
                src={embedUrl}
                title={tutorial.title}
                className="w-full h-full rounded-lg"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Steps Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Step-by-Step Instructions
          </h2>

          <div className="space-y-6">
            {tutorial.steps?.map((step, index) => (
              <div key={index} className="flex">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold mr-4">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed">
                    {step}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Emergency Warning */}
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Important Notice
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>
                    This tutorial is for educational purposes only. In case of a serious emergency, 
                    always call emergency services (911) immediately. These instructions should not 
                    replace professional medical care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialDetail;