import React from 'react'
import { TrendingUp, Users, Headphones, Play, ArrowRight } from 'lucide-react'
import { creatorProfile, creatorEpisodes } from '../data/mockData'

export default function CreatorDashboard({ isDarkTheme, onNavigate, onSelectEpisode }) {
  const bgClass = isDarkTheme ? 'bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950' : 'bg-gradient-to-br from-white via-purple-50 to-pink-50'
  const textClass = isDarkTheme ? 'text-white' : 'text-slate-900'
  const secondaryText = isDarkTheme ? 'text-purple-200' : 'text-purple-600'
  const cardBg = isDarkTheme ? 'bg-slate-800/40 backdrop-blur-xl border-purple-500/30 hover:border-purple-400/50' : 'bg-white/60 backdrop-blur-xl border-purple-200/50 hover:border-purple-300/70'
  const borderClass = isDarkTheme ? 'border-purple-500/30' : 'border-purple-200/50'

  const stats = [
    { icon: Users, label: 'Subscribers', value: creatorProfile.subscribers.toLocaleString(), color: 'purple' },
    { icon: Headphones, label: 'Total Listens', value: creatorProfile.totalListens.toLocaleString(), color: 'blue' },
    { icon: Play, label: 'Hours Played', value: `${(creatorProfile.totalHours / 1000).toFixed(1)}K`, color: 'green' },
    { icon: TrendingUp, label: 'Growth', value: '+12%', color: 'pink' },
  ]

  return (
    <div className={`min-h-screen ${bgClass}`}>
      {/* Header */}
      <div className={`border-b ${borderClass} sticky top-0 z-10 backdrop-blur-lg bg-opacity-40`}>
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-end gap-6 mb-6">
            <div className="text-6xl bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 rounded-2xl w-24 h-24 flex items-center justify-center shadow-lg">
              {creatorProfile.podcastImage}
            </div>
            <div>
              <h1 className={`text-4xl font-bold tracking-tight ${textClass}`}>{creatorProfile.podcastTitle}</h1>
              <p className={`${secondaryText} mt-2 font-medium`}>Podcast by {creatorProfile.creatorName}</p>
              <p className={`text-sm ${secondaryText} mt-1`}>Joined {creatorProfile.joinedDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            const colorMap = {
              purple: 'from-purple-500 to-pink-500',
              blue: 'from-blue-500 to-cyan-500',
              green: 'from-lime-400 to-green-500',
              pink: 'from-pink-500 to-rose-500',
            }
            return (
              <div
                key={idx}
                className={`${cardBg} rounded-2xl p-6 border ${borderClass} transition-all hover:scale-105 hover:border-purple-400/50 backdrop-blur-lg shadow-lg`}
              >
                <div className={`bg-gradient-to-br ${colorMap[stat.color]} rounded-xl w-14 h-14 flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon size={28} className="text-white" />
                </div>
                <p className={`${secondaryText} text-sm font-medium`}>{stat.label}</p>
                <p className={`text-3xl font-bold ${textClass} mt-2`}>{stat.value}</p>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => onNavigate('upload')}
            className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white rounded-2xl p-8 font-bold transition-all hover:shadow-2xl hover:scale-105 backdrop-blur-lg border border-purple-400/20"
          >
            <div className="text-4xl mb-3">📤</div>
            <div className="text-lg">Upload New Episode</div>
          </button>

          <button
            onClick={() => onNavigate('analytics')}
            className={`${cardBg} border ${borderClass} rounded-2xl p-8 font-bold transition-all hover:scale-105 hover:border-slate-500/50 backdrop-blur-lg`}
          >
            <div className="text-4xl mb-3">📊</div>
            <div className={`text-lg ${textClass}`}>View Analytics</div>
          </button>

          <button
            onClick={() => onNavigate('live')}
            className={`${cardBg} border ${borderClass} rounded-2xl p-8 font-bold transition-all hover:scale-105 hover:border-slate-500/50 backdrop-blur-lg relative`}
          >
            <div className="text-4xl mb-3">🔴</div>
            <div className={`text-lg ${textClass}`}>Go Live</div>
            <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          </button>
        </div>

        {/* Recent Episodes */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold tracking-tight ${textClass}`}>Recent Episodes</h2>
            <button
              onClick={() => onNavigate('episodes')}
              className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 transition-colors"
            >
              View All <ArrowRight size={18} />
            </button>
          </div>
          <div className="space-y-3">
            {creatorEpisodes.filter(ep => ep.status === 'published').slice(0, 3).map((episode) => (
              <div
                key={episode.id}
                className={`${cardBg} border ${borderClass} rounded-2xl p-5 hover:shadow-lg transition-all cursor-pointer hover:border-slate-500/50 backdrop-blur-lg group`}
              >
                <div className="flex gap-4 items-start">
                  <div className="text-4xl group-hover:scale-110 transition-transform">{episode.thumbnail}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-lg ${textClass} line-clamp-1`}>{episode.title}</h3>
                    <p className={`text-sm ${secondaryText} line-clamp-1 mt-1`}>{episode.description}</p>
                    <div className={`flex gap-4 text-xs ${secondaryText} mt-3 font-medium`}>
                      <span>📅 {episode.publishedDate}</span>
                      <span>▶️ {episode.analytics.plays?.toLocaleString()} plays</span>
                      <span>💬 {episode.analytics.comments || 0} comments</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onSelectEpisode(episode.id)}
                    className={`text-purple-400 hover:bg-purple-500/20 dark:hover:bg-purple-900/40 p-3 rounded-xl transition-all flex-shrink-0 hover:scale-110 ${cardBg}`}
                  >
                    <Play size={22} />
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
