import { useState } from 'react';
import { Clock, Star, Bookmark, BookmarkCheck } from 'lucide-react';
import { RESOURCES } from '../data';

export default function LearningResources({ visible, showHeader = true }) {
  const [activeTab, setActiveTab] = useState('courses');
  const [bookmarks, setBookmarks] = useState([]);
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const toggleBookmark = (resourceId) => {
    setBookmarks((prev) =>
      prev.includes(resourceId) ? prev.filter((id) => id !== resourceId) : [...prev, resourceId]
    );
  };

  return (
    <section id="resources" className="py-14 px-4">
      <div className="max-w-6xl mx-auto">
        {showHeader && (
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="font-orbitron text-4xl sm:text-5xl font-bold mb-4 gradient-text">
              Curated Learning Pathways
            </h2>
            <p className="text-gray-400 text-lg">Hand-picked resources to accelerate your growth</p>
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {['courses', 'books', 'certifications', 'youtube', 'communities'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`ui-btn min-h-0 px-4 py-2 rounded-full capitalize ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filter */}
        <div className="flex justify-center mb-10">
          <label className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-xl border border-white/10 bg-white/5">
            <input
              type="checkbox"
              checked={showFreeOnly}
              onChange={(e) => setShowFreeOnly(e.target.checked)}
              className="accent-[#00F5FF]"
            />
            <span className="text-gray-400">Show free resources only</span>
          </label>
        </div>

        {/* Resource Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {RESOURCES[activeTab]
            ?.filter((r) => !showFreeOnly || r.free)
            .map((resource) => (
              <div
                key={resource.id}
                className="glass rounded-2xl p-5 hover:scale-[1.02] transition-all relative overflow-hidden shimmer-hover h-full flex flex-col"
              >
                <button
                  onClick={() => toggleBookmark(`${activeTab}-${resource.id}`)}
                  className="ui-btn min-h-0 absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg"
                >
                  {bookmarks.includes(`${activeTab}-${resource.id}`) ? (
                    <BookmarkCheck className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <Bookmark className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                <div className="text-3xl mb-3">{resource.icon}</div>
                <h3 className="font-bold text-base leading-tight mb-2 pr-8">{resource.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{resource.platform}</p>

                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {resource.duration}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${
                      resource.difficulty === 'Beginner'
                        ? 'bg-green-500/20 text-green-400'
                        : resource.difficulty === 'Intermediate'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {resource.difficulty}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(resource.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                        }`}
                      />
                    ))}
                    <span className="text-sm ml-1">{resource.rating}</span>
                  </div>
                  <span className={`text-sm ${resource.free ? 'text-[#10B981]' : 'text-gray-400'}`}>
                    {resource.free ? 'Free' : 'Paid'}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
