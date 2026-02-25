import React from 'react'
import { TrendingUp, Users, Headphones, Play, ArrowRight } from 'lucide-react'
import { creatorProfile, creatorEpisodes } from '../data/mockData'

export default function CreatorDashboard({ isDarkTheme, onNavigate }) {
  const bgClass = isDarkTheme ? 'bg-gray-900' : 'bg-white'
  const textClass = isDarkTheme ? 'text-gray-100' : 'text-gray-900'
  const secondaryText = isDarkTheme ? 'text-gray-400' : 'text-gray-600'
  const cardBg = isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'
  const borderClass = isDarkTheme ? 'border-gray-700' : 'border-gray-200'

  const stats = [
    { icon: Users, label: 'Subscribers', value: creatorProfile.subscribers.toLocaleString(), color: 'purple' },
    { icon: Headphones, label: 'Total Listens', value: creatorProfile.totalListens.toLocaleString(), color: 'blue' },
    { icon: Play, label: 'Hours Played', value: `${(creatorProfile.totalHours / 1000).toFixed(1)}K`, color: 'green' },
    { icon: TrendingUp, label: 'Growth', value: '+12%', color: 'pink' },
  ]

  return (
    <div className={`min-h-screen ${bgClass}`}>
      {/* Header */}
      <div className={`border-b ${borderClass} sticky top-0 z-10 backdrop-blur-lg bg-opacity-90`}>
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-5xl bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl w-20 h-20 flex items-center justify-center">
              {creatorProfile.podcastImage}
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${textClass}`}>{creatorProfile.podcastTitle}</h1>
              <p className={`${secondaryText} mt-1`}>Creator Dashboard</p>
              <p className={`text-sm ${secondaryText}`}>Joined {creatorProfile.joinedDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            const colorMap = {
              purple: 'from-purple-500 to-purple-600',
              blue: 'from-blue-500 to-blue-600',
              green: 'from-green-500 to-green-600',
              pink: 'from-pink-500 to-pink-600',
            }
            return (
              <div
                key={idx}
                className={`${cardBg} rounded-xl p-6 border ${borderClass} transition-all hover:scale-105`}
              >
                <div className={`bg-gradient-to-br ${colorMap[stat.color]} rounded-lg w-12 h-12 flex items-center justify-center mb-4`}>
                  <Icon size={24} className="text-white" />
                </div>
                <p className={secondaryText}>{stat.label}</p>
                <p className={`text-2xl font-bold ${textClass} mt-1`}>{stat.value}</p>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => onNavigate('upload')}
            className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl p-6 font-bold transition-all hover:shadow-lg hover:scale-105"
          >
            <div className="text-3xl mb-2">📤</div>
            <div>Upload New Episode</div>
          </button>

          <button
            onClick={() => onNavigate('analytics')}
            className={`${cardBg} border ${borderClass} rounded-xl p-6 font-bold transition-all hover:scale-105`}
          >
            <div className="text-3xl mb-2">📊</div>
            <div className={textClass}>View Analytics</div>
          </button>

          <button
            onClick={() => onNavigate('live')}
            className={`${cardBg} border ${borderClass} rounded-xl p-6 font-bold transition-all hover:scale-105 relative`}
          >
            <div className="text-3xl mb-2">🔴</div>
            <div className={textClass}>Go Live</div>
            <div className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          </button>
        </div>

        {/* Recent Episodes */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${textClass}`}>Recent Episodes</h2>
            <button
              onClick={() => onNavigate('episodes')}
              className="text-purple-500 hover:text-purple-600 font-semibold flex items-center gap-1 transition-colors"
            >
              View All <ArrowRight size={18} />
            </button>
          </div>
          <div className="space-y-4">
            {creatorEpisodes.filter(ep => ep.status === 'published').slice(0, 3).map((episode) => (
              <div
                key={episode.id}
                className={`${cardBg} border ${borderClass} rounded-xl p-4 hover:shadow-md transition-all cursor-pointer hover:border-purple-400`}
              >
                <div className="flex gap-4 items-start">
                  <div className="text-3xl">{episode.thumbnail}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold ${textClass} line-clamp-1`}>{episode.title}</h3>
                    <p className={`text-sm ${secondaryText} line-clamp-1 mt-1`}>{episode.description}</p>
                    <div className={`flex gap-4 text-xs ${secondaryText} mt-2`}>
                      <span>📅 {episode.publishedDate}</span>
                      <span>▶️ {episode.analytics.plays?.toLocaleString()} plays</span>
                      <span>💬 {episode.analytics.comments || 0} comments</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('episodes')}
                    className={`text-purple-500 hover:bg-purple-100 dark:hover:bg-purple-900/30 p-2 rounded-lg transition-colors flex-shrink-0`}
                  >
                    <Play size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
