import { Link } from 'react-router-dom';
import { Heart, Shield, Users, Clock } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Heart className="h-8 w-8 text-primary-600" />,
      title: "Life-Saving Knowledge",
      description: "Learn essential first aid techniques that can save lives in emergency situations."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary-600" />,
      title: "Expert-Verified Content",
      description: "All tutorials are created and reviewed by certified medical professionals."
    },
    {
      icon: <Users className="h-8 w-8 text-primary-600" />,
      title: "Community Focused",
      description: "Empowering communities with accessible emergency response knowledge."
    },
    {
      icon: <Clock className="h-8 w-8 text-primary-600" />,
      title: "Quick Access",
      description: "Find the help you need fast with our organized, step-by-step guides."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Learn First Aid,
              <span className="text-primary-600"> Save Lives</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Access comprehensive first aid tutorials designed to empower you with life-saving knowledge. 
              Quick, clear instructions for emergency situations when every second counts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tutorials" className="btn-primary text-lg px-8 py-3">
                Browse Tutorials
              </Link>
              <a 
                href="#mission" 
                className="btn-secondary text-lg px-8 py-3"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose FirstAidGuru?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to making first aid education accessible, reliable, and easy to understand.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                FirstAidGuru was created to bridge the gap in emergency medical knowledge, 
                especially in underserved communities where immediate medical help might not be available.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We believe that everyone should have access to life-saving knowledge. Our tutorials 
                are designed to be clear, actionable, and accessible on any device, ensuring help 
                is always at your fingertips.
              </p>
              <Link to="/tutorials" className="btn-primary">
                Start Learning Today
              </Link>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Emergency Categories
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Bleeding & Wound Care</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Burns & Scalds</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Fractures & Sprains</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Choking & Breathing</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Cardiac Emergencies</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Poisoning & Overdose</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Learn Life-Saving Skills?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of people who have already empowered themselves with first aid knowledge.
          </p>
          <Link 
            to="/tutorials" 
            className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
          >
            Browse All Tutorials
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;